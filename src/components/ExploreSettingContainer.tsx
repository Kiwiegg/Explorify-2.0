import React from "react";

const ExploreSettingContainer = () => {
    return (
        <div className="flex flex-col w-[24rem] h-[18rem] bg-gray-100 rounded-md shadow-lg">
            <div className="flex border-b-2 m-4 py-2">
                <h1 className="text-sm font-serif mt-1"> Number of songs: </h1>
                <select
                    defaultValue={30}
                    data-te-select-init
                    className="ml-2 border-gray-300 border-2"
                    name="num-of-songs"
                    id="num-of-songs"
                >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className="flex flex-col mx-4 ">
                <h1 className="text-sm font-serif mb-2"> Playlist name: </h1>
                <input
                    className="text-base font-serif outline-none bg-transparent border-b-2 focus:border-[#8b1bad]"
                    id="playlist-name"
                    type="text"
                    defaultValue={"Explorify Mix"}
                    spellCheck={false}
                ></input>
            </div>
            <div className="mx-4 mt-4 border-b-2 py-1">
                <input type="checkbox" id="playlist-option" />
                <label
                    className="ml-2 text-sm font-serif"
                    htmlFor="playlist-option"
                >
                    Include selected songs in playlist
                </label>
            </div>
            <div className="flex justify-center gap-8 mx-4 mt-8">
                <button className="text-sm font-serif rounded-md bg-[var(--color-primary)] p-3">
                    Generate playlist
                </button>
                <button className="text-sm font-serif rounded-md bg-[var(--color-primary)] p-3">
                    Save playlist to Spotify
                </button>
            </div>
        </div>
    );
};

export default ExploreSettingContainer;
