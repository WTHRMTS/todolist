const { urlencoded } = require("express");
const express =  require("express");
const { getDefaultSettings } = require("http2");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();
app.use(urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = ["Check Email", "Log Hours"];

app.get("/", (req, res) => {
    
    const day = date.getDay();
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
    items.push(item);
    res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server is now active on Port 3000");
});