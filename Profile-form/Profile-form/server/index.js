const bodyParser = require('body-parser')
const expres=require('express')
const app=expres()
const bodyParser= require('body-parser')
const mysql=require('mysql')
const db =  mysql.createPool({
    host:" group22-db.mysql.database.azure.com",
    user:"Group22admin",
    password:"g7St;ch;",
    database:"group_22_db"

})

app.use(bodyParser.urlencoded({extended:true}))

app.post("/api/insert",(req,res)=>
{
    const lastName=req.body.Last
    const firsName=req.body.First
    const adress1=req.body.addy
    const adress2=req.body.addy2
    const city=req.body.city
    const zip =req.body.zip
    const st=req.body.ST
}
)


app.listen(3001,()=>{
    console.log("running on port 3001")
    })