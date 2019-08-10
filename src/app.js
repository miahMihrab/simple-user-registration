const express = require("express");
require("./db/mongoose");
const user_reg = require("./model/user_reg");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded()); //For submitting form
app.use(express.static(path.join(__dirname, "/../public")));
//view engine
app.set("views", path.join(__dirname + "/../views"));
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        partialsDir: path.join(__dirname + "/../../views/partials")
    })
);
app.set("view engine", "handlebars");

//POST user
app.post("/user/signin", (req, res) => {
    user_reg
        .findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                const user = new user_reg(req.body);
                return user
                    .save()
                    .then(() => {
                        res.render('signin')
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
            res.send("User Exists with this email");
        })
        .catch(err => {
            res.status(401).send(err);
        });


});

app.post("/user/profile", (req, res) => {
    user_reg
        .findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).send("User not found");
            }
            res.render("profile", {
                title: "Profile",
                name: user.name
            });
        })
        .catch(err => {
            res.status(401).send("User not found");
        });
});

//GET User
app.get("/registration", (req, res) => {
    res.render("registration", {
        title: "Registration"
    });
});

app.get("/signin", (req, res) => {
    res.render("signin", {
        title: "Sign In"
    });
});

app.listen(port, console.log(`Server started at port: ${port}`));