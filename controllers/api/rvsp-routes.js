const router = require('express').Router();
const { rsvp } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  rsvp.findAll()
    .then(dbRSVPData => res.json(dbRSVPData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  rsvp.create({
    rsvp_tag: req.body.rsvp_tag,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbRsvpData => res.json(dbRsvpData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  rsvp.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRsvpData => {
      if (!dbRsvpData) {
        res.status(404).json({ message: 'No rsvp found with this id!' });
        return;
      }
      res.json(dbRsvpData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
