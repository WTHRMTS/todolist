const { urlencoded } = require("express");
const express =  require("express");
const mongoose = require("mongoose");
const { getDefaultSettings } = require("http2");
const https = require("https");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();
app.use(urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema ({
    name: String
})

const Item = new mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your to-do list"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<== Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema ({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
    
    Item.find({}, (err, foundItems) => {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Items successfully added");
                }
        });
        res.redirect("/");
        } else {

        res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
    
});


app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                //Create a new List
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName)
            } else {
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
            }
        }
    });
    
});

app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;


    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (!err) {
            console.log("Item successfully removed.");
        }
    })
    res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if (!err) {
                res.redirect("/" + listName);
            }
        })
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server is now active on Port 3000");
});