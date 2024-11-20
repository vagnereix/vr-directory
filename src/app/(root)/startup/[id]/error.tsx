"use client";

interface ErrorStartupPageProps {
  error: Error & {
    digest: string;
  };
  reset: () => void;
}
export default function ErrorStartupPage({ error }: ErrorStartupPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center mt-4">
      Error: {error.message}
    </main>
  );
}
