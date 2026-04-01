require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const articleRoutes = require("./routes/articles")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use("/articles", articleRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))