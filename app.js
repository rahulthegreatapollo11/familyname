const express=require('express')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT||8000
const path=require('path')
let mysql = require('mysql');


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./templates/paths'));
hbs.registerPartials(path.join(__dirname,'./templates/partials'));

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapp'
});

app.get("/",(req,res)=>{
    res.render('indexxx');
    
    const {YourName,yourspousename,spousefather,fathersname,spousemothersname}=req.query;
    const queryobject={};
    if(YourName){
        queryobject.YourName=YourName;
    }
    if(yourspousename){
        queryobject.yourspousename=yourspousename;
    }
    if(spousefather){
        queryobject.spousefather=spousefather;
    }
    if(fathersname){
        queryobject.fathersname=fathersname;
    }
    if(spousemothersname){
        queryobject.spousemothersname=spousemothersname;
    }
    console.log(queryobject);
    
        var sql="INSERT INTO marriage(YourName,YourspouseName,YourfatherspouseName,Yourfathersname,Yoursmathen) VALUES (?)"
        let values=[queryobject.YourName,queryobject.yourspousename,queryobject.spousefather,queryobject.fathersname,queryobject.spousemothersname];
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });

     
});


app.listen(port,()=>{
    console.log(path.join(__dirname,'../frontend/indexx.html'));
    console.log(`http://localhost:${port}`);
});