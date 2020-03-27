const express = require("express")
const app = express()
const fetch = require("node-fetch")

//"Database" (Obviously you'd use a proper database. This is here just for minimal code)
var comments = []

app.get("/", (req, res) => res.sendFile(__dirname + "\\index.html"))

//Fetches the comments
app.get("/comments", (req, res) => {
    res.json(comments.reverse())
})

//Adds comment to the database
app.post("/comments/:comment/:captcharesponse", async (req, res) => {
    //Verify the captcha first
    const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LcTXOQUAAAAAIi-Hz_Svqa1qO0G-kAbfMIX2UNl&response=${req.params.captcharesponse}`, {
        method: "POST"
    })
    .then(_res => _res.json())

    //Will only post the comment to the "database" if the captcha verification was a success
    if(captchaVerified.success === true) comments.push(req.params.comment)

    res.end()
})

app.listen(8080, function(){console.log("Ready")})