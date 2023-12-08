import Link from "next/link";

export default async function Home() {
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold text-deep-navy-blue">Home</h1>
      <div className="flex flex-col items-start justify-start gap-4">
        <Link href="/campaigns/create">Create Campaign</Link>
        <Link href="/register">Register</Link>
        <Link href="/projects">View Projects</Link>
      </div>
    </div>
  );
}
