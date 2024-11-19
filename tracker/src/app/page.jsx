"use client";
import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";
import fetch_drives from ".//utilities/fetch_drives";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dash />
    </QueryClientProvider>
  );
}

function handleClick() {
  console.log("click");
  refetch;
}

function Dash() {
  const { isPending: pendingDrives, data: driveData } = useQuery({
    queryKey: ["drives"],
    queryFn: fetch_drives,
    refetchInterval: 1 * 6 * 10000,
  });

  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-[#FFEAD0]">
      <div className="fixed w-[75px] h-[75px] ml-0 mt-0 grid grid-rows-2 grid-cols-2">
        <div className="bg-[#eb4d14] w-full h-full"> </div>
        <div className="bg-[#eb4d14] w-full h-full"> </div>
        <div className="bg-[#eb4d14] w-full h-full"></div>
        <div className="bg-[#FFEAD0] w-full h-full"></div>
      </div>
      <div className="grid grid-cols-4 p-20 items-center justify-items-center min-h-screen gap-0 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-gray-50 w-full h-full">
          <Image
            src={metra_logo}
            alt="Metra logo"
            className="h-12 w-auto p-2 mt-4"
          ></Image>
          <div className="bg-red-100 mt-10">metra</div>
        </div>
        <div className="bg-red-50 w-full h-full">
          <Image
            src={cta_logo}
            alt="CTA logo"
            className="h-24 w-auto p-2"
          ></Image>
          <div className="mt-2">da L</div>
        </div>

        <div className="bg-green-50 w-full h-full">
          <div>CTA bus</div>
        </div>
        <div className="bg-[#BADA55] w-full h-full grid grid-rows-4 p-4 ">
          <div className="">Bucktown</div>
          <h1>{driveData}</h1>
          <div className="">Lakeview</div>
          <div className="">Schaumburg</div>
          <div className="">Devin&apos;s house</div>
        </div>
      </div>
    </main>
  );
}
