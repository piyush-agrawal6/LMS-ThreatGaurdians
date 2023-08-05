const isAdmin = async (req, res, next) => {
  const role = req.body.role;
  if (role == "Admin") {
    next();
  } else {
    return res
      .status(401)
      .send({ message: "You are not authorized to perform this action" });
  }
};

const isTutor = async (req, res, next) => {
  const role = req.body.role;
  if (role != "Tutor") {
    return res
      .status(401)
      .send({ message: "You are not authorized to perform this action" });
  }
  next();
};

const isAuthorize = async (req, res, next) => {
  const role = req.body.role;
  if (role != "Admin" || role != "Tutor") {
    return res
      .status(401)
      .send({ message: "You are not authorized to do this function" });
  }
  next();
};

module.exports = { isAdmin, isTutor, isAuthorize };
