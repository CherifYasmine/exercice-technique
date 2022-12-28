const express = require('express');
var cors = require("cors");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var cardRouter = require("./routes/Card")
var columnRouter = require("./routes/Column")
const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Kanban Project!')
})
app.use("/card", cardRouter);
app.use("/column", columnRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Connected to database and running on port ${PORT}`)))
    .catch((error) => console.log(error));
module.exports = app;