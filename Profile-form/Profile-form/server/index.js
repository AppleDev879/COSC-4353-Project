const bodyParser = require('body-parser');
const expres=require('express');
const app=expres();
const bodyParser= require('body-parser');
const mysql=require('mysql');
const db =  mysql.createPool({
    host:" group22-db.mysql.database.azure.com",
    user:"Group22admin",
    password:"g7St;ch;",
    database:"group_22_db"

});
app.use(expres.json);
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/profile",(req,res)=>
{
    const lastName=req.body.Last;
    const firstName=req.body.First;
    const adress1=req.body.addy;
    const adress2=req.body.addy2;
    const city=req.body.city;
    const zip =req.body.zip;
    const st=req.body.ST;
    const sqlInsert="INSERT INTO user (firstName, lastName, adress1, adress2, city,zip) VALUES(?,?,?,?,?,?,?)"
    +"WHERE ID ="+ localStorage.getItem('token');
    db.query(sqlInsert,[ firstName, lastName, adress1, adress2, city,zip],(err,res)=>{
        console.log(err);
    } );
});


app.listen(3001,()=>{
    console.log("running on port 3001")
    });