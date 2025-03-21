const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    status: { type: String, enum: ["pending", "in-progress", "completed"] ,default:"pending"},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
