const router = require("express").Router();
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
  Park.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "location", "activites"],
    include: [
      {
        model: Event,
        attributes: ["id", "title", "park_id", "user_id", "description"],
      },
      {
        model: User,
        attributes: ["id", "username", "email", "password"],
      },
    ],
  })
    .then((dbParkData) => {
      if (!dbParkData) {
        res.status(404).json({ message: "No park found with this id" });
        return;
      }

      const park = dbParkData.get({ plain: true });

      res.render("single-park", {
        park,
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

router.get("/new-event", (req, res) => {
  if (!req.session.loggedIn) {
    res
      .status(400)
      .json({ message: "You must be logged in to create an event" });
    return;
  }
  res.render("new-event");
});

module.exports = router;
