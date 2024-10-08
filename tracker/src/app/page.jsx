import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <div className="fixed w-[75px] h-[75px] ml-0 mt-0 grid grid-rows-2 grid-cols-2">
        <div className="bg-[#eb4d14] w-full h-full"> </div>
        <div className="bg-[#eb4d14] w-full h-full"> </div>
        <div className="bg-[#eb4d14] w-full h-full"></div>
        <div className="bg-white w-full h-full"></div>
      </div>
      <div className="grid grid-cols-4 p-20 items-center justify-items-center min-h-screen gap-0 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-gray-50 w-full h-full">
          <Image
            src={metra_logo}
            alt="Metra logo"
            className="h-12 w-auto p-2"
          ></Image>
          <h1>metra</h1>
        </div>
        <div className="bg-red-50 w-full h-full">
          <Image
            src={cta_logo}
            alt="CTA logo"
            className="h-24 w-auto p-2"
          ></Image>
          <h1>da L</h1>
        </div>

        <div className="bg-green-50 w-full h-full">
          <h1>CTA bus</h1>
        </div>
        <div className="bg-gray-50 w-full h-full grid grid-rows-4 p-4 ">
          <h1 className="font-semibold">Bucktown</h1>
          <h1 className="font-semibold">Lakeview</h1>
          <h1 className="font-semibold">Schaumburg</h1>
          <h1 className="font-semibold">Devin's house</h1>
        </div>
      </div>
    </main>
  );
}
