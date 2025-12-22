const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

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
    const gzipStream = zlib.crea
    readFileStream.pipe(gzipStream).pipe(writeFileStream)
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
 01-

The Event Loop is the core mechanism in Node.js that allows it to perform non-blocking, asynchronous operations using a single thread.
It continuously checks:
the Call Stack
the Event Queue

02- 
Libuv is a C library used internally by Node.js.
Its role includes:
managing the Event Loop
handling asynchronous operations such as:
file system access
networking
timers

03- 
- The task is delegated to Libuv
- Libuv executes it using: the operating system (for I/O) or the thread pool
- Once completed, the callback is placed into the Event Queue
- The Event Loop pushes it to the Call Stack for execution

04- 
- Call Stack: Executes synchronous code in a Last-In-First-Out (LIFO) order.
- Event Queue: Holds callbacks of completed asynchronous tasks waiting to be executed.
- Event Loop: Continuously monitors the Call Stack and Event Queue, moving tasks to the Call Stack when it is empty.

05- 
The Thread Pool is a set of worker threads provided by Libuv to handle heavy operations

The default size is 4 threads.

06- 
Blocking Code: Blocks the Event Loop and prevents other code from executing.
Non-Blocking Code: Is executed asynchronously and does not block the Event Loop.

 *********************************/