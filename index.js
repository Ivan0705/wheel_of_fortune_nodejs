const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "wheel_fortune"
});

app.get('/', (req, res) => {
    res.send("Hello Node.js!")
});

app.post('/play', (req, res) => {
    console.log(req.body);
    const winner = req.body.winner;
    const balance = req.body.balance;
    const sqlInsert = "INSERT INTO winner_list(winner, balance) VALUES (?, ?);";
    db.query(sqlInsert, [winner, balance],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.get('/allWinners', (req, res) => {
    const sqlSelect = "SELECT * FROM winner_list ORDER BY id  DESC ";
    db.query(sqlSelect,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
