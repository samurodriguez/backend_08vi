const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { JWT_SECRET } = process.env;

    const tokenInfo = jwt.verify(token, JWT_SECRET);

    req.auth = tokenInfo;

    next();
  } catch (err) {
    res.send({
      status: "error",
      message: "Token de autenticación inválido",
    });
  }
};

module.exports = isAuth;
