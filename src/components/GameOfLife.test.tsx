import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { GameOfLife } from "./GameOfLife";

function showCells(cells: HTMLElement[], width: number) {
    const x = cells
        .map(
            (cell, id) =>
                (id % width === 0 ? "\n" : "") +
                (cell.className.includes(" cell ") ? "X" : "_")
        )
        .join(" ");

    console.log(x);

    if (!x.includes("X")) {
        throw Error;
    }
}

test("run app", async () => {
    // render(<GameOfLife width={5} height={5} />);

    // let cells = await screen.findAllByTestId("game-cell");

    // fireEvent.click(cells[0]);

    // cells = await screen.findAllByTestId("game-cell");

    // showCells(cells, 5);

    // await waitFor(() => expect(cells[0]).toHaveClass("grid-cell cell"));
    // console.log(cells[0].className);
});
