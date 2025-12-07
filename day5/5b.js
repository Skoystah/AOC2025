import { getInput } from "../input.js";

function processInput(input) {
    //Add day code here
    let amountFresh = 0;
    const lines = input.trim().split("\n\n")

    const ranges = lines[0]
        .split("\n")
        .map(range => range.split("-"))
        .map(range => [parseInt(range[0]), parseInt(range[1])]);

    ranges.sort((a, b) => a[0] - b[0]);

    console.log(ranges)
    const freshRanges = [];
    for (const [start, end] of ranges) {
        let rangeFound = false;
        for (let i = 0; i < freshRanges.length; i++) {
            if (start >= freshRanges[i][0] && start <= freshRanges[i][1]) {
                if (end > freshRanges[i][1]) {
                    freshRanges[i][1] = end;
                }
                rangeFound = true;
                break;
            } else if (end >= freshRanges[i][0] && end <= freshRanges[i][1]) {
                if (start < freshRanges[i][0]) {
                    freshRanges[i][0] = start;
                }
                rangeFound = true;
                break;
            }
        }
        if (!rangeFound) {
            freshRanges.push([start, end]);
            continue;
        }
    }

    for (const [start, end] of freshRanges) {
        amountFresh += end - start + 1;
    }
    console.log(freshRanges);
    console.log(amountFresh);
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
