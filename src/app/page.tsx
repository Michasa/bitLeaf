import StartDashboard from "@/components/views/dashboard";

export default async function Home() {
  return (
    <>
      <main className="row-start-2 flex flex-col items-center gap-8 p-4 sm:items-start md:p-10">
        <StartDashboard />
      </main>
    </>
  );
}
