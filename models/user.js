var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores = ["M", "F"];

var email_march = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];

var password_validator = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message: "La contraseñas no son iguales"
}

var user_schema = new Schema({
	name: String,
	username: {type: String, maxlength:[15, "El nombre de usuario es muy grande"]},
	password: {	type: String,
				required: "El password es obligatorio", 
				minlength:[8, "El password es muy corto"],
				validate: password_validator
			},
	age: Number,
	email: {type: String,required: "El email es obligatorio",match: email_march}, 
	date_of_birth: Date, 
	sex: {type: String, enum:{values: posibles_valores, message:"Opcion no valida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;