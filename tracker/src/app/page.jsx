"use client";
import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";
import fetch_drives from ".//utilities/fetch_drives";
import fetch_bus from ".//utilities/fetch_bus";

import { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TextTransition from "react-text-transition";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dash />
    </QueryClientProvider>
  );
}

function Dash() {
  const [updatedAt, setUpdatedAt] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const {
    isPending: pendingDrives,
    data: driveData,
    dataUpdatedAt: driveUpdatedAt,
  } = useQuery({
    queryKey: ["drives"],
    queryFn: fetch_drives,
    refetchInterval: 20 * 6 * 10000,
  });

  const {
    isPending: pendingBus,
    data: busData,
    dataUpdatedAt: busUpdatedAt,
  } = useQuery({
    queryKey: ["busses"],
    queryFn: fetch_bus,
    refetchInterval: 15000,
  });

  useEffect(() => {
    if (busUpdatedAt > updatedAt) {
      setUpdatedAt(busUpdatedAt);
    }
  }, [updatedAt, busUpdatedAt]);

  useEffect(() => {
    if (busData) {
      const newBlocks = [];
      for (var i = 0; i < busData.length; i++) {
        newBlocks.push(
          <div className="grid grid-cols-2 p-1 m-1">
            <div>
              <TextTransition
                className="text-2xl font-extrabold"
                key={"bus_pred" + i}
              >
                {busData[i].prdctdn}
                <span key={"pred_span" + i} className="font-thin text-xs">
                  min
                </span>
              </TextTransition>
            </div>
            <div className="pt-2 ml-auto mr-0 font-thin text-sm">
              {busData[i].rtdir}
            </div>
          </div>
        );
      }
      setBlocks(newBlocks);
    }
  }, [busData]);

  function timestamp_to_time(timestamp) {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    return time;
  }

  if (pendingDrives || pendingBus) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-white">
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

        <div className="bg-white w-full h-full">
          <div className="m-2">
            <h1 className="font-light text-xl">55 Bus</h1>
          </div>
          <div className="mt-10">{blocks}</div>
        </div>
        <div className="bg-gray-50 w-full h-full grid grid-rows-6 p-4 ">
          <div>
            <h1 className="font-light text-xl">Traffic</h1>
          </div>
          <div className="h-fit w-fit">
            <p className="font-thin text-sm ">
              Bucktown <br />{" "}
              <span className="font-extrabold text-xl">
                {Math.round(driveData[0] / 60)}
              </span>{" "}
              min
            </p>
          </div>
          <div className="h-fit w-fit">
            <p className="font-thin text-sm ">
              Lakeview <br />{" "}
              <span className="font-extrabold text-xl">
                {Math.round(driveData[1] / 60)}
              </span>{" "}
              min
            </p>
          </div>{" "}
          <div className="h-fit w-fit">
            <p className="font-thin text-sm ">
              Schaumburg <br />{" "}
              <span className="font-extrabold text-xl">
                {Math.round(driveData[2] / 60)}
              </span>{" "}
              min
            </p>
          </div>{" "}
          <div className="h-fit w-fit">
            <p className="font-thin text-sm ">
              Devin&apos;s House <br />{" "}
              <span className="font-extrabold text-xl">2</span> min (walking)
            </p>
          </div>{" "}
          <div className="h-fit w-fit mt-4">
            Updated: <br />
            <p>{timestamp_to_time(updatedAt)}</p>
          </div>{" "}
        </div>
      </div>
    </main>
  );
}
