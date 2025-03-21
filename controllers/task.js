const {
  findAllTaskServices,
  createTaskServices,
  updateTaskServices,
  deleteTaskServices,
  findUserTaskServices,
} = require("../services/task");

exports.findAllTasks = async (req, res) => {
  try {
    const taskId = req?.query?.id;
    const userId =req?.user?.id;
    const taskData = await findAllTaskServices(taskId,userId);

    if (!taskData) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: 
        taskData,
      
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.findUserTasks = async (req, res) => {
  try {
    const userId =req?.user?.id;
    const taskData = await findUserTaskServices(userId);

    if (!taskData) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: 
        taskData,
      
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    // console.log("req.user:",req.user);

    const data = { ...req.body, creator: req.user.id ,status:"pending"}; 
    const taskData = await createTaskServices(data);
    return res.status(200).json({ message: "Task created", data: taskData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.query.id;

    const data = req.body;
    const taskData = await updateTaskServices(taskId, data);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated", data: taskData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.query.id;
    const taskData = await deleteTaskServices(taskId);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted", data: taskData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
