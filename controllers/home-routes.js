const router = require("express").Router();
const sequelize = require("../config/connection");
const { Park, User, Event } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Park.findAll({
    attributes: ["id", "name", "location", "activities"],
    include: [
      {
        model: Event,
        attributes: ["id", "title", "park_id", "user_id", "description"],
      },
    ],
  })
    .then((dbParkData) => {
      const parks = dbParkData.map((park) => park.get({ plain: true }));
      res.render("homepage", { parks, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/park/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "location", "activites"],
    include: [
      {
        model: Park,
        attributes: ["id", "name", "location", "activities"],
        include: {
          model: Event,
          attributes: ["id", "park_id"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
