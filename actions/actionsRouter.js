const express = require("express");
const Actions = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel")

const router = express.Router();

router.get('/', (req,res)=>{
    Actions.get()
        .then(actions =>
            res.status(201).json(actions))
        .catch(err =>
            res.status(500).json({ errormessage: 'Could not get all the actions'}))
})

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "ID required" });
    });
});

router.post('/', (req, res) => {
    const body = req.body
    Actions.insert(body)
      .then(action =>
          res.status(200).json(action))
      .catch(err =>
        res.status(500).json({errormessage: 'Could not create the action.'}))
});

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    Actions.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                next({ code: 404, message: "Action Id not found." });
            }
        })
        .catch(err => {
           res.status(500).json({ message: "There was an error updating the action." });
        });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id).then((action) => {
    res
      .status(200)
      .json({ Message: "Action has been deleted", project: req.action });
  });
});

module.exports = router
