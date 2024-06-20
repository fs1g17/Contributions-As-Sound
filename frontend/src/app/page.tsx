"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [githubUsername, setGithubUsername] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex">
          <Input
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.currentTarget.value)}
          />
          <Button onClick={() => {}}>Search</Button>
        </div>
      </div>
    </main>
  );
}
