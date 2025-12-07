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

    const ingredients = lines[1].split("\n").map(ingr => parseInt(ingr));

    for (const ingredient of ingredients) {
        for (const [start, end] of ranges) {
            if (ingredient >= start && ingredient <= end) {
                console.log(`Found range for ID ${ingredient} in ${start} - ${end}`)
                amountFresh++;
                break;
            }
        }
    }
    console.log(`Amount of fresh ingredients: ${amountFresh}`);
    console.log(`Total ingredients ${ingredients.length}`)
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
