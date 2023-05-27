import React from "react";
import { SongProp } from "./Card";
import "../style/animation.css";

interface Prop {
    song: SongProp;
    deleteCard: (card: SongProp) => void;
}
const SimpliedSong = ({ song, deleteCard }: Prop) => {
    return (
        <div
            className="songs_container group bg-[var(--color-primary)] select-none cursor-pointer rounded-lg flex ease-in duration-75"
            onClick={() => deleteCard(song)}
        >
            <img
                src={song.imageSrc}
                className="h-14 w-14 rounded-lg group-hover:hidden"
            ></img>
            <h1 className="grow self-center text-center text-sm font-serif font-medium group-hover:hidden">
                {song.title}
            </h1>
            <div className="h-14 grow group-hover:flex hidden">
                <h1 className="grow self-center text-center text-sm font-serif font-medium">
                    Remove
                </h1>
            </div>
        </div>
    );
};

export default SimpliedSong;
