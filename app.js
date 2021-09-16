const { urlencoded } = require("express");
const express =  require("express");
const https = require("https");

const app = express();
app.use(urlencoded({extended: true}));


app.set('view engine', 'ejs');

app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let numItems = items.length;
app.get("/", (req, res) => {

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-AU", options);
    // let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let day = daysOfTheWeek[currentDay];
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