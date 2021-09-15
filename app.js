const { urlencoded } = require("express");
const express =  require("express");
const https = require("https");

const app = express();
app.use(urlencoded({extended: true}));

app.set('view engine', 'ejs');
var items = ["Buy Food", "Cook Food", "Eat Food"];
var numItems = items.length;
app.get("/", (req, res) => {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-AU", options);
    // let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // var day = daysOfTheWeek[currentDay];
    // if (currentDay < 0 || currentDay > 6){
    //     console.log("Error: current day is equal to: " + currentDay);
    // };
    res.render("list", {
        day: day,
        numItems: numItems,
        newListItems: items
    });
});

app.post("/", (req, res) => {
    items.push(req.body.newItem);
    numItems = items.length
    res.redirect("/");
    console.log(item);
});

app.listen(3000, () => {
    console.log("Server is now active on Port 3000");
});