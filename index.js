const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbname'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('SQL connect Works');
});
 
//show all projects
app.get('/api/projects',(req, res) => {
  let sql = "SELECT * FROM project";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results, console.log(query)));
  });
});
 
//show single project
app.get('/api/projects/:id',(req, res) => {
  let sql = "SELECT * FROM project WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results, console.log(req.params.id)));
  });
});
 
//add new project
app.post('/api/projects',(req, res) => {
  let data = { raw_1: req.body.raw_1, raw_2: req.body.raw_2};
  let sql = "INSERT INTO project SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(console.log(query.sql, data), results));
  });
});
 
//update project
app.put('/api/projects/:id',(req, res) => {
  let sql = "UPDATE project SET raw_1='"+req.body.raw_1+"', raw_2='"+req.body.raw_2+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results, console.log(query.sql)));
  });
});
 
//Delete project
app.delete('/api/projects/:id',(req, res) => {
  let sql = "DELETE FROM project WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('We are 3000');
});