"use client";
import "react-h5-audio-player/lib/styles.css";

import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const baseTracks = [
  { img: "/assets/content-img/track1.jpg", audio: "/assets/media/black-box-funky.mp3" },
  { img: "/assets/content-img/track2.jpg", audio: "/assets/media/euphoria.mp3" },
  { img: "/assets/content-img/track4.jpg", audio: "/assets/media/fashion-red-tape.mp3" },
  { img: "/assets/content-img/track5.jpg", audio: "/assets/media/euphoria.mp3" },
];

// gentag tracks hvis du vil have flere
const tracks = Array(6).fill(baseTracks).flat(); // fx 24 tracks

export default function TrackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((i) => (i + 1) % tracks.length); // næste track
  };

  const prev = () => {
    setActiveIndex((i) => (i - 1 + tracks.length) % tracks.length); // forrige track
  };

  return (
    <section className="grid grid-cols">
      <div className="flex  ">
        <Image src={tracks[activeIndex].img} width={250} height={250} alt="Current Track" className="hidden sm:flex" />

        {/* Audio Player */}
        <AudioPlayer src={tracks[activeIndex].audio} autoPlay={false} />
      </div>
      <div className="flex">
        <div className="flex place-items-center ">
          <FaRegArrowAltCircleLeft onClick={prev} />
        </div>
        <div className="flex  flex-col items-center gap-4">
          {/* Billede */}

          {/* Thumbnails */}
          <div className="flex overflow-x-auto ">
            {tracks.map((track, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 cursor-pointer rounded
        ${i === activeIndex ? "border-2 border-pink-500" : ""}
      `}
              >
                <Image src={track.img} width={150} height={150} alt="thumbnail" />

                {i === activeIndex && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg xmlns="/assets/icon/Play_btn.svg" className="h-8 w-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex place-items-center">
          <FaRegArrowAltCircleRight onClick={next} />
        </div>
      </div>
    </section>
  );
}
