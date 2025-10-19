// step2: lets start off by creating a basic express app here below using import and all.
import express from "express"

// step10: if we now try to use the environment variables like by doing : "console.log(process.env.PORT)" ; it will show "undefined" because to use the environment variables, we need to use the dotenv package and then run its config function thus here below.
import dotenv from "dotenv"
dotenv.config()

const app = express()

// step11: lets define the PORT from environment variables here below ; and just incase due to some error its undefined we can hardcode it to 5001 here below ; so that the app doesn't crash thus here below.

// step12: see the next steps in step13.txt file now there.
const PORT = process.env.PORT || 5001

// step5: now lets create a route here below for the url ending in "/" here below.

// step6: can go on "localhost:5001/" to see the "Hello World" message here below.

// step7: see the next steps in step8.txt file now there.
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    // step3: now we can make this to do the following console log when the server is running here below.

    // step4: can check it by running : node server.js in console now here below.
    console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`)
})