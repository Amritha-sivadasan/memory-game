
import dynamic from "next/dynamic";
const MemoryGame = dynamic(() => import('../components/memory-game'), {
  loading: () => <p>Loading...</p>,
})
 

export default function Home() {
  return (
    <main className="flex min-h-screen md:items-center justify-center ">
      <MemoryGame />
    </main>
  );
}
