import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-2 items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-red-100 w-1/2 h-1/2">
          <Image src={cta_logo} alt="test" className="size-12 p-2"></Image>
          <h1>test</h1>
        </div>
        <div className="bg-gray-100 w-1/2 h-1/2">
          <Image src={metra_logo} alt="test" className=" p-2"></Image>

          <h1>test</h1>
        </div>
      </div>
    </main>
  );
}
