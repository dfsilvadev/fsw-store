"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <main>
      <h1>{data?.user?.name}</h1>
      <h1>{data?.user?.email}</h1>
    </main>
  );
}
