import React, { useRef } from "react";
import { Card } from "./Card";
import { SongProp } from "../controllers/getSongs";
import { useSpring, animated, SpringValue, SpringRef } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";


export const HoverState = {
	Left: -1,
    Neutral: 0,
    Right: 1
}

export interface DeckProp {
    cards: SongProp[];
    swipedLeft: () => void;
    swipedRight: (card: SongProp) => void;
    onHover: (number) => void;
    curIndex: number;
    prevAction?: string;
}

export const MAX_CARD_SHOWN = 4;

export const Deck = ({
    cards,
    swipedLeft,
    swipedRight,
    onHover,
    curIndex,
    prevAction,
}: DeckProp) => {
    let prevIndex = Number(localStorage.getItem('prev_deck_index'))
    let showPrevCard = prevIndex === curIndex - 1

    const position = (i: number) => ({
        x: 0,
        y: 25 * i,
        scale: 1 - 0.05 * i,
        opacity: i < MAX_CARD_SHOWN - 1 ? 1 : 0,
    });

    let props: {
        x: SpringValue<number>;
        y: SpringValue<number>;
        scale: SpringValue<number>;
        opacity: SpringValue<number>;
    }[] = [];
    let apis: SpringRef<{
        x: number;
        y: number;
        scale: number;
        opacity: number;
    }>[] = [];
    for (let i = 0; i < cards.length; ++i) {
        const [prop, api] = useSpring(() => ({
            from: position(i - curIndex),
        }));
        props.push(prop);
        apis.push(api);
    }

    for (let i = curIndex; i < curIndex + MAX_CARD_SHOWN; ++i) {
        apis[i]?.start(position(i - curIndex));
    }

    if (curIndex === prevIndex + 1) {
        if (prevAction === "left") {
            apis[prevIndex]?.start({
                x: -200,
                opacity: 0,
            });
        } else if (prevAction === "right") {
            apis[prevIndex]?.start({
                x: 200,
                opacity: 0,
            });
        }      
    } else if (curIndex === prevIndex - 1) {
        apis[curIndex]?.start(position(0));
    } 
    localStorage.setItem('prev_deck_index', curIndex.toString());   
    const bind = useGesture(
        {
            onDrag: ({ args: [index], down, movement: [mx, my] }) => {
                if (index !== curIndex) return;
                let swipeLeft = !down && mx < -150;
                let swipeRight = !down && mx > 150;
                if (swipeLeft) {
                    apis[curIndex].start({
                        x: mx - 100,
                        opacity: 0,
                    });
                    onHover(HoverState.Neutral)
                    swipedLeft()
                } else if (swipeRight) {
                    apis[curIndex].start({
                        x: mx + 100,
                        opacity: 0
                    });
                    onHover(HoverState.Neutral)
                    swipedRight(cards[curIndex])
                } else {
                    apis[curIndex].start({
                        x: down ? mx : 0,
                        y: down ? my : 0,
                        immediate: down,
                    });
                    let hoverState = down && mx < -50 ? HoverState.Left : (down && mx > 50 ? HoverState.Right : HoverState.Neutral)
                    onHover(hoverState)
                }
                for (let i = 1; i < MAX_CARD_SHOWN; ++i) {
                    const dy = 25 * Math.min(1, Math.abs(mx) / 75);
                    const dScale = 0.05 * Math.min(1, Math.abs(mx) / 75);
                    apis[i + curIndex]?.start({
                        y:
                            down || swipeLeft || swipeRight
                                ? 25 * i - dy
                                : 25 * i,
                        scale:
                            down || swipeLeft || swipeRight
                                ? 1 - 0.05 * i + dScale
                                : 1 - 0.05 * i,
                        opacity:
                            i < MAX_CARD_SHOWN - 1
                                ? 1
                                : down || swipeLeft || swipeRight
                                ? Math.min(1, Math.abs(mx) / 120)
                                : 0,
                    });
                }
            },
        },
        {
            drag: {
                filterTaps: true,
                rubberband: 0.6,
            },
        }
    );

    return (
        <>
            {showPrevCard && curIndex > 0 && (
                <animated.div
                    className="absolute touch-none pointer-events-none"
                    style={props[curIndex-1]}
                    key={curIndex - 1}
                >
                    <Card {...cards[curIndex-1]}></Card>
                </animated.div>
            )}
            {props
                .slice(curIndex, curIndex + MAX_CARD_SHOWN)
                .map(({ x, y, scale, opacity }, index) => (
                    <animated.div
                        {...bind(index + curIndex)}
                        className="absolute touch-none"
                        style={{
                            x,
                            y,
                            zIndex: 100 - index,
                            scaleX: scale,
                            scaleY: scale,
                            opacity: opacity,
                            backfaceVisibility: "hidden",
                        }}
                        key={index + curIndex}
                    >
                        <Card {...cards[index + curIndex]}></Card>
                    </animated.div>
                ))}
        </>
    );
};
