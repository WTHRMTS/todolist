const { urlencoded } = require("express");
const express =  require("express");
const https = require("https");

const app = express();
app.use(urlencoded({extended: true}));


app.set('view engine', 'ejs');

app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = ["Check Email", "Log Hours"];
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
        listTitle: day,
        numItems: numItems,
        newListItems: items
    });
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
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
// app.post("/work", (req, res) => {
//     let item = req.body.newItem;
//     workItems.push(item);
//     console.log(workItems);
//     res.redirect("/work");
// });

app.listen(3000, () => {
    console.log("Server is now active on Port 3000");
});