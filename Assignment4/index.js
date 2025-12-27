const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const app = express();
const port = 3000;


app.use(express.json());

//Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)(1
// Grades)
// o URL: POST /user

// 01- 
app.post("/user", (req, res, next) => {
    const users = getData();
    const user = req.body;
    const userExists = users.find((u) => {
        return user.email === u.email;
    },);


    if (userExists) {
        res.status(400).json({ message: "The user already exists" });
    } else {
        user.id = users.length == 0 ? 1 : (users[users.length - 1]).id + 1;
        users.push(user);
        updateData(users);
        res.status(201).json({ message: "Success add user", user: user });
    }
});

// 02- 
app.patch("/user/:id", (req, res, next) => {
    const users = getData();
    const { id } = req.params;

    const user = users.find((u) => {
        return u.id == id;
    });

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const { name, email } = req.body;
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    updateData(users);
    res.status(200).json({ users: users });
});

// 03- 
app.delete("/user/:id", (req, res, next) => {
    const users = getData();
    const { id } = req.params;
    const index = users.findIndex((u) => {
        return u.id == id;
    });

    if (index == -1) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    users.splice(index, 1);
    updateData(users);
    res.status(200).json({ message: "User deleted successuflly" });
});

// 04-
app.get("/user/getByName", (req, res, next) => {
    const users = getData();
    const { name } = req.query;

    const data = users.filter((u) => {
        return u.name.toLowerCase().includes(name.toLowerCase());
    });

    if (data.length == 0) {
        res.status(404).json({ message: "User not found", name });
        return;
    }
    res.status(200).json(data);
});

// 05-
app.get("/user", (req, res, next) => {
    const users = getData();
    res.status(200).json(users);
});

// 06-
app.get("/user/filter", (req, res, next) => {
    const users = getData();
    const { age } = req.query;

    const data = users.filter((u) => {
        return u.age <= age;
    });

    if (data.length == 0) {
        res.status(404).json({ message: "User not found", age });
        return;
    }
    res.status(200).json(data);
});

// 07-
app.get("/user/:id", (req, res, next) => {
    const users = getData();
    const id = req.params.id;
    const user = users.find((u) => {
        return u.id == id;
    });

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    res.status(400).json({ user });
});


app.use((req, res, next) => {
    res.status(404).json({ message: "404 Not Found" });

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
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