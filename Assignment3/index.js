const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = 3000;


// Part 1

// 01- 
function readStreamData() {
    const readFileStream = fs.createReadStream(path.resolve("data.json"), { encoding: "utf-8", highwaterMark: 50 });
    readFileStream.on("data", (chunk) => {
        console.log(chunk);
    });
}

readStreamData();

// 02-


function readAndWriteStream() {
    const readFileStream = fs.createReadStream(path.resolve("source.txt"), { encoding: "utf-8", highwaterMark: 50 });
    const writeFileStream = fs.createWriteStream(path.resolve("dest.txt"));
    readFileStream.on("data", (chunk) => {
        writeFileStream.write(chunk);
    });
}


readAndWriteStream();


// 03-
function pipeline() {
    const readFileStream = fs.createReadStream(path.resolve("source.txt"), { encoding: "utf-8", highwaterMark: 50 });
    const writeFileStream = fs.createWriteStream(path.resolve("dest.txt"));
    readFileStream.pipe(writeFileStream)
}

pipeline();

/// Part 2 

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "POST" && url == "/user") { // 01-
        const users = getData();
        let data = ''
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", (chunk) => {
            let user = JSON.parse(data);

            const userExists = users.find((u) => {
                return user.email === u.email;
            },);

            if (userExists) {
                res.writeHead(400, { "content-type": "application/json" })
                res.write(JSON.stringify({ message: "The user already exists" }));
                res.end();
            } else {
                user.id = users.length == 0 ? 1 : (users[users.length - 1]).id + 1;
                users.push(user);
                updateData(users);
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(users));
                res.end();
            }
        });

    } else if (method === "PATCH" && url.startsWith("/user/")) { // 02- 
        const users = getData();
        const id = url.split("user/")[1];
        const user = users.find((u) => {
            return u.id == id;
        });

        if (!user) {
            res.writeHead(400, { "content-type": "application/json" })
            res.write(JSON.stringify({ message: "User not found" }));
            res.end();
            return;
        }

        let data = '';

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const { name, email } = convertFromStringToJson(data);
            user.name = name ?? user.name;
            user.email = email ?? user.email;
            updateData(users);
            res.writeHead(200, { "content-type": "application/json" })
            res.write(JSON.stringify(users));
            res.end();
        });
    } else if (method == "DELETE" && url.startsWith("/user/")) { // 03- 
        const users = getData();
        const id = url.split("user/")[1];
        const index = users.findIndex((u) => {
            return u.id == id;
        });

        if (index == -1) {
            res.writeHead(400, { "content-type": "application/json" })
            res.write(JSON.stringify({ message: "User not found" }));
            res.end();
            return;
        }
        users.splice(index, 1);
        updateData(users);
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(JSON.stringify({ message: "User deleted successuflly" })));
        res.end();
    } else if (method == "GET" && url == "/user") { // 04- 
        const users = getData();
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(users));
        res.end();
    } else if (method == "GET " && url.startsWith("/user/")) { //05
        const users = getData();
        const id = url.split("user/")[1];
        const user = users.find((u) => {
            return u.id == id;
        });

        if (!user) {
            res.writeHead(400, { "content-type": "application/json" })
            res.write(JSON.stringify({ message: "User not found" }));
            res.end();
            return;
        }

        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(user));
        res.end();

    }
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.write(JSON.stringify({ message: "404 Page Not Found..." }));
        res.end();
    }
});
server.listen(port, () => {
    console.log("Server is running on port 3000");
});

server.on("close", () => {
    console.log("server is close");
})
server.on("error", (error) => {
    if (error.code == 'EADDRINUSE') {
        server.close();
    } else {
        console.log(error);
    }
});


function getData() {
    try {
        let data = fs.readFileSync('data.json', { encoding: "utf-8" });
        let list = JSON.parse(data);
        return list;
    } catch (error) {
        return [];
    }
}

function updateData(newData) {
    fs.writeFileSync(path.resolve("./data.json"), JSON.stringify(newData));
}


function convertFromStringToJson(data) {
    return JSON.parse(data);
}


//Part 2 
/********************************
 * 1. What is the Node.js Event Loop? (0.5 Grade)
2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)

 *********************************/