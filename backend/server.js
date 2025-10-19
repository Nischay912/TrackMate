// step2: lets start off by creating a basic express app here below using import and all.
import express from "express"

// step10: if we now try to use the environment variables like by doing : "console.log(process.env.PORT)" ; it will show "undefined" because to use the environment variables, we need to use the dotenv package and then run its config function thus here below.
import dotenv from "dotenv"
import { sql } from "./config/db.js"
dotenv.config()

const app = express()

// step30: to use the req.body , we need to have the body-parser middleware thus here below.

// step31: this is a built-in middleware ; "middleware" is a function that runs in the middle between the request and the response ; so th ebelow middleware runs before we use the req.body there below ; and this reads incoming requests and then : Converts the JSON data into a JavaScript object and attaches it to req.body ; Without it, req.body would be undefined for JSON requests ; it thus : Makes it easy to access data sent from clients (e.g., POST requests with JSON payloads) ; thus here below.
app.use(express.json())

// step11: lets define the PORT from environment variables here below ; and just incase due to some error its undefined we can hardcode it to 5001 here below ; so that the app doesn't crash thus here below.

// step12: see the next steps in step13.txt file now there.
const PORT = process.env.PORT || 5001

// step18: now lets create a function to initialize the database here below.
async function initDB() {
    try{
        // step19: we will be using RAW SQL codes for database in this project where we have Tables and all, thus here below.

        // step20: creating the table named "transactions" : only created if it doesn’t already exist. This prevents errors if the table already exists.

        // step21: we created the "id" as SERIAL i.e auto-incrementing integer which is common for unique IDs i.e it starts from 1 and increments by 1 automatically thus here below.

        // step22: we have VARCHAR(255) which tells that the column is a string and can hold up to 255 characters ; and NOT NULL which tells that the column is required and cannot be null thus here below.

        // step23: then we have a created_at timestamp which is automatically populated with the current timestamp whenever a new row is inserted into the table thus here below.

        // step24: DECIMAL(10,2) is used to mention : "fixed-point number" with : 10 digits total , 2 digits after the decimal point ; so the maximum it can store is 9999999999.99 (8 digits before the decimal point and 2 digits after) thus here below.
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY, 
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        console.log("Database initialized successfully!")
    }
    catch(error){
        console.error("Error initializing database:", error)

        // step25: we exit the process with status code "1" which is for failure ("0" for success) ; exitting from process will kill the server and prevent it from running further; its used to : stop the server completely instead of running it in a broken state. thus here below.

        // step26: see the next steps in step27.txt file now there.
        process.exit(1)
    }
}

// step5: now lets create a route here below for the url ending in "/" here below.

// step6: can go on "localhost:5001/" to see the "Hello World" message here below.

// step7: see the next steps in step8.txt file now there.
// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

// step28: now lets create a route for sending POST request to the "/api/transactions" enpoint here below.
app.post("/api/transactions", async (req, res) => {
    try{
        // step29: we will destructure the object sent by user through req.body and get it here below.
        const { title, amount, category, user_id } = req.body

        // step32: now lets check if there is no title or category or user_id sent by user OR if the amount entered is undefined as it may be 0 but should not be undefined ; then we will send a respone back thus here below.
        if(!title || !category || !user_id || amount === undefined){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        // step33: now once we got all the required fields, we will insert the transaction into the database here below.

        // step34: no need to add the "created_at" field now as it is automatically added by the database thus here below ; with its default value that we mentioned there earlier i.e. the current timestamp thus here below.

        // step35: RETURNING * is a PostgreSQL feature that tells the database that : After inserting, return the full row that was just added ; "*" means return all the columns and store it in the "transaction" variable thus here below.
        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category) 
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `

        // step36: can console log for debugging purposes ; there we see that transaction now is an array of objects ; but we want only the first object of the array thus here below ; so we will send only the 0th index of it in the response back thus here below.
        // console.log(transaction)
        // console.log(transaction[0])

        // step37: now lets send a 201 status code response which means something was created thus here below.

        // step38: see the next steps in step39.txt file now there.
        res.status(201).json(
            transaction[0]
        )
    }
    catch(error){
        console.error("Error creating transaction:", error)
        res.status(500).json({
            message: "Error creating transaction due to Internal Server Error"
        })
    }
})

// step25: now lets initialize the database and then run the app.listen function only after the database is initialized successfully thus here below ; else it will exit with process.exit there using the error message thus here below.

// step26: now we can see the message of "Database initialized successfully!" in console now there and on neon.tech's dashboard ; we can see the table's structure under "tables" section on the dashboard there now.
initDB().then(() => {
    app.listen(PORT, () => {
        // step3: now we can make this to do the following console log when the server is running here below.

        // step4: can check it by running : node server.js in console now here below.
        console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`)
    })
})