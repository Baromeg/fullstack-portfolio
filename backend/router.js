const express = require('express')
const router = express.Router()
const projectController = require('./controllers/projectController')
const userController = require('./controllers/userController')
const secureRoute = require('./middleware/secureRoute')

router
  .route('/projects')
  .get(projectController.getProjects)
  .post(secureRoute, projectController.addProject)

router.route('/projects/:projectId').get(projectController.singleProject)
// .delete(secureRoute, projectController.removeProject)
// .put(secureRoute, projectController.updateProject)

router.route('/users').get(userController.getUsers)

router.route('/users/:userId').get(userController.getUser)

module.exports = router
