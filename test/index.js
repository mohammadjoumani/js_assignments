const path = require("node:path");


console.log({__dirname});
console.log({__filename});
console.log(path.basename(__dirname));
console.log(path.basename(__filename, ".js"));

console.log(path.extname(__dirname));
console.log(path.extname(__filename));

console.log(path.dirname(__dirname));
console.log(path.dirname(__filename));

console.log(path.join(__dirname, "main.js"));


console.log(path.isAbsolute("./users/maohammad/test.js"));
console.log(path.isAbsolute("main.js"));

console.log(path.resolve("config/.env"));


console.log(path.normalize("folded////user/...../admin/index.js"));


console.log(path.parse(__dirname));
console.log(path.parse(__filename));

console.log(path.format(
    {
  root: '/',
  dir: '/Users/mohammadjoumani/Assignments/test',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
));








