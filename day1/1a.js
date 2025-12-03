import { getInput } from "../input.js";

function processInput(input) {
    let dialPosition = 50;
    let counter = 0;

    for (const line of input.split("\n")) {
        if (!line) {
            continue
        }
        let direction, clicks;
        [direction, clicks] = [line.slice(0, 1), parseInt(line.slice(1))];
        // Alternative would be replace L by - and R by '' beforehand.
        if (direction === "L") {
            dialPosition -= clicks;
        } else {
            dialPosition += clicks;
        }
        if (dialPosition % 100 === 0) {
            counter++;
        }
    }

    console.log(`Counter: ${counter}`);
}

processInput(getInput(true));
processInput(getInput(false));
