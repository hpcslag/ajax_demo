var express = require('express'),
	app = new express(),
	ejs = require('ejs'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('cookie-session');

app.use(express.static(__dirname + '/www'));
app.use(cookieParser());
app.use(bodyParser()); //open GER,POST body parser
app.use(session({
  keys: ['cookie', 'https://www.youtube.com/watch?v=SR6iYWJxHqs']
}));
app.set('views', __dirname + '/www'); //views engine path
app.set('view engine', 'ejs');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/loading',function(req,res){
	for(var i =0;i<655351210;i++){

	}
	res.send("Successful!");
});
app.get('/Notification',function(req,res){
	var n = [{title:"Hello world",content:"Hello world",link:"/"}];
	res.send(JSON.stringify(n));
});
var like = 0;
app.get('/LikeRead',function(req,res){
	res.send(like.toString());
});

app.get('/Like',function(req,res){
	like++;
	res.send();
});

var chat = [{username:"MacTaylor",content:"hello"},{username:"Mac10078",content:"nice 2 meet u!"},{username:"MacTaylor",content:"yes!"}];
app.get('/chatRead/:id',function(req,res){
	var id = parseInt(req.param("id"));

	res.send(chat[id]);
});
app.get('/sendMsg/:username/message/:message',function(req,res){
	var username = req.param('username'),
		message = req.param('message');
		console.log(username+','+message);
	chat.push({username:username,content:message});
	res.send("ok");
});


app.get('/overload/:skip',function(req,res){
	var skip = parseInt(req.param('skip'))-1,
		arr = [0,1,2,3,4,5,6,7,8,9,10],
		scope = 3;
	res.send(arr.slice(skip,skip+scope));
});

var save = '';
app.get('/save/:text',function(req,res){
	var text = req.param('text');
	save = text;
	res.send(null);
});


if(!!process.env.IP == false){
	process.env.IP = "192.168.2.162";
}
if(!!process.env.PORT == false){
	process.env.PORT = "80";
}
app.listen(process.env.PORT,process.env.IP);
console.log("伺服器執行位於: http://"+process.env.IP+":"+process.env.PORT);