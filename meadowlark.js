var fortune = require("./lib/fortune.js");
//для запуска => npm run nodemon
var express = require("express");

var app = express();
//установка мехинизма представления handlebars
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(require("body-parser").urlencoded({ extended: true }));

app.get("/newsletter", function(req, res) {
  res.render("newsletter", { csrf: "CSRF token goes here" });
});

app.post("/process", function(req, res) {
  console.log("Form (from querystring):" + req.query.form);
  console.log("CSRF token (from hidden form field):" + req.body._csrf);
  console.log("Name (from visible form field):" + req.body.name);
  console.log("Email (from visible form field):" + req.body.email);
  res.redirect(303, "/thank-you");
});

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
  res.render("home");
});
app.get("/about", function(req, res) {
  res.render("about", { fortune: fortune.getFortune });
});

//пользовательская страница 404
app.use(function(req, res, next) {
  res.status(404);
  res.render("404");
});

//пользовательская страница 500
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express запущен на http://localhost:" +
      app.get("port") +
      "; назмите Ctrl+C для завершения."
  );
});
