const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Event, User, RSVP, Park } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Event.findAll({
    attributes: [
      "id",
      "title",
      "park_id",
      "user_id",
      "description",
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Event.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: RSVP,
        // attributes: [],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => res.json(dbEventData))
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
        model: RSVP,
        //attributes: [],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
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

router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Event.create({
    title: req.body.title,
    park_id: req.body.park_id,
    user_id: req.session.user_id,
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/rsvp", withAuth, (req, res) => {
  // custom static method created in models/Event.js
  Event.upvote(
    { ...req.body, user_id: req.session.user_id },
    { Park, RSVP, User }
  )
    .then((updatedRSVPData) => res.json(updatedRSVPData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
