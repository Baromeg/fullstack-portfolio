const Projects = require('../models/projects')

// Get all projects

function getProjects(req, res) {
  Projects.find()
    .populate('user')
    .then((projectList) => {
      res.send(projectList)
    })
    .catch((error) => res.send(error))
}

// Get a single project
function singleProject(req, res) {
  Projects.findById(req.params.locationId)
    .populate('comments.user')
    .then((project) => {
      res.send(project)
    })
    .catch((error) => res.send(error))
}

// Add a new project

function addProject(req, res) {
  req.body.user = req.currentUser

  Projects.create(req.body)
    .then((project) => {
      res.send(project)
    })
    .catch((error) => res.send(error))
}

module.exports = {
  getProjects,
  singleProject,
  addProject
}
