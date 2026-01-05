const http = require("node:http");
const { writeFileSync, readfileSync, createReadStream } = require("node:fs")
const { resolve } = require("node:path")
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url == "/") {
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify({ message: "hello on my app......" }));
        res.end();
    } else if (req.method === "GET" && req.url == "/html") {
        const readFileStream = createReadStream(resolve(" /index.html"), { highwaterMark: 50 });
        res.writeHead(200, { "content-type": "text/html" });
        readFileStream.on("data", (chunk) => {
            res.write(chunk);
        });
        readFileStream.on("end", () => {
            return res.end()
        });
    } else {
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
4    }
});