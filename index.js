const express = require('express');
const app = express();
const mysql = require('mysql2');
const config = require('config');
const cors = require('cors');

const con = mysql.createConnection(config.get("connection"));
con.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to DB!")
    }
})
app.use(cors('*'));
app.use(express.json());
app.get("/", (request, response) => {
    con.query("SELECT * FROM book_tb", (err, result)=>{
        if(err){
            response.send("Error");
        }else{
            response.send(JSON.stringify(result));
        }
    })
})

app.post("/add", (req, response) => {
    var query = "INSERT INTO book_tb (b_name, author, book_type, price, published_date, language) values(?, ?, ?, ? ,?, ?)"
    con.query(query,
        [req.body['b_name'], req.body['author'],req.body['book_type'],req.body['price'],req.body['published_date'],req.body['language']], 
        (err, result)=>{
        if(err){
            
            response.send("Error");
        }else{
            response.send(JSON.stringify(result));
        }
    })
})

app.put("/edit", (req, response) => {
    var query = "UPDATE book_tb SET price = ?, language = ? WHERE id = ?"
    con.query(query,
        [req.body['price'], req.body['language'], req.body["id"]], 
        (err, result)=>{
        if(err){
            response.send("Error");
        }else{
            response.send(JSON.stringify(result));
        }
    })
})


app.listen(config.get("port"), ()=>{
    console.log("Listening on port : " + config.get("port"));
});