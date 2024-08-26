const express = require("express");
const app = express();
const connectDB = require("./config/database");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
require("dotenv").config();

//import express async errors
require("express-async-errors");

//import routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payments");
const contactUsRoute = require("./routes/contact");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://study-notion-frontend-jaa6.onrender.com/",
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));
//routes
//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

const start = async () => {
  try {
    await connectDB(MONGODB_URL);
    cloudinaryConnect(); //cloudinary config
    app.listen(PORT, () => {
      console.log("Server is listening at " + PORT);
    });
  } catch (error) {}
};
start();
