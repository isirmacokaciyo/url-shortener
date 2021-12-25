const express = require('express')
const Database = require("lundb");
const db = new Database()

// functions start

function randomString() {
    return require('crypto').randomBytes(8).toString("hex")
}
db.on("ready",{
    message : "connected to database"
})
var app = express()

app.set("view engine", "ejs")
app.set("views", "./src/views")

//functions end


//frontend start
app.get('/', async (req, res) => {
    res.render("main")
})

//beceremedim yapabilen discorddan ulaşsın
app.post("/", async (req, res) => {
    /*let code = req.body;

    let asd = randomString()

    db.add(`links_${asd}`, req.body.linkim)

    res.redirect("/") */
    //console.log(req.body)
})

app.get('link/:kod', async (req, res) => {
    let kode = req.params.kod
    let bisimk = db.fetch(`links_${kode}`)

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