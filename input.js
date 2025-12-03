import fs from "fs"
export function getInput(test = false) {
    const input = test ? `test` : `input`;
    return fs.readFileSync(input, "utf8");
}

