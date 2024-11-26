"use client";
import Image from "next/image";
import cta_logo from "./assets/cta.png";
import metra_logo from "./assets/metra.png";
import fetch_drives from ".//utilities/fetch_drives";
import fetch_bus from ".//utilities/fetch_bus";
import fetch_train from ".//utilities/fetch_train";
import fetch_metra from ".//utilities/fetch_metra";
import moment from "moment";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TextTransition, { presets } from "react-text-transition";

fetch_metra();
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
  const [driveBlocks, setDriveBlocks] = useState([]);
  const [metraBlocks, setMetraBlocks] = useState([]);

  const { isPending: pendingMetra, data: metraData } = useQuery({
    queryKey: ["metra"],
    queryFn: fetch_metra,
    refetchInterval: 20000,
  });

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

  var { isPending: pendingTrain, data: trainData } = useQuery({
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
      var min_word = "min";
      var num_blocks = Math.min(busData.length, 6);

      for (var i = 0; i < num_blocks; i++) {
        if (busData[i].prdctdn == "DUE") {
          min_word = "";
        } else {
          min_word = "min";
        }
        newBlocks.push(
          <motion.div
            className="grid grid-cols-2 p-1 m-1 h-[55px] drop-shadow-lg bg-gray-500 text-white"
            key={"bus" + busData[i].vid}
            layout
            layoutTransition={{
              duration: 2,
              type: "spring",
              stiffness: 100,
            }}
            exit={{ opacity: 0, y: 20, duration: 0.5 }}
          >
            <div className="relative">
              <TextTransition
                springConfig={presets.gentle}
                className="absolute text-2xl font-extrabold bottom-0"
                key={"bus_pred" + i}
              >
                {busData[i].prdctdn}
                <span key={"pred_span" + i} className="font-thin text-xs">
                  {min_word}
                </span>
              </TextTransition>
            </div>
            <div className="relative text-sm">
              <p className="absolute right-1 bottom-0">{busData[i].rtdir}</p>
            </div>
          </motion.div>
        );
      }
      setBlocks(newBlocks);
    }
  }, [busData]);

  useEffect(() => {
    if (trainData) {
      trainData.sort(function (a, b) {
        return new Date(a.arrT) - new Date(b.arrT);
      });
      const newTrains = [];
      for (var i = 0; i < trainData.length; i++) {
        var minutes = -1 * moment().diff(trainData[i].arrT, "minutes");
        var min_word = "min";
        if (minutes < 1) {
          minutes = "DUE";
          min_word = "";
        }

        var color = "null";
        if (trainData[i].stpId == "30099") {
          color = "#688E26";
        } else if (trainData[i].stpId == "30223") {
          color = "#8E2634";
        }
        newTrains.push(
          <motion.div
            className="grid grid-cols-2 my-2 mx-1 px-1 py-1 h-[55px] drop-shadow-lg bg-[var(--user-color)] text-white"
            key={"train" + trainData[i].rn}
            layout
            layoutTransition={{
              duration: 1.5,
              type: "spring",
              stiffness: 20,
            }}
            exit={{ opacity: 0, y: -20, duration: 0.3 }}
            style={{
              "--user-color": color,
            }}
          >
            <div className="relative">
              <TextTransition
                springConfig={presets.gentle}
                className="absolute bottom-0 text-2xl font-extrabold"
                key={"train_pred" + i}
              >
                {minutes}
                <span className="font-thin text-xs">{min_word}</span>
              </TextTransition>
            </div>
            <div className="relative text-sm">
              <p className="absolute right-1 bottom-0">{trainData[i].destNm}</p>
            </div>
          </motion.div>
        );
      }
      setTrainBlocks(newTrains);
    }
  }, [trainData]);

  useEffect(() => {
    if (driveData) {
      var newDriveBlocks = [];
      for (const key in driveData) {
        newDriveBlocks.push(
          <div
            key={key}
            className="w-full p-1 h-[55px] drop-shadow-lg my-2 bg-gray-700 text-white"
          >
            <p key={key} className="font-medium text-sm ">
              {key} <br />{" "}
              <span key={key} className="font-extrabold text-xl">
                {Math.round(driveData[key] / 60)}
              </span>
              min
            </p>
          </div>
        );
      }
      setDriveBlocks(newDriveBlocks);
    }
  }, [driveData]);

  useEffect(() => {
    if (metraData) {
      metraData.sort(function (a, b) {
        return new Date(a.arrival) - new Date(b.arrival);
      });
      var newMetraBlocks = [];
      for (let i of metraData) {
        if (i.direction == 1) {
          var minutes = -1 * moment().diff(i.arrival, "minutes");
          var min_word = "min";
          if (minutes < 1) {
            minutes = "DUE";
            min_word = "";
          }
          newMetraBlocks.push(
            <div
              key={"div" + i.label}
              className="relative w-full p-1 h-[55px] grid grid-cols-2 drop-shadow-lg my-2 bg-gray-700 text-white"
            >
              <div
                className="absolute ml-1 bottom-0 text-2xl font-extrabold"
                key={"metra_pred" + i}
              >
                {minutes}
                <span className="font-thin text-xs">{min_word}</span>
              </div>
              <div className="absolute right-1 bottom-1 text-sm">
                {i.trip_headsign}
              </div>
            </div>
          );
        }
      }
      setMetraBlocks(newMetraBlocks);
    }
  }, [metraData]);

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
      <div className="grid grid-cols-4 p-10 items-center justify-items-center min-h-screen gap-0 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-white w-full h-full">
          <Image
            src={metra_logo}
            alt="Metra logo"
            className="h-10 w-auto p-2 mt-4 m-auto"
          />
          <div className="mt-8 mr-1">{metraBlocks}</div>
        </div>
        <div className="bg-white w-full h-full">
          <Image
            src={cta_logo}
            alt="CTA logo"
            className="h-20 w-auto p-2 m-auto"
          />
          <div className="mt-2">
            {" "}
            <AnimatePresence>{trainBlocks}</AnimatePresence>
          </div>
        </div>

        <div className="bg-white w-full h-full">
          <div className="m-2 mt-4">
            <h1 className="font-extrabold text-center text-3xl">55 Bus</h1>
          </div>
          <div className="mt-9">
            {" "}
            <AnimatePresence>{blocks}</AnimatePresence>
          </div>
        </div>
        <div className="bg-white w-full h-full px-1 py-4 ">
          <div>
            <h1 className="font-extrabold text-center text-3xl">Traffic</h1>
          </div>
          <div className="mt-9">{driveBlocks}</div>
        </div>
      </div>
    </main>
  );
}
