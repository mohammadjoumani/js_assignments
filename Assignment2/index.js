const path = require("node:path");
const fs = require("node:fs");
const os = require('node:os');
const {EventEmitter} = require("node:events");

// 01- 
console.log("-------------- Question Number 01 ---------------");

function getCurrentPathAndDirectory() {
    console.log(__filename);
    console.log(path.dirname(__filename));
}

getCurrentPathAndDirectory();

// 02-
console.log("-------------- Question Number 02 ---------------");

function getFileName(filePath) {
    console.log(path.basename(filePath));
}

getFileName("/user/files/report.pdf");

// 03-
console.log("-------------- Question Number 03 ---------------");

function buildPathFromObject(pathObject) {
    console.log(path.format(pathObject));
}

buildPathFromObject(path.parse(__filename))


// 04-
console.log("-------------- Question Number 04 ---------------");

function getFileExtension(filePath) {
    console.log(path.extname(filePath));
    
}

getFileExtension("/docs/readme.md");


// 05- 
console.log("-------------- Question Number 05 ---------------");

function getNameAndExt(filePath) {
    console.log(path.parse(filePath));
    
}

getNameAndExt("/docs/readme.md");


// 06-
console.log("-------------- Question Number 06 ---------------");

function checkAbsolute(filePath) {
    console.log(path.isAbsolute(filePath));
}

checkAbsolute("/home/user/file.txt");

// 07- 
console.log("-------------- Question Number 07 ---------------");


function joinsMultipleSegments(...args) {
    console.log(path.join(...args));
}

joinsMultipleSegments("src","components", "App.js");


// 08- 
console.log("-------------- Question Number 08 ---------------");

function convertRetriveToAbsolute(filePath) {
console.log(path.resolve(filePath));

}

convertRetriveToAbsolute("./index.js");


// 09- 
console.log("-------------- Question Number 09 ---------------");

function joinTwoPaths(path1, path2) {
    console.log(path.join(path1, path2));
}

joinTwoPaths("/folder1", "folder2/file.txt");


// 10-
console.log("-------------- Question Number 10 ---------------");

function deleteFileAsync(filePath) {
    const absolutePath = path.resolve(filePath);
    const data = fs.unlink(absolutePath, (err) => {
        if(err) {
            console.log(err);
        }
    });
    console.log(`The ${path.basename(filePath)} is deleted.`);
    
}

deleteFileAsync("./async.txt");


// 11- 
console.log("-------------- Question Number 11 ---------------");

function createsFolderSync(){ 
    const data = fs.mkdirSync("images/users", { recursive: true });
    console.log("Success");
    
}

createsFolderSync();

// 12-
console.log("-------------- Question Number 12 ---------------");

const event = new EventEmitter();


event.on("start", () => {
    console.log("Welcome event triggered!");
});


event.emit("start");


// 13-
console.log("-------------- Question Number 13 ---------------");

event.on("login", (username) => {
    console.log(`User logged in: ${username}`);
});


event.emit("login", "Ahmed");


// 14-
console.log("-------------- Question Number 14 ---------------");

function readFileSync() {
    try {
        const absolutePath = path.resolve("./bonus.js")
        const data = fs.readFileSync(absolutePath, {encoding: "utf-8"});
        console.log(data);
    } catch(error) {
        console.log(error);
    }
}

readFileSync();


// 15-
console.log("-------------- Question Number 15 ---------------");

function writeAsyncFile(pathFile, content) {
    fs.writeFile(pathFile, content, { flag: "a" }, (err) => {
        if(err) {
            console.log(err);
        }
    });
}

writeAsyncFile("./async.txt", "mmmmmm");

// 16-
console.log("-------------- Question Number 16 ---------------");

function checkDirectory(filePath) {
    const absolutePath = path.resolve(filePath);
    console.log(fs.existsSync(absolutePath));
}

checkDirectory("./async.txt");


// 17-
console.log("-------------- Question Number 17 ---------------");

function getDeviceInfo() {
    console.log(`{Platform: ${os.platform()}, Arch: ${os.arch()}}`);
    
}

getDeviceInfo();