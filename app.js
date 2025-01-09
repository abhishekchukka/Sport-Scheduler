require("dotenv").config();
const express = require("express");
const authRouter = require("./route/auth");
const sportRouter = require("./route/sport");
const sessionRouter = require("./route/session");
const session = require("express-session");
const isAuthenticated = require("./middleware/authMiddleware");
const passport = require("./passportconfig");
// const renderDashboard = require("./controller/rederDashBoard");
// const getSportsWithUsers = require("./controller/getSportsWithUsers");
const getSportsWithCreators = require("./controller/getSportsWithUsers");
const renderDashboard = require("./controller/rederDashBoard");
const renderReport = require("./controller/renderReport");
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(
  session({
    secret: "abhi", // Replace with a secure key
    resave: true, // Prevents session from being saved repeatedly
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 1 day)
    },
  })
);

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use("/sports", sportRouter);
app.use("/session", sessionRouter);
app.get("/", (req, res) => {
  res.render("home");
});
// app.get("/sports", getSportsWithCreators);

app.get("/dashboard", isAuthenticated, renderDashboard);
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get('/reports',isAuthenticated, renderReport);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found1" });
});
app.listen(port, () => {
  console.log("server listening..");
});
