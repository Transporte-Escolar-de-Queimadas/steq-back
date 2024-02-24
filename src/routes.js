const express = require('express');
const CrudController = require('./controllers/crudController');
const adminController = require('./controllers/admin');

const routes = express.Router();

routes.get('/GetAll', CrudController.GetAll);
routes.get('/GetID/:id', CrudController.GetID);
routes.post('/InsertAluno', CrudController.Post);
routes.put('/UpdateAlunos/:id', CrudController.Update);
routes.delete('/DeleteAlunos/:id', CrudController.Delete);

routes.post('/administrador/login', adminController.newlogin);
routes.post('/administrador/insert', adminController.create);

module.exports = routes;