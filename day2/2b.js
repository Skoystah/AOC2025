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

const partsEqual = (el, ix, arr) => {
    if (ix === arr.length - 1) {
        return true
    }

    return el === arr[ix + 1];
}
// first brute force it
function checkIds(range) {
    let rangeInvalidSum = 0;
    let [id1, id2] = range;
    for (let i = parseInt(id1); i <= parseInt(id2); i++) {
        const numString = String(i);

        for (let j = 2; j <= numString.length; j++) {
            if (numString.length % j !== 0) continue;

            const seqLength = numString.length / j;
            const re = new RegExp(`\\d{${seqLength}}`, "g");
            const seq = numString.match(re);

            if (seq.every(partsEqual)) {
                console.log(`Found invalid id ${numString} in parts ${seq}`);
                rangeInvalidSum += parseInt(numString)
                break;
            }
        }
    }
    return rangeInvalidSum

}


processInput(getInput(true));
processInput(getInput(false));
