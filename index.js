const express = require("express");
const { engine } = require('express-handlebars');
const app = express();
const qrapi = require("./router/qrurl.js")
const session = require('express-session')
app.use(session({
    secret: "prasdfgSERDGdfhTERdsfhdfghtrd",
    resave: false,
    saveUninitialized: true
  }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(__dirname+"/public"))

app.get('/', (req, res) => {
    req.session.key = Math.floor(Math.random() * 100000000000 + 1);
    res.render('home');
});

app.use('/api', qrapi);

app.listen(8000,() => {
  console.log("server starting...")
});