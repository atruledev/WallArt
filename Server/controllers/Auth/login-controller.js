require("dotenv").config();

const LoginController = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || !data.password) {
      return res.status(400).json({ message: "fields are required" });
    }
    if (
      data.email === process.env.ADMIN_EMAIL &&
      data.password === process.env.ADMIN_PASSWORD
    ) {
      console.log("user login successfully");
      return res.status(200).json({ message: "user login successfully" });
    } else {
      return res.status(401).json({ message: "invalid cerdientials" });
    }
  
  } catch (error) {
    console.log("got error", error);
  }
};

module.exports = LoginController;
