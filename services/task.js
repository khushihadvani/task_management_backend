const Task = require("../models/Task");


exports.findAllTaskServices = async (taskId,userId) => {
  let data;
  if (taskId) {
    data = await Task.findById(taskId).populate('creator assignedTo').lean();

  } else {
    data = await Task.find({'creator':userId}).populate('creator assignedTo').lean();
  }
  return data;
};
exports.findUserTaskServices = async (userId) => {
  
  const  data = await Task.find({'assignedTo':userId}).populate('creator assignedTo').lean();
  
  return data;
};

exports.createTaskServices = async (data) => {

  const taskData = await Task.create(data);
  return taskData;

};

exports.updateTaskServices = async (taskId, data) => {

  const taskData = await Task.findByIdAndUpdate(taskId, data, { new: true }).lean();
  return taskData;
};

exports.deleteTaskServices = async (taskId) => {
  const taskData = await Task.findByIdAndDelete(taskId).lean();
  return taskData;
};

