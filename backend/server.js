import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())
// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/sbStores", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.once("open", () => { console.log("Connected to mongodb") })
mongoose.connection.on("error", err => { console.error("connection error:", err) })

const Store = mongoose.model("Store", {
  xsiType: String,
  Typ: String,
  Nr: String,
  Namn: String,
  Address1: String,
  Address3: String,
  Address4: String,
  Address5: String,
  Telefon: String,
  SokOrd: String,
  Oppetider: String,
  RT90x: String,
  RT90y: String
})

app.get("/", (req, res) =>
  res.send("This is System Club Server")
)

app.get("/stores", (req, res) => res.send("This should display all stores"))


app.listen(8080, () =>
  console.log("Example app listening on port 8080!")
)
