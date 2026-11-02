
Todo Module
    |
    v
Notification Module
    |
    v
Notification Database
    |
    v
Transactional Outbox
    |
    v
BullMQ + Redis
    |
    v
Notification Workers
    |
    +---- Email Provider
    |
    +---- SMS Provider
    |
    +---- Push Provider
    |
    +---- In-App Notifications


    

src/
├── notifications/
│   ├── notifications.module.ts
│   ├── notifications.controller.ts
│   ├── notifications.service.ts
│   ├── notifications.repository.ts
│   ├── notifications.processor.ts
│   ├── notifications.gateway.ts
│   │
│   ├── queues/
│   ├── workers/
│   ├── channels/
│   │   ├── email/
│   │   ├── sms/
│   │   ├── push/
│   │   └── in-app/
│   │
│   ├── templates/
│   ├── dto/
│   └── constants/
│
├── todos/
├── users/
├── prisma/
└── app.module.ts