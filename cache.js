import fs from "fs";

const cachedFiles = {};
export function readFileSync(file, encoding) {
    if(file in cachedFiles && encoding in cachedFiles[file])
        return cachedFiles[file][encoding];
    const content = fs.readFileSync(file, encoding);
    if(!(file in cachedFiles)) cachedFiles[file] = {};
    cachedFiles[file][encoding] = content;
    return content;
}