import { getInput } from "../input.js";

function processInput(input) {
    //Add day code here
    const boxes = input
        .trim()
        .split("\n")
        .map(box => box.split(","))
        .map(box => box.map(coord => parseInt(coord)));

    const distances = new Array(boxes.length);
    for (let i = 0; i < boxes.length; i++) {
        distances[i] = new Array(boxes.length).fill(0);
    }

    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            distances[i][j] = calcDistance(boxes[i], boxes[j]);
        }
    }

    const circuits = [];
    const connected = new Set();

    let i = 0;
    while (true) {
        const [box1, box2] = getMinDistance(distances);

        if (!(box1 >= 0 || box2 >= 0)) {
            console.log("Nothing!")
            break;
        }

        let circuit1, circuit2;
        circuit1 = undefined;
        circuit2 = undefined;

        for (let i = 0; i < circuits.length; i++) {
            if (circuit1 && circuit2) {
                break;
            }

            if (circuits[i].has(box1)) {
                circuit1 = i;
            }
            if (circuits[i].has(box2)) {
                circuit2 = i;
            }
        }

        if (circuit1 === undefined && circuit2 === undefined) {
            circuits.push(new Set([box1, box2]));
        } else if (circuit1 === circuit2) {
        } else if (circuit1 != undefined && circuit2 != undefined) {
            circuits[circuit1] = new Set([...circuits[circuit1], ...circuits[circuit2]]);
            circuits.splice(circuit2, 1);
        } else if (circuit1 != undefined) {
            circuits[circuit1].add(box2);
        } else if (circuit2 != undefined) {
            circuits[circuit2].add(box1);
        }
        i++;
        connect(connected, distances, box1, box2);
        if (circuits[0].size === 1000) {
            console.log(box1, box2);
            console.log(boxes[box1], boxes[box2]);
            break;
        };
    }

    circuits.sort((a, b) => b.size - a.size)
    // console.log(circuits);
    // console.log(connected, connected.size);
    for (let i = 0; i < 1000; i++) {
        if (!circuits[0].has(i)) {
            console.log("doesnt have", i);
        }
    }
    // console.log(circuits.map(c => c.size));
};

function calcDistance(box1, box2) {
    return Math.sqrt(
        Math.pow(box1[0] - box2[0], 2) +
        Math.pow(box1[1] - box2[1], 2) +
        Math.pow(box1[2] - box2[2], 2));
}

function getMinDistance(distances) {
    let minDistance = Infinity;
    let coords = [];

    for (let i = 0; i < distances.length; i++) {
        for (let j = 0; j < distances.length; j++) {
            if (i === j || distances[i][j] === 0) continue;
            if (distances[i][j] < minDistance) {
                minDistance = distances[i][j];
                coords = [i, j];
            }
        }
    }
    // console.log(`Min dist between ${coords} is ${minDistance}`)
    return coords;
}

function connect(connected, distances, box1, box2) {
    distances[box1][box2] = 0;
    distances[box2][box1] = 0;
    connected.add(box1);
    connected.add(box2);
}

//Test data
// processInput(getInput(true));
//Input data
processInput(getInput(false));
