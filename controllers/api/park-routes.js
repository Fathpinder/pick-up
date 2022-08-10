const router = require("express").Router();
const { User, Park, Event } = require("../../models");

router.get("/", (req, res) => {
  Park.findAll({})
    .then((dbParkData) => res.json(dbParkData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Park.create({
    name: req.body.name,
    location: req.body.location,
    activities: req.body.activities,
  })
    .then((dbParkData) => res.json(dbParkData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
