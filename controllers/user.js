const {
  findAllUserServices,
  createUserServices,
  updateUserServices,
  deleteUserServices,
  findUserServices,
} = require("../services/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserServices(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isRightPassword = await bcrypt.compare(password, user.password);

    if (isRightPassword) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ message: "login successfully", token: token });
    } else {
      return res.status(400).json({ message: "wrong password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { name, password, email, mobileNo } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExistsUser = await findUserServices(email);
    if (isExistsUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userData = {
      name,
      email,
      mobileNo,
      password: hashedPassword,
    };
    const user = await createUserServices(userData);
    return res
      .status(201)
      .json({ message: "User register successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

exports.findAllUser = async (req, res) => {
  try {
    const userid = req?.query?.id;
    const userdata = await findAllUserServices(userid);

    if (!userdata) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "user found", data: userdata });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
}
exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const userData = await createUserServices(data);
    return res.status(200).json({ message: "User created", data: userData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.query.id;

    const data = req.body;
    const userData = await updateUserServices(userId, data);

    if (!userData) {
      res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated", data: userData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      res.status(404).json({ message: "User not found" });
    }
    const userData = await deleteUserServices(userId);
    return res.status(200).json({ message: "User deleted", data: userData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};
