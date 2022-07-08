import { Game } from "./gameOfLife";

const X = true;
const _ = false;

test("create a new universe", () => {
    const game = new Game(20, 10);
    const h = game.height();
    const w = game.witdh();
    expect(w).toBe(20);
    expect(h).toBe(10);
    expect(
        game
            .universe()
            .flat()
            .every((cell) => !cell)
    ).toBe(true);
});

test("fill diagonal with cells", () => {
    const game = new Game(5, 5);

    for (let i = 0; i < 5; ++i) {
        game.setCell(i, i, true);
    }

    expect(
        game
            .universe()
            .every((row, i) => row.every((cell, j) => (i === j ? cell : !cell)))
    ).toBe(true);
});

test("add and run glider", () => {
    const game = new Game(5, 5);

    game.clickCell(2, 1);
    game.clickCell(1, 2);
    game.clickCell(1, 3);
    game.clickCell(2, 3);
    game.clickCell(3, 3);

    const firstState = [
        [_, _, _, _, _],
        [_, _, X, _, _],
        [_, X, _, _, _],
        [_, X, X, X, _],
        [_, _, _, _, _],
    ];

    const secondState = [
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, X, _, X, _],
        [_, X, X, _, _],
        [_, _, X, _, _],
    ];

    const thirdState = [
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, X, _, _, _],
        [_, X, _, X, _],
        [_, X, X, _, _],
    ];

    const fourthState = [
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, _, X, _, _],
        [X, X, _, _, _],
        [_, X, X, _, _],
    ];

    expect(game.universe()).toStrictEqual(firstState);
    game.tick();
    expect(game.universe()).toStrictEqual(secondState);
    game.tick();
    expect(game.universe()).toStrictEqual(thirdState);
    game.tick();
    expect(game.universe()).toStrictEqual(fourthState);

    for (let i = 0; i < 17; ++i) {
        game.tick();
    }

    expect(game.universe()).toStrictEqual(firstState);
});

test("toggle cell", () => {
    const game = new Game(1, 1);
    game.clickCell(0, 0);
    expect(game.universe()).toStrictEqual([[X]]);
    game.clickCell(0, 0);
    expect(game.universe()).toStrictEqual([[_]]);
});

test("clear universe", () => {
    const game = new Game(3, 3);
    game.clickCell(0, 0);
    game.clickCell(1, 1);
    game.clickCell(2, 2);
    game.clear();
    expect(game.universe()).toStrictEqual([
        [_, _, _],
        [_, _, _],
        [_, _, _],
    ]);
});
