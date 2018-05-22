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
