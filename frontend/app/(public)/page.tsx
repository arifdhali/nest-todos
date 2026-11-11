import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ListTodo,
    title: "Organize Your Tasks",
    description:
      "Create, update, and organize your daily tasks in one simple place.",
  },
  {
    icon: Clock3,
    title: "Manage Your Time",
    description:
      "Prioritize important tasks and keep track of your deadlines.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Share tasks with others and work together to get things done.",
  },
  {
    icon: Zap,
    title: "Stay Productive",
    description:
      "Track your progress and build better productivity habits.",
  },
];

const articles = [
  {
    category: "Productivity",
    title: "10 Ways to Improve Your Daily Productivity",
    description:
      "Simple strategies to organize your day and accomplish more.",
    date: "November 05, 2026",
    slug: "improve-daily-productivity",
  },
  {
    category: "Task Management",
    title: "How to Prioritize Your Tasks Effectively",
    description:
      "Learn how to focus on important work without feeling overwhelmed.",
    date: "November 07, 2026",
    slug: "prioritize-your-tasks",
  },
  {
    category: "Time Management",
    title: "Why Planning Your Day Matters",
    description:
      "Discover how a simple daily plan can improve your workflow.",
    date: "November 09, 2026",
    slug: "planning-your-day",
  },
];
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <Badge className="mb-6 bg-violet-100 text-violet-700 hover:bg-violet-100">
              Your productivity starts here
            </Badge>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Get Things Done.
              <span className="block text-violet-600">
                One Task at a Time.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Take control of your day with a smarter way to manage
              tasks, organize your work, and achieve your goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"

                className="bg-violet-600 hover:bg-violet-700"
                render={<Link href="/register" />}
              >
                Start for Free <ArrowRight className="ml-2" />
              </Button>

              <Button size="lg" variant="outline"
                render={<Link href="/blog" />}>
                Explore Our Blog
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={17} />
                Easy to use
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={17} />
                Stay organized
              </span>
            </div>
          </div>

          {/* Product preview */}
          <div className="rounded-2xl border bg-white p-5 shadow-xl shadow-violet-100">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">My Tasks</p>
                <p className="text-sm text-gray-500">Your daily overview</p>
              </div>
              <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                Today
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { title: "Complete project documentation", done: true },
                { title: "Review today's meeting notes", done: false },
                { title: "Prepare weekly task plan", done: false },
                { title: "Read 20 pages of a book", done: true },
              ].map((task) => (
                <div
                  key={task.title}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <CheckCircle2
                    size={21}
                    className={
                      task.done
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />
                  <span
                    className={
                      task.done
                        ? "text-gray-400 line-through"
                        : "font-medium text-gray-700"
                    }
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-violet-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Daily progress</span>
                <span className="font-semibold text-violet-700">
                  50%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-200">
                <div className="h-full w-1/2 rounded-full bg-violet-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold text-violet-600">FEATURES</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything you need to stay organized
          </h2>
          <p className="mt-4 text-gray-600">
            Simple tools to help you focus on what matters most.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-5 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="font-semibold text-violet-600">
              WORK SMARTER
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Your goals deserve a better plan.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              TaskFlow helps you break big goals into smaller,
              manageable tasks. Stay focused, track your progress,
              and celebrate every accomplishment.
            </p>
            <Button render={<Link href="/register" />} className="mt-7 bg-violet-600 hover:bg-violet-700">
              Create Your Account
            </Button>
          </div>

          <div className="rounded-2xl bg-violet-600 p-10 text-white">
            <h3 className="text-2xl font-bold">
              Make every day count.
            </h3>
            <p className="mt-4 leading-7 text-violet-100">
              Start with one task. Build momentum. Accomplish your
              biggest goals one step at a time.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <CheckCircle2 />
              <span>Plan your work</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <CheckCircle2 />
              <span>Track your progress</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <CheckCircle2 />
              <span>Achieve your goals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-violet-600">OUR BLOG</p>
            <h2 className="mt-2 text-3xl font-bold">
              Learn to be more productive
            </h2>
            <p className="mt-3 text-gray-600">
              Practical ideas to improve your everyday workflow.
            </p>
          </div>

          <Button variant="outline"
            render={<Link href="/blog" />}
          >
            View All Articles
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="overflow-hidden">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100">
                <ListTodo size={48} className="text-violet-500" />
              </div>

              <CardContent className="p-6">
                <Badge variant="secondary">
                  {article.category}
                </Badge>

                <h3 className="mt-4 text-xl font-semibold">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {article.description}
                </p>

                <p className="mt-4 text-xs text-gray-400">
                  {article.date}
                </p>

                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-5 inline-flex items-center font-medium text-violet-600 hover:text-violet-800"
                >
                  Read Article <ArrowRight size={16} className="ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to organize your life?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-violet-100">
          Start managing your tasks today and take the first step
          towards a more productive life.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8"
          render={<Link href="/register" />}
        >
          Get Started for Free
        </Button>
      </section>
    </>
  );
}