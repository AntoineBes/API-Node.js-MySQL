const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD")
  next();
});

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbname'
});
 
//Server listening
app.listen(3000,() =>{
  console.log('We are 3000');
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


// Users

app.post('/api/login',(req, res) => {
  let sql = "SELECT token, email, role, password FROM users WHERE email = '"+req.body.email+"'";
  let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
});
});

const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

app.post('/api/register', async(req, res) => {
  let data = {login: req.body.login, password: req.body.password, email: req.body.email, 
    token: token, role: "ROLE_USER"};
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
})
});