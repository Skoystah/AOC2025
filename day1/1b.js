const contents = file.split("\n");

let dialPosition = 50;
let counter = 0;

for (const line of contents) {
    [direction, clicks] = [line.slice(0, 1), parseInt(line.slice(1))];
    if (!direction) {
        continue
    }
    // Alternative would be replace L by - and R by '' beforehand.
    if (direction === "L") {
        direction = -1;
    } else {
        direction = 1;
    }

    for (let i = 0; i < clicks; i++) {
        dialPosition += direction;
        if (dialPosition % 100 === 0) {
            counter++;
        }
    }
}

console.log(`Counter: ${counter}`);

