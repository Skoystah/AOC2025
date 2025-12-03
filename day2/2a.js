import { getInput } from "../input.js";

function processInput(input) {
    let invalidSum = 0;
    const ids = input
        .trim()
        .split(',')
        .map(range => range.split('-'));
    console.log(ids);
    //Add day code here
    for (const range of ids) {
        invalidSum += checkIds(range);
    }
    console.log(invalidSum);

}

// first brute force it
function checkIds(range) {
    let rangeInvalidSum = 0;
    let [id1, id2] = range;
    for (let i = parseInt(id1); i <= parseInt(id2); i++) {
        const numString = String(i);
        if (numString.length % 2 !== 0) {
            continue;
        }

        if (numString.slice(0, numString.length / 2) === numString.slice(numString.length / 2)) {
            rangeInvalidSum += i;
        }
    }
    return rangeInvalidSum

}

processInput(getInput(true));
processInput(getInput(false));
