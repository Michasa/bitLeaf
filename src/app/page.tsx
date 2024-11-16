import AppView from "@/components/views/homepage"

export default async function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1>bitLeaf</h1>
          <p>Your friends will pay you back...right?</p>
        </div>
        <AppView />
      </main>
    </div>
  )
}
