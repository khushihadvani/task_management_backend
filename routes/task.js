const express = require("express");
const { findAllTasks, updateTask, deleteTask, createTask, findUserTasks } = require("../controllers/task");
const { validateCreateTaskData, validateUpdateTaskData, validateDeleteTaskData, validateGetOneTaskData } = require("../middleware/task");
const { AuthUser } = require("../middleware/user");


const route = express.Router();

route.get("/findTask",AuthUser,validateGetOneTaskData, findAllTasks);

route.get("/findUserTask",AuthUser,validateGetOneTaskData, findUserTasks);

route.post("/createTask",AuthUser, validateCreateTaskData, createTask);

route.put("/updateTask" ,AuthUser,validateUpdateTaskData, updateTask);

route.delete("/deleteTask",AuthUser,validateDeleteTaskData , deleteTask);

module.exports = route;
