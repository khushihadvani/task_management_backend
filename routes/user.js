const express =require('express')
const {  findAllUser, deleteUser, updateUser, registerUser, loginUser } = require('../controllers/user')
const { validateCreateData, validateDeleteUserData, validateGetOneUserData, validateUpdateUserData } = require('../middleware/user')
const route=express.Router()

route.get('/findUser',validateGetOneUserData,findAllUser)
route.post('/userSignIn',validateCreateData,registerUser)
route.post('/userLogIn',loginUser)
route.put('/updateUser',validateUpdateUserData,updateUser)
route.delete('/deleteUser',validateDeleteUserData,deleteUser)

module.exports =route