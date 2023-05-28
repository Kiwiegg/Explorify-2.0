import React from "react";
import { SongProp } from "../controllers/getSongs";
import SelectedSongsContainer from "../components/SelectedSongsContainer";
import { useLocalStorage } from "usehooks-ts";
import ExploreSettingContainer from "../components/ExploreSettingContainer";

const ExplorePage = () => {
    const [size, setSize] = useLocalStorage("songs_list_size", 0);
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
            if (
                key.audioSrc === song.audioSrc &&
                key.imageSrc === song.imageSrc
            ) {
                songsSaved.delete(key);
            }
        });
        localStorage.setItem(
            "songs_list",
            JSON.stringify(Array.from(songsSaved))
        );
        setSize(songsSaved.size);
    };

    return (
        <div className="flex w-4/5 mx-auto mt-[10rem]">
            <div className="flex flex-col gap-6 mx-auto">
                <ExploreSettingContainer />
                <SelectedSongsContainer
                    songs={Array.from(songsSaved)}
                    deleteCard={deleteCard}
                />
            </div>
        </div>
    );
};

export default ExplorePage;
