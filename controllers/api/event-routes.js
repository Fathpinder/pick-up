const router = require("express").Router();
const { Event, User, RSVP, Park } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  console.log("======================");
  Event.findAll({
    attributes: ["id", "title", "park_id", "user_id", "description"],
    include: [
      {
        model: Park,
        attributes: ["name", "location", "activities"],
      },
      {
        model: User,
        attributes: ["user_id"],
      },
    ],
  })
    .then((dbEventData) => {
      const events = dbEventData.map((event) => event.get({ plain: true }));
      res.render("event", { events, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "park_id", "user_id", "description"],
    include: [
      {
        model: Park,
        attributes: ["name", "location", "activities"],
      },
      {
        model: User,
        attributes: ["user_id"],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No Event found with this id" });
        return;
      }
      const event = dbEventData.get({ plain: true });
      res.render = ("event", { event, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Event.create({
    title: req.body.title,
    park_id: req.body.park_id,
    user_id: req.session.user_id,
    description: req.body.description,
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/new-event", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Event.create({
    title: req.body.title,
    park_id: req.body.park_id,
    user_id: req.session.user_id,
    description: req.body.description,
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put("/rsvp", withAuth, (req, res) => {
//   // custom static method created in models/Event.js
//   Event.upvote(
//     { ...req.body, user_id: req.session.user_id },
//     { Park, RSVP, User }
//   )
//     .then((updatedRSVPData) => res.json(updatedRSVPData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.put("/:id", withAuth, (req, res) => {
  Event.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No Event found with this id" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No Event found with this id" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
