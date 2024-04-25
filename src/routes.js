const express = require('express');
const CrudController = require('./controllers/crudController');
const adminController = require('./controllers/admin');
const routesController = require('./controllers/routesController');
const noticesController = require('./controllers/noticesController');
const login = require('./middleware/admin_login')
const routes = express.Router();

routes.get('/GetAll', CrudController.GetAll);
routes.get('/GetID/:id', CrudController.GetID);
routes.post('/InsertAluno', CrudController.Post);
routes.put('/UpdateAlunos/:id', CrudController.Update);
routes.delete('/DeleteAlunos/:id', CrudController.Delete);

routes.post('/administrador/login', adminController.login);
routes.post('/administrador/insert', adminController.create);

routes.post('/administrador/insert-route',login, routesController.create);
routes.get('/getAllRoutes', routesController.GetAll);
routes.put('/administrador/update-route/:id', login,routesController.update);
routes.delete('/administrador/delete-route/:id', login ,routesController.delete);

routes.post('/administrador/insert-notice', login, noticesController.create);
routes.get('/getAllNotices', noticesController.GetAll);
routes.put('/administrador/update-notice/:id', login, noticesController.update);
routes.delete('/administrador/delete-notice/:id', login, noticesController.delete);

module.exports = routes;