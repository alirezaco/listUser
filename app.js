const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const body_parser = require("body-parser")
const search = require("./tools/search")

app.use(body_parser.json(app.request.body))

app.use(express.static(path.join(__dirname, "public")))

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');



let data = fs.readFileSync(path.join(__dirname, "db/users.json"))
data = JSON.parse(data)

app.get('/', (req, res) => {
    res.render('pages/home', { users: data })
})

app.get('/home', (req, res) => {
    res.render('pages/home', {
        users: data
    })
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

app.get('/contact', (req, res) => {
    res.render('pages/contact')
})

app.get('/product/:id', (req, res) => {
    let id = req.params.id;
    let user = data.find(x => x.id == +id + 6)
    console.log(user);
    res.render('pages/product1', { user: user })
})

app.post('/search', (req, res) => {
    let text = req.body.text;
    res.send(JSON.stringify(search(data, text)));
})

app.listen(5000);