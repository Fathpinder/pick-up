const router = require("express").Router();
const sequelize = require("../config/connection");
const { Park, User } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Park.findAll({
    attributes: [],
    include: [],
  }).then((dbParkData) => {
    console.log(dbParkData[0]);
    const parks = dbParkData.map((park = park.get({ plain: true })));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
