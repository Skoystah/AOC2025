import { getInput } from "../input.js";

function processInput(input) {
    const tiles = input
        .trim()
        .split("\n")
        .map(row => row.split(","))
        .map(tile => tile.map(coord => parseInt(coord)));


    const [maxCol, maxRow] = tiles.reduce((max, cur) =>
        max = [Math.max(max[0], cur[0]), Math.max(max[1], cur[1])]);

    const grid = new Array(maxRow + 1);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(maxCol + 1).fill(".");
    }

    let prev = tiles[tiles.length - 1];

    for (const tile of tiles) {
        const [col, row] = tile;
        grid[row][col] = "#";
        fillGreen(grid, tile, prev);
        prev = tile;
    }
    // fillGrid(grid);

    let maxArea = 0;
    let maxTile1, maxTile2;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles.length; j++) {
            if (i === j) continue;

            const [tile1, tile2] = [tiles[i], tiles[j]];
            if (!isValidRectangle(tile1, tile2)) continue;

            maxArea = Math.max(maxArea, getAreaRectangle(tile1, tile2));
            [maxTile1, maxTile2] = [tile1, tile2];
        }
    }
    console.log(`The max area is ${maxArea} for tiles ${maxTile1} and ${maxTile2}`);
}

function getAreaRectangle(tile1, tile2) {
    const area = (Math.abs(tile1[0] - tile2[0]) + 1) *
        (Math.abs(tile1[1] - tile2[1]) + 1);
    return area;
}

function isValidRectangle(tile1, tile2) {
}

function fillGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        let fill = false;
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "#" || grid[i][j] === "X") {
                fill = true;
            } else if (grid[i][j] === "." && fill) {
                grid[i][j] = "X";
            }
        }
    }
}

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        let row = "";
        for (let j = 0; j < grid[0].length; j++) {
            row += grid[i][j];
        }
        console.log(row);
    }
}

function fillGreen(grid, tile1, tile2) {
    if (tile1[0] === tile2[0]) {
        for (let i = Math.min(tile1[1], tile2[1]) + 1;
            i < Math.max(tile1[1], tile2[1]);
            i++) {

            grid[i][tile1[0]] = "X";
        }
    } else {

        for (let i = Math.min(tile1[0], tile2[0]) + 1;
            i < Math.max(tile1[0], tile2[0]);
            i++) {

            grid[tile1[1]][i] = "X";
        }
    }
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
