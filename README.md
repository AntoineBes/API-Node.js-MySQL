# Node API MySQL  Express

http://localhost:3000/api/projects  
  

    "body-parser": "^1.19.0",  


    "express": "^4.17.1",  


    "mysql": "^2.17.1"  
  
# Construct JSON  
  
  application/json
  
{ 
	"raw_1": "Hello !",  
	"raw_2": 1,  	
}


# Create Database

CREATE DATABASE dbname

# Create Table

CREATE TABLE project
(
    id INT PRIMARY KEY NOT NULL,
    raw_1 VARCHAR(255),
    raw_2 INT (100)
)