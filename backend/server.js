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

// mongoose.connect("mongodb://localhost/sbStores", { useMongoClient: true })
// mongoose.connect("mongodb://localhost/sbStores/store-list", { useMongoClient: true })
mongoose.connect("mongodb://localhost/sbStores")
// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.once("open", () => { console.log("Connected to mongodb") })
mongoose.connection.on("error", err => { console.error("connection error:", err) })

const Store = mongoose.model("Store", {
  id: String,
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
  Oppettider: String,
  RT90x: String,
  RT90y: String
})

app.get("/stores", (req, res) => {
  Store.find().then(store => {
    res.json(store)
  })
})
// get all stores in the db
// app.get("/stores", (req, res) => {
//   // console.log("all stores")
//   Store.find().then(allStores => {
//     res.json(allStores)
//   )}
// })

// get store by store Nr
app.get("/stores/:storeNr", (req, res) => {
  Store.find({ Nr: req.params.storeNr }).then(store => res.json(store))
})

app.listen(8080, () =>
  console.log("Example app listening on port 8080!"))
