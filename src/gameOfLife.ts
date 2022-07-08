export type Cell = boolean;
export type Cells = Cell[][];

export class Game {
    private unvrs: Cells;

    constructor(w = 10, h = 10) {
        this.unvrs = this.createUniverse(w, h);
    }

    tick() {
        const curr = this.unvrs;
        this.unvrs = this.createUniverse(this.witdh(), this.height());

        for (let y = 0; y < this.height(); ++y) {
            for (let x = 0; x < this.witdh(); ++x) {
                let neighbours = 0;
                const cellAlive = this.getCell(x, y, curr);

                for (let nY = y - 1; nY <= y + 1; ++nY) {
                    for (let nX = x - 1; nX <= x + 1; ++nX) {
                        neighbours += Number(this.getCell(nX, nY, curr));
                    }
                }

                neighbours -= Number(cellAlive);

                if (cellAlive) {
                    this.setCell(x, y, [2, 3].includes(neighbours));
                } else {
                    this.setCell(x, y, neighbours === 3);
                }
            }
        }
    }

    witdh(): number {
        return this.height() === 0 ? 0 : this.unvrs[0].length;
    }

    height(): number {
        return this.unvrs.length;
    }

    universe(): Cells {
        return this.unvrs;
    }

    private getCell(x: number, y: number, universe?: Cells): Cell {
        const cells = universe ? universe : this.unvrs;

        let i = y % this.height();
        i = i < 0 ? this.height() - 1 : i;

        let j = x % this.witdh();
        j = j < 0 ? this.witdh() - 1 : j;

        return cells[i][j];
    }

    clickCell(x: number, y: number) {
        this.unvrs[y][x] = !this.unvrs[y][x];
    }

    setCell(x: number, y: number, cell: Cell) {
        this.unvrs[y][x] = cell;
    }

    clear() {
        this.unvrs = this.clearCells(this.unvrs, this.witdh(), this.height());
    }

    private clearCells(cells: Cells, w: number, h: number) {
        for (let i = 0; i < h; ++i) {
            cells[i] = [];
            for (let j = 0; j < w; ++j) {
                cells[i][j] = false;
            }
        }

        return cells;
    }

    private createUniverse(w: number, h: number): Cells {
        const cells: Cells = [];
        return this.clearCells(cells, w, h);
    }
}
