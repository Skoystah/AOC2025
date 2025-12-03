import { getInput } from "../input.js";

function processInput(input) {
    const batteries = input.split('\n').slice(0, -1);
    //Add day code here
    let totalJoltage = 0;
    for (const battery of batteries) {
        let joltage = "000000000000".split("");

        // example 234234234234278 => 434234234278 
        for (let i = 0; i < battery.length; i++) {
            // loop for 'inserting' the digit in the joltage
            for (let j = Math.max(0, joltage.length - (battery.length - i)); j < joltage.length; j++) {
                if (battery[i] > joltage[j]) {
                    joltage[j] = battery[i]
                    reset(joltage, j);
                    break;
                }
            }
        }
        console.log(`Joltage for ${battery} is ${joltage.join("")}`);
        totalJoltage += parseInt(joltage.join(""));
    }
    console.log(`Total joltage is ${totalJoltage}`);
}

function reset(arr, j) {
    for (let i = j + 1; i < arr.length; i++) {
        arr[i] = "0";
    }
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
