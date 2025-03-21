const User = require("../models/user");

exports.findUserServices=async (email) => {
  const userData = await User.findOne({ email });
  return userData
}

exports.findAllUserServices = async (userid) => {
  let data;
  if (userid) {
    data = await User.findById(userid).lean();
  } else {
    data = await User.find().lean();
  }
  return data;
};


exports.createUserServices = async (data) => {
  const userData = await User.create(data);
  return userData;
};

exports.updateUserServices = async (userID,data) => {

  const userData = await User.findByIdAndUpdate(userID,data,{new:true}).lean();

  return userData;
};

exports.deleteUserServices = async (userID) => {
  const userData = await User.findByIdAndDelete(userID).lean();
  return userData;
};
