import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProp {
    audio?: string;
    isPlaying?: boolean;
    finishedCallback: () => void
}
const Waveform = ({audio, isPlaying, finishedCallback}: WaveformProp) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer>(null);

    useEffect(() => {
        // @ts-ignore
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            cursorWidth: 0,
            barWidth: 4,
            barRadius: 2,
            height: 80,
            barHeight: 0.9,
            progressColor: "#dee2f1",
            waveColor: "#6b8cce",
            hideScrollbar: true
        });
        waveSurfer.load(audio);
        waveSurfer.on("ready", () => {
            wavesurferRef.current = waveSurfer
        });

        waveSurfer.on("finish", () => {
            { finishedCallback() }
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [audio]);

    useEffect(() => {
        if (wavesurferRef.current === null) return;
        if (isPlaying) {
            wavesurferRef.current.play()
        } else {
            wavesurferRef.current.pause()
        }
    }, [isPlaying])

    return <div ref={containerRef} />;
};

export default Waveform;
