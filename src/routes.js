const express = require('express');
const CrudController = require('./controllers/crudController');
const adminController = require('./controllers/admin');
const routesController = require('./controllers/routesController');

const routes = express.Router();

routes.get('/GetAll', CrudController.GetAll);
routes.get('/GetID/:id', CrudController.GetID);
routes.post('/InsertAluno', CrudController.Post);
routes.put('/UpdateAlunos/:id', CrudController.Update);
routes.delete('/DeleteAlunos/:id', CrudController.Delete);

routes.post('/administrador/login', adminController.login);
routes.post('/administrador/insert', adminController.create);

routes.post('/administrador/insert-route', routesController.create);
routes.get('/getAllRoutes', routesController.GetAll);
routes.put('/administrador/update-route/:id', routesController.update);
routes.delete('/administrador/delete-route/:id', routesController.delete);

module.exports = routes;