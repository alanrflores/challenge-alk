const { Router } = require('express');
const getUser = require('../controller/user/get.user.js');
const getUserById = require('../controller/user/get.userId.js');
const createdUser = require('../controller/user/post.user.js');
const updateUser = require('../controller/user/put.user.js');
const deleteUser = require('../controller/user/delete.user.js');
const getOperation = require('../controller/operation/get.operation.js');
const getOperationById = require('../controller/operation/get.operationId.js');
const createdOperation = require('../controller/operation/post.operation.js');
const updateOperation = require('../controller/operation/put.operation.js');
const deleteOperation = require('../controller/operation/delete.operation.js');
const login = require('../controller/passport');
const passport = require('../middleware/passport.js');
const router = Router();


router.post('/login', passport.authenticate('local'), login)
router.get('/users', getUser);
router.get('/users/:idUser' , getUserById);
router.get('/operation', getOperation);
router.get('/operation/:idOperation', getOperationById);

router.post('/users', createdUser);
router.post('/operation', createdOperation);

router.put('/users/:idUser', updateUser);
router.put('/operation/:idOperation', updateOperation);

router.delete('/users/:idUser', deleteUser);
router.delete('/operation/:idOperation', deleteOperation);

module.exports = router;