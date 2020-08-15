const express = require("express");
const Project = require("../data/helpers/projectModel");

const router = express.Router();

router.get('/', (req, res) => {
  Project
    .get()
    .then((project) => res.status(200).json(project))
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong getting projects.",
      })
    );
});

router.get('/:id', (req, res) => {
    Project
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Message: "Could not find project",
      });
    });
});

router.get("/:id/actions", (req, res) => {
    Project
      .getProjectActions(req.params.id)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          Message: "Please try action again",
        });
      });
  });

  router.post('/', (req, res) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    })
});

  router.delete("/:id", (req, res) => {
    Project.remove(req.params.id).then((project) => {
      res
        .status(200)
        .json({ message: "project has been removed", project: req.project });
    });
  });
  

  router.put('/:id', (req, res) => {
    Project.update(req.params.id, req.body)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Could not update projects' });
    });
})


module.exports = router
