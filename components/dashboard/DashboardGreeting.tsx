"use client";

import { useState, useEffect } from "react";

function greet(template: string, name: string) {
  return template.replace(/\{name\}/g, name.charAt(0).toUpperCase() + name.slice(1));
}

const GREETINGS = [
  "Good day, {name}!",
  "Hey there, {name}!",
  "Welcome back, {name}!",
  "Greetings, {name}!",
  "Hello again, {name}!",
  "Nice to see you, {name}!",
  "Top of the day, {name}!",
  "Howdy, {name}!",
  "Great to have you, {name}!",
  "Welcome in, {name}!",
  "Hey {name} — good to see you!",
  "Rise and shine, {name}!",
  "Looking good, {name}!",
  "What's up, {name}!",
  "Ready to make some edits, {name}?",
  "Let's get to it, {name}!",
  "Hello, {name} — welcome!",
  "Back again, {name} — nice!",
  "Good to see you, {name}!",
  "Aloha, {name}!",
];

export default function DashboardGreeting({ name = "Admin" }: { name?: string }) {
  const [greeting, setGreeting] = useState(greet(GREETINGS[0], name));

  useEffect(() => {
    const tpl = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(greet(tpl, name));
  }, [name]);

  return (
    <p className="text-base font-medium text-emerald-600 dark:text-emerald-400 tracking-wide">
      {greeting}
    </p>
  );
}
