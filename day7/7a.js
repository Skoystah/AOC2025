import { getInput } from "../input.js";

function processInput(input) {
    const grid = input
        .trim()
        .split("\n")
        .map(row => row.split(""));

    console.log(processBeam(grid[0].indexOf('S'), 0, grid));
}

// x, y = coordinates of beam origin (= S or square of last beam)
function processBeam(x, y, grid) {
    //bottom row or column out of bounds - stop
    if (y === grid.length - 1 || x < 0 || x >= grid[0].length) {
        return 0;
    }

    // square already processed
    if (grid[y][x] === "|") {
        return 0;
    }

    // empty square, continue downwards
    if (grid[y][x] === "." || grid[y][x] === "S") {
        grid[y][x] = "|";
        return processBeam(x, y + 1, grid);
    }

    if (grid[y][x] === "^") {
        return 1 + processBeam(x - 1, y, grid) + processBeam(x + 1, y, grid);
    }
}


//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
