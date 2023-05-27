import React, { useState } from "react";
import Waveform from "./Waveform";
import { FaPause, FaPlay } from "react-icons/fa";
import { SongProp } from "../controllers/getSongs";


export const Card = ({ imageSrc, title, artist, audioSrc }: SongProp) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div
            className="flex flex-col touch-none bg-[var(--background)] w-[24rem] h-[36rem] rounded-xl drop-shadow-lg"
        >
            <div
                className="group relative cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
            >
                <img
                    src={imageSrc}
                    className="min-w-full rounded-t-xl drop-shadow-md z-0 pointer-events-none select-none"
                ></img>
                <span
                    className={`absolute left-[calc(50%-50px)] top-[calc(50%-50px)] z-10
                        ${
                            isPlaying
                                ? "opacity-0 group-hover:opacity-100 duration-500"
                                : "opacity-100"
                        }`}
                >
                    {isPlaying ? (
                        <FaPause size={100} color="#f5f5f5" />
                    ) : (
                        <FaPlay size={100} color="#f5f5f5" />
                    )}
                </span>
            </div>
            <div className="mx-4 mt-3 mb-2">
                <Waveform
                    audio={audioSrc}
                    isPlaying={isPlaying}
                    finishedCallback={() => setIsPlaying(false)}
                ></Waveform>
            </div>

            <h1 className="text-center text-[var(--text-primary)] font-medium text-2xl select-none">
                {title}
            </h1>
            <h2 className="text-center text-[var(--text-primary)] mt-1 font-light select-none">
                {artist}
            </h2>
        </div>
    );
};
