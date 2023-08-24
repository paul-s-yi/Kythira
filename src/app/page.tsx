//app/page.tsx
"use client";
import Head from "next/head";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kythira | Home</title>
        <meta
          name="description"
          content="Welcome to Kythira, an open-source, beginner-friendly Kubernetes Visualizer."
        />
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <UserButton afterSignOutUrl="/" />
      </main>
    </>
  );
}
