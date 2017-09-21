/**
 * http://usejsdoc.org/
 */
var ejs = require("ejs");
var mysql = require('./mysql');

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

function Usersignedin(req,res){	
	// check user already exists
	var getUser="select * from user_details where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log("invalid Login");
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				ejs.renderFile('./views/Login_success.ejs', { data: results } , function(err, result) {
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
				ejs.renderFile('./views/Login_fail.ejs',function(err, result) {
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
}




function Userregistered(req,res){
	
	
	var isuserexists="select username from user_details where username='"+req.param("username")+"'";
	console.log("Query is:"+isuserexists);
    
	mysql.fetchData(function(err,results){
		if(err){
			console.log("invalid Login");
			throw err;
		}

		else 
		{
				if(results.length > 0){
					console.log("UserAlready exists");
					ejs.renderFile('./views/Useralreadyexists.ejs', { data: results } , function(err, result) {
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
				
					
					
					var insertUser="insert into user_details(username,password,first_name,last_name,dob,gender) values ('"+req.param("username")+"' ,'" + req.param("password") +"' ,'" + req.param("firstname")+"' ,'" + req.param("lastname") +"' ,'" + req.param("dob") +"' ,'" + req.param("gender") +"');";
					console.log("Query is:"+insertUser);
					
					
					mysql.insertData(function(err,results){
						if(err){
							console.log("Registration Unsucessful");
												throw err;
						}
						else 
						{
							//if(results.length > 0){
							  if(results){
							console.log("Registration Sucessful");
								ejs.renderFile('./views/Register_success.ejs', { data: results } , function(err, result) {
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
								
								console.log("Invalid Registration");
				//
							}
						}  
					},insertUser);
					
					
					
					
					
				   
				}
			}  
		},isuserexists);
	
	
	
//	var insertUser="insert into user_details(username,password,first_name,last_name,dob,gender) values ('"+req.param("username")+"' ,'" + req.param("password") +"' ,'" + req.param("firstname")+"' ,'" + req.param("lastname") +"' ,'" + req.param("dob") +"' ,'" + req.param("gender") +"');";
//	console.log("Query is:"+insertUser);
//	
//	
//	mysql.insertData(function(err,results){
//		if(err){
//			console.log("Registration Unsucessful");
//			throw err;
//		}
//		else 
//		{
//			//if(results.length > 0){
//			  if(results){
//				console.log("Registration Sucessful");
//				ejs.renderFile('./views/Register_success.ejs', { data: results } , function(err, result) {
//			        // render on success
//			        if (!err) {
//			            res.end(result);
//			        }
//			        // render or error
//			        else {
//			            res.end('An error occurred');
//			            console.log(err);
//			        }
//			    });
//			}
//			else {    
//				
//				console.log("Invalid Registration");
//
//			}
//		}  
//	},insertUser);
	
	

}

exports.signin=signin;
exports.signup=signup;
exports.Usersignedin=Usersignedin;
exports.Userregistered=Userregistered;