var ejs = require("ejs");
//var mysql = require('./mysql');

//var mysql1 = require('mysql');

var MongoClient = require('mongodb').MongoClient;


function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}



function signup(req,res) {
	
		ejs.renderFile('./views/signup.ejs',function(err, result) {
		   // render on success
		   if (!err) {
					res.end(result);
		   }
		   // render or error
		   else {
					res.end('An error occurred');
					console.log(err);
		   }
	   });
	}

function afterSignIn(req,res)
{

	var url="mongodb://sidgore:sidgore@sidmongo-shard-00-00-uesva.mongodb.net:27017,sidmongo-shard-00-01-uesva.mongodb.net:27017,sidmongo-shard-00-02-uesva.mongodb.net:27017/users?ssl=true&replicaSet=SidMongo-shard-0&authSource=admin";
	var query={
		email:req.param("inputUsername")	};
	
console.log("Innput is "+query.email);

	MongoClient.connect(url, (err, db) => {
		if (err) return console.log(err);

		//db.collection('customers').find(query).exec( (err, result) => {
		//	if (err)
		//	 return console.log(err);	
		
		//	console.log(result[0]);
		//	res.redirect('/');
		  //});

		  db.collection("customers").findOne(query , (err, result) =>{
			if (err) throw err;
			console.log(result.password);

			//var a=result.password;
			//var b=req.param("inputPassword");
//console.log(b);
//if(a==b)
			
		//{	
			res.render('userDashboard.ejs', {quotes: result})
//res.render('./views/successLogin.ejs', {data: result});

		//	res.render('./views/userDashboard.ejs');

	
			//db.close();
		//}
	
			
		  });
		});

	




/*

	// check user already exists
	var getUser="select * from users where username='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getUser);
	*/
}



function aftersignup(req,res)
{
	var url="mongodb://sidgore:sidgore@sidmongo-shard-00-00-uesva.mongodb.net:27017,sidmongo-shard-00-01-uesva.mongodb.net:27017,sidmongo-shard-00-02-uesva.mongodb.net:27017/users?ssl=true&replicaSet=SidMongo-shard-0&authSource=admin";
	var obj={
		email:req.param("inputUsername"),
		password:req.param("inputPassword"),
		name:req.param("fname"),
		lname:req.param("lname")
	};
	
		MongoClient.connect(url, (err, db) => {
			if (err) return console.log(err);
			db.collection('customers').save(obj, (err, result) => {
				if (err) return console.log(err)
			
				console.log('saved to database')
				res.redirect('/')
			  });
				
			  });



	
			
	
	
	/*
	
	var getUser="select * from users where username='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	console.log(getUser);
if(getUser)
{	console.log("User Already Present!! Kindly Sign In!!");
}
	else {	

		var sql="INSERT INTO users values ('"+req.param("inputUsername")+"','" + req.param("inputPassword") +"','"+ req.param("fname")+"','"+ req.param("lname")+"'";
		
//var sql1="INSERT INTO users(`username`,`password`,`firstname`,`lastname`) VALUES('sid.ss@sss.com','123','sss','dddd')";

var connection = mysql1.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'test',
	port	 : 3306
});
	  
connection.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
		connection.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log("1 record inserted");
		});
	  });
}

*/
}





















function getAllUsers(req,res)
{
	var getAllUsers = "select * from users";
	console.log("Query is:"+getAllUsers);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof rows[0].emailid));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsString));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(rows[0].emailid));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Parse:"+(jsonParse));
				
				ejs.renderFile('./views/successLogin.ejs',{data:jsonParse},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("No users found in database");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getAllUsers);
}

exports.signin=signin;
exports.signup=signup;
exports.aftersignup=aftersignup;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;