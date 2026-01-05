const fs = require("node: fs")
const path = require("node:path")
const absolutePath = path.resolve(" /data2.txt")
fs. readFile(absolutePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console. log(err);
    } else {
        console.log(data);
    }
});

try {
    const data = fs.readFileSync(absolutePath, { encoding: "utf-8" });
    console.log(data);
} catch (error) {
    console.log(error);
}
fs.writeFile("./data2.txt", "In hello world", { flag: "a" }, (err) => {
    console.log(err);
});

fs.writeFileSync(path.resolve("./data2.txt"), "adadada", { flag: "a" });


fs.unlink(path.resolve("/data2.txt"), (err => {
    if(err) {
        console.log({ err });
    }
}));

if (!fs.existsSync(path.resolve("./data2.txt"))) {
    fs.writeFileSync(path.resolve("./data2.txt"), "adadada", { flag: "a" })
}
fs.mkdir("ahmed/public/images/asas", { recursive: true }, (err) => {
    console. log(err);
});
fs.rmSync("src", { recursive: true });