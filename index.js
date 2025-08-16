if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const sendMail = require("./controllers/email.js");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "./public")));

const routes = [
  { path: "/", view: "./profile/Profile.ejs" },
  { path: "/profile", view: "./profile/Profile.ejs" },
  { path: "/profile/about", view: "./profile/About.ejs" },
  { path: "/profile/skills", view: "./profile/Skills.ejs" },
  { path: "/profile/contact", view: "./profile/Contact.ejs" },
  { path: "/profile/projects", view: "./profile/Projects.ejs" },
  {
    path: "/profile/projects/fileNotFound",
    view: "./profile/ProjectNotFound.ejs",
  },
  {
    path: "/profile/projects/Amazon",
    view: "./aboutProject/AmazonDetails.ejs",
  },
  {
    path: "/profile/projects/Bootstrap",
    view: "./aboutProject/BootstrapDetail.ejs",
  },
  {
    path: "/profile/projects/CssSlider",
    view: "./aboutProject/cssSliderDetails.ejs",
  },
  {
    path: "/profile/projects/Spotify",
    view: "./aboutProject/SpotifyDetails.ejs",
  },
  {
    path: "/profile/projects/WeatherApp",
    view: "./aboutProject/WeatherApp.ejs",
  },
  {
    path: "/profile/projects/ColorGenerater",
    view: "./aboutProject/ColorGeneraterDetails.ejs",
  },
  {
    path: "/profile/projects/Calculator",
    view: "./aboutProject/CalculatorDetails.ejs",
  },
  {
    path: "/profile/projects/SimonSays",
    view: "./aboutProject/SimonSaysDetails.ejs",
  },
  { path: "/profile/projects/Crud", view: "./aboutProject/CrudSqlDetails.ejs" },
  {
    path: "/profile/projects/InstaDemo",
    view: "./aboutProject/CrudDetails.ejs",
  },
  {
    path: "/profile/projects/Wanderlust",
    view: "./aboutProject/WanderLust.ejs",
  },
  { path: "/privecy", view: "./profile/PrivecyPage.ejs" },
  { path: "/terms-and-conditions", view: "./profile/Term&Condition.ejs" },
];



routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    const extraData =
      route.path === "/" || route.path === "/profile"
        ? { mapboxToken: process.env.MAP }
        : {};
    res.render(route.view, extraData);
  });
});
app.post("/profile/contact/mail", sendMail);

app.listen(3000, () => {
  console.log("listing to the port 3000");
});
