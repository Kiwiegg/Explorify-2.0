import React, { useState, useRef } from "react";
import { Deck, HoverState } from "./Deck";
import { SongProp } from "../controllers/getSongs";
import { AiOutlineUndo, AiFillHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useLocalStorage } from "usehooks-ts";

interface Prop {
    cards: SongProp[];
    addCard: (card: SongProp) => void;
    deleteCard: (card: SongProp) => void;
}
const SwipeContainer = ({ cards, addCard, deleteCard }: Prop) => {
    const [curIndex, setIndex] = useLocalStorage('cur_index', 0);
    const [hoverState, setHoverState] = useState(HoverState.Neutral);
    const prevAction = useRef("");

    return (
        <div className="w-[24rem] h-[48rem] flex flex-col items-center">
            <div className="w-full h-[36rem]">
                <Deck
                    cards={cards}
                    swipedLeft={() => {
                        setIndex(curIndex + 1);
                    }}
                    swipedRight={(card: SongProp) => {
                        addCard(card);
                        setIndex(curIndex + 1);
                    }}
                    onHover={(hoverState: number) => {
                        setHoverState(hoverState);
                    }}
                    curIndex={curIndex}
                    prevAction={
                        prevAction.current === "left" ||
                        prevAction.current === "right"
                            ? prevAction.current
                            : ""
                    }
                ></Deck>
            </div>
            <div className="flex flex-row gap-10 mt-[4rem] justify-center items-center">
                <AiOutlineUndo
                    size={30}
                    className={`${
                        curIndex > 0
                            ? "cursor-pointer hover:scale-[1.2]"
                            : "pointer-events-auto opacity-30"
                    }
                    duration-200`}
                    onClick={() => {
                        prevAction.current = "undo";
                        if (curIndex > 0) {
                            deleteCard(cards[curIndex - 1]);
                            setIndex(curIndex - 1);
                        }
                    }}
                />
                <RxCross2
                    size={55}
                    className={`cursor-pointer ${
                        hoverState === HoverState.Left && "text-red-600 scale-[1.2] "
                    }hover:scale-[1.2] hover:text-red-600 duration-200`}
                    onClick={() => {
                        if (curIndex < cards.length - 1) {
                            prevAction.current = "left";
                            setIndex(curIndex + 1);
                        }
                    }}
                />
                <AiFillHeart
                    size={55}
                    className={`cursor-pointer ${
                        hoverState === HoverState.Right && "text-pink-400 scale-[1.2] "
                    } hover:scale-[1.2] hover:text-pink-400 duration-200`}
                    onClick={() => {
                        if (curIndex < cards.length - 1) {
                            prevAction.current = "right";
                            addCard(cards[curIndex]);
                            setIndex(curIndex + 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SwipeContainer;
