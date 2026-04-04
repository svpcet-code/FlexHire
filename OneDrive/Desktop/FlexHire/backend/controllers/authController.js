const admin = require("../config/firebase");

// SIGNUP
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN (token verify)
exports.login = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    res.json({
      message: "Login successful",
      user: decoded,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};