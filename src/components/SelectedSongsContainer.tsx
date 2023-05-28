import React from "react";
import { SongProp } from "../controllers/getSongs";
import SimpliedSong from "./SimpliedSong";
import '../style/SelectedSongsContainer.css'

interface Prop {
    songs: SongProp[];
    deleteCard: (card: SongProp) => void;
}

const SelectedSongsContainer = ({songs, deleteCard}: Prop) => {
    return (
        <div className="flex flex-col w-[24rem] h-[36rem] bg-gray-100 rounded-md shadow-lg">
            <h1 className="border-l-black border-b-2 text-center m-4 py-2 text-lg font-serif font-medium select-none">
                Selected Songs
            </h1>
            <div className="flex flex-col px-8 pt-4 gap-3 overflow-y-scroll select_songs_container">
                {songs.map((song, index) => (
                  <SimpliedSong song={song} deleteCard={deleteCard} key={index}></SimpliedSong>
                ))}
            </div>
        </div>
    );
};

export default SelectedSongsContainer;
