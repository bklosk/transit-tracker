"use client";
import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";
import fetch_drives from ".//utilities/fetch_drives";
import fetch_bus from ".//utilities/fetch_bus";
import fetch_train from ".//utilities/fetch_train";
import moment from "moment";

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
  const [trainBlocks, setTrainBlocks] = useState([]);
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

  const { isPending: pendingTrain, data: trainData } = useQuery({
    queryKey: ["trains"],
    queryFn: fetch_train,
    refetchInterval: 15000,
  });

  function timestamp_to_time(timestamp) {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    return time;
  }

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

  useEffect(() => {
    if (trainData) {
      const newTrains = [];
      for (var i = 0; i < trainData.length; i++) {
        var color = "null";
        if (trainData[i].stpId == "30099") {
          color = "#688E26";
        } else if (trainData[i].stpId == "30223") {
          color = "#6B0F1A";
        }
        newTrains.push(
          <div
            className="grid grid-cols-2 my-2 mx-1 px-1 py-1 h-[55px] drop-shadow-lg bg-[var(--user-color)] text-white"
            style={{
              "--user-color": color,
            }}
          >
            <div className="relative">
              <TextTransition
                className="absolute text-sm bottom-0 font-extrabold"
                key={"train_pred" + i}
              >
                {moment().to(trainData[i].arrT, true)}
              </TextTransition>
            </div>
            <div className="relative text-sm">
              <p className="absolute right-0 bottom-0">{trainData[i].destNm}</p>
            </div>
          </div>
        );
      }
      setTrainBlocks(newTrains);
    }
  }, [trainData]);

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
        <div className="bg-white w-full h-full">
          <Image
            src={metra_logo}
            alt="Metra logo"
            className="h-10 w-auto p-2 mt-4 m-auto"
          />
        </div>
        <div className="bg-gray-50 w-full h-full">
          <Image
            src={cta_logo}
            alt="CTA logo"
            className="h-20 w-auto p-2 m-auto"
          />
          <div className="mt-2">{trainBlocks}</div>
        </div>

        <div className="bg-white w-full h-full">
          <div className="m-2 mt-4">
            <h1 className="font-light text-xl">55 Bus</h1>
          </div>
          <div className="mt-9">{blocks}</div>
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
              <span className="font-extrabold text-xl">2</span> min
            </p>
          </div>
        </div>
      </div>
      <div className="relative mb-20 bg-red-200">
        <p>
          Updated:
          {timestamp_to_time(updatedAt)}
        </p>
      </div>
    </main>
  );
}
