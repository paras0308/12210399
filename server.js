let express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require("path"),
    jsonfile = require("jsonfile"),
    bodyParser = require("body-parser"),
    fnlib = require(path.resolve(__dirname, 'lib/fn-lib.js')),
    PORT = process.env.PORT || 5000,
    dir = path.resolve(__dirname, "tmp/"),
    file = path.resolve(__dirname, "tmp/data.json"),
    obj = require(path.resolve(__dirname, 'tmp/data.json'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", express.static(path.resolve(__dirname, "dist/")));
app.post("/shorten", function (req, res) {

    let url = req.body.link,
        id = fnlib.makeid();
    if (!fnlib.existsinDB(url)) {
        obj.push({ shortid: id, link: url })
        jsonfile.writeFile(file, obj, function (err) {
            if (err) {
                res.send(JSON.stringify({ error: 1, message: "error creating id" }))
            }
            res.send(JSON.stringify({ error: 0, shortid: id }))
        })
    }
    else {
        let shorturl = fnlib.getShortURL(url)
        res.send(JSON.stringify({ error: 2, message: shorturl }))
    }
})

app.get("/:id", function (req, res, next) {
    let id = req.params["id"];
    if (!fnlib.checkifShortURLexists(id)) {
        res.status(404)
        res.send("Error 404. Requested URL not found")
    }
    else {
        let originalLink = fnlib.getOriginalLink(id);
        res.redirect(fnlib.addhttp(originalLink))
    }
})



app.listen(PORT, err => {
    if (err) {
        throw err
    }
    else {
        console.log("Server started on PORT " + PORT)
    }
})
