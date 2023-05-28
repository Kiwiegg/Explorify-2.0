import React, { useRef, useState } from "react";
import "../index.css";
import SwipeContainer from "../components/SwipeContainer";
import SelectedSongsContainer from "../components/SelectedSongsContainer";
import { SongProp } from "../controllers/getSongs";
import { getSongsForTinder } from "../controllers/getSongs";
import { useLocalStorage } from "usehooks-ts";

function TinderPage() {
    const [size, setSize] = useLocalStorage("songs_list_size", 0);
    const [cards, setCards] = useLocalStorage("songs", getSongsForTinder());

    let songsFromLocalStorage = localStorage.getItem("songs_list");
    let songsSaved = new Set<SongProp>(
        songsFromLocalStorage ? JSON.parse(songsFromLocalStorage) : []
    );

    const addCard = (song: SongProp) => {
        songsSaved.add(song);
        localStorage.setItem(
            "songs_list",
            JSON.stringify(Array.from(songsSaved))
        );
        setSize(songsSaved.size);
    };

    const deleteCard = (song: SongProp) => {
        songsSaved.forEach((key) => {
            if (key.audioSrc === song.audioSrc && key.imageSrc === song.imageSrc) {
                songsSaved.delete(key)
            }
        });
        localStorage.setItem(
            "songs_list",
            JSON.stringify(Array.from(songsSaved))
        );
        setSize(songsSaved.size);
    };

    return (
        <div className="flex w-4/5 mx-auto">
            <div className="mx-auto mt-[7rem]">
                <SwipeContainer
                    cards={cards}
                    addCard={addCard}
                    deleteCard={deleteCard}
                />
            </div>
            <div className="mx-auto mt-[7rem]">
                <SelectedSongsContainer
                    songs={Array.from(songsSaved)}
                    deleteCard={deleteCard}
                />
            </div>
        </div>
    );
}

export default TinderPage;
