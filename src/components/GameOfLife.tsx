import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Game } from "../gameOfLife";
import "./GameOfLife.css";

interface IPreventable {
    preventDefault: () => void;
}

function preventDefault(e: IPreventable) {
    e.preventDefault();
}

function useGame(w: number, h: number) {
    const gameRef = useRef<Game>(new Game(w, h));
    const [, setState] = useState({});

    const forceUpdate = useCallback(() => {
        setState({});
    }, [setState]);

    const game = gameRef.current;

    return {
        universe: game.universe(),
        clickCell: (x: number, y: number) => {
            game.clickCell(x, y);
            forceUpdate();
        },
        clear: () => {
            game.clear();
            forceUpdate();
        },
        tick: () => {
            game.tick();
            forceUpdate();
        },
    };
}

export function CellsGrid({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    const { universe, clickCell, clear, tick } = useGame(width, height);
    const [speed, setSpeed] = useState(10);
    const [pause, setPause] = useState(true);
    const interval = useRef<NodeJS.Timer>();

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === " ") {
                setPause((prev) => {
                    if (prev) {
                        // tick();
                    }
                    return !prev;
                });
            }
            if (e.key === "z") {
                clear();
            }
            if (e.key === "+") {
                setSpeed((prev) => (prev += 30));
            }
            if (e.key === "-") {
                setSpeed((prev) => (prev -= 30));
            }
        },
        [clear, tick, setSpeed, pause]
    );

    const handleClick = useCallback(
        (x: number, y: number) => (e: MouseEvent) => {
            console.log("CLICK")
            if (!e.button && e.buttons === 1) {
                clickCell(x, y);
            }
        },
        [clickCell]
    );

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress);
    }, []);

    useEffect(() => {
        clearInterval(interval.current);
        if (!pause) {
            interval.current = setInterval(tick, 1000 - speed);
        }
    }, [pause, speed]);

    return (
        <div className="grid" draggable="false" onDragStart={preventDefault}>
            {universe.map((row, rid) =>
                row.map((cell, cid) => {
                    const cellStyle = cell ? "cell" : "space";

                    return (
                        <div
                            style={{ width: `${100 / width}%` }}
                            draggable="false"
                            key={`${rid}:${cid}`}
                            className={"grid-cell " + cellStyle}
                            data-testid="game-cell"
                            onMouseDown={handleClick(cid, rid)}
                            onMouseEnter={handleClick(cid, rid)}
                            onDragStart={preventDefault}
                        />
                    );
                })
            )}
        </div>
    );
}

export function GameOfLife({
    width = 5,
    height = 5,
}: {
    width: number;
    height: number;
}) {
    return (
        <div className="game-of-life" draggable="false">
            <CellsGrid width={width} height={height} />
        </div>
    );
}
