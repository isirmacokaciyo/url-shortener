const express = require('express')
const Database = require("lundb");
const bodyParser = require("body-parser");
const ejs = require('ejs')
const db = new Database()

const url = "http://localhost:3000"

// functions start

function randomString() {
    return require('crypto').randomBytes(8).toString("hex")
}
db.on("ready",{
    message : "connected to database"
})
var app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");

//functions end


//frontend start
app.get('/', function (req, res) {
    res.render("main")
})

//beceremedim yapabilen discorddan ulaşsın
app.post("/comp", function(req, res) {
    let code = req.body;

    if(!code.linkim) {res.send('olmaz')}

    let asd = randomString()

    db.set(`${asd}`, req.body.linkim)

    res.render('main', {
        url: `${url}/link?kod=${asd}`
    })
    //console.log(req.body)
})

app.get('/link',  function(req, res) {
    let kode = req.query.kod
    let bisimk = db.fetch(`${kode}`)

    if(!bisimk) {
        res.send("Böyle bir link db de yok")
    } else {
        res.redirect(bisimk)
    }
})
//frontend end

app.listen(3000, function(){
    console.log('http://localhost:3000')
})