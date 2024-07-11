const errorHandlerMiddleware = (err, req, res, next) => {
  //TODO: handle error
  let customError = {
    //this will take care of making mongoose errors more user friendly
    statusCode: err.statusCode || 500,
    msg: err.message || "something went wrong",
  };
  /*Handling Mongoose Errors Here*/
  if (err.name === "ValidationError") {
    //validation error (invalid email or empty email or password)
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    //if duplicate field entered when unique set to true in mongoose(if try to create new user with same email)
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    //it occurs if like invalid form of _id provided to find in the db
    customError.msg = `No item found for ${err.value}`;
    customError.statusCode = 404;
  }
  /*Handled Mongoose Errors*/
  res
    .status(customError.statusCode)
    .json({ success: false, message: customError.msg });
};

module.exports = errorHandlerMiddleware;
