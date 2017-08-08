var express = require("express");
var bodyParser = require('body-parser');
var User = require("./models/user").User;
//var session = require("express-session");
var cookieSession = require("cookie-session");
var router_app = require("./route_app");
var session_middleware = require("./middlewares/session");

var methodOverride = require("method-override");


var app = express();

app.use("/public", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.use(session({
	secret: "123dnasduodfsn12sa",
	resave: false,
	saveUnitialized: false
}));*/

app.use(methodOverride("_method"));

app.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]
}));

app.get('/logout',function(req, res){
  /*req.session.destroy(function(){
    res.redirect('/');
  });*/
  req.session = null;
  res.redirect('/');
}); 

app.set("view engine", "jade");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/signup", function(req, res){
	User.find(function(err, doc){
		res.render("signup");
	})
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/users", function(req, res){
	var user = new User({
						 email: req.body.email, 
						 password: req.body.password,
						 password_confirmation: req.body.password_confirmation,
						 username: req.body.username
						});
	
	user.save().then(function(us){
		//res.send("Guardamos el usuario exitosamente");
		req.session.user_id = user._id;
		res.redirect("/app");
	}, function(err){
		console.log(String(err));
		res.send("No puedimos guardar la informacion");
	})
})

app.post("/sessions", function(req, res){
	User.findOne({email: req.body.email,password: req.body.password}, function(err, user){
		if(user){
			req.session.user_id = user._id;
			res.redirect('/app');
		} else {
			res.render('index', {error: 'Usuario no encontrado, por favor intentelo nuevamente.'});
			console.log("Usuario no encontrado, por favor intentelo nuevamente.");
		}
	})
})

app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(8080);