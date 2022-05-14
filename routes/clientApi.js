const routes = require('express').Router();
const clientApi = require('../controllers/clientApi');

routes.post('/client/post', clientApi.signUpClient)
    .get('/client/get', clientApi.getAllClients)
    .get('/client/get/:id?', clientApi.getClientById)
    // .get('/client/get/search/:filter', clientApi.getOneClient)
    // .put('/client/put/:email', clientApi.updateClientByEmail)
    // .delete('/client/delete', clientApi.deleteOneClient)
    .post('/auth/login', clientApi.loginClient)

module.exports = routes;