import { faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { ConfigService } from "@nestjs/config";
import { createPrismaClient } from "../src/prismaConfig/prismaClient.js";

const configService = new ConfigService();
const adapter = createPrismaClient(configService);
const prisma = new PrismaClient({ adapter });

async function main() {
    const START_ID = 100003;
    const END_ID = 200001;
    const BATCH_SIZE = 1000;

    try {
        for (let start = START_ID; start <= END_ID; start += BATCH_SIZE) {
            const end = Math.min(start + BATCH_SIZE - 1, END_ID);

            // Get existing users
            const users = await prisma.users.findMany({
                where: {
                    id: {
                        gte: start,
                        lte: end
                    }
                },
                select: {
                    id: true
                },
                orderBy: {
                    id: "asc"
                }
            });

            if (users.length === 0) continue;

            // Create todos
            await prisma.todo.createMany({
                data: users.map(user => ({
                    user_id: user.id,
                    subject: faker.lorem.sentence(),
                    description: faker.lorem.paragraph(),
                    shareable: true,
                    completed: "incompleted",
                    status: true
                }))
            });

            const todos = await prisma.todo.findMany({
                where: {
                    user_id: {
                        in: users.map(user => user.id)
                    }
                },
                select: {
                    id: true,
                    user_id: true
                },
                orderBy: {
                    user_id: "asc"
                }
            });

            // Create shared todos
            const sharedTodos = todos.map((todo, index) => {
                const sender = todo.user_id;

                const receiver = users[(index + 1) % users.length];

                return {
                    todo_id: todo.id,
                    sender_id: sender,
                    reciver_id: receiver.id,
                    can_read: true,
                    can_write: faker.datatype.boolean()
                };
            }).filter(share => share.sender_id !== share.reciver_id);

            await prisma.sharedTodos.createMany({
                data: sharedTodos,
                skipDuplicates: true
            });

            console.log(`Processed users: ${start} - ${end}`);
        }

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();