import Image from "next/image";
import cta from "./assets/cta.png";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-2 items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-red-100 w-1/2 h-1/2">
          <Image src={cta} alt="test" className="size-12 p-2"></Image>
          <h1>test</h1>
        </div>
        <div className="bg-red-900 w-1/2 h-1/2">
          <h1>test</h1>
        </div>
      </div>
    </main>
  );
}
