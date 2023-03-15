let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
//const port = 2410;
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { mobiles } = require("./mobData.js");
let fs = require("fs");
let fname = "mob.json";

app.get("/resetData", function(req,res){
	let data = JSON.stringify(mobiles);
	fs.writeFile(fname, data, function(err) {
		if (err) res.status(404).send(err);
		else res.send("Data in file is reset");
	});
})

app.get("/mobiles", function(req, res){
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			res.send(mobilesArray);
		}
	});
});

app.get("/mobles/:name", function(req, res){
	let name = req.params.name;
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let mobile = mobilesArray.filter((st) => st.name === name);
			if (mobile) res.send(mobile);
			else res.status(404).send("No mobile found");
		}
	});
});
app.get("/mobiles/:brand", function(req, res){
	let brand = req.params.brand;
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let mobile = mobilesArray.filter((st) => st.brand === brand);
			if (mobile) res.send(mobile);
			else res.status(404).send("No mobile found");
		}
	});
});

app.get("/mobile/:RAM", function(req, res){
	let ram = req.params.RAM;
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let mobile = mobilesArray.filter((st) => st.RAM === ram);
			if (mobile) res.send(mobile);
			else res.status(404).send("No mobile found");
		}
	});
});

app.get("/mob/:ROM", function(req, res){
	let rom = req.params.ROM;
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let mobile = mobilesArray.filter((st) => st.ROM === rom);
			if (mobile) res.send(mobile);
			else res.status(404).send("No mobile found");
		}
	});
});

app.get("/:OS", function(req, res){
	let os = req.params.OS;
	fs.readFile(fname, "utf8", function(err, data){
		if(err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let mobile = mobilesArray.filter((st) => st.OS === os);
			if (mobile) res.send(mobile);
			else res.status(404).send("No mobile found");
		}
	});
});

app.post("/mobiles", function(req,res){
	let body = req.body;
	fs.readFile(fname, "utf8", function(err, data) {
		if (err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let newMobile = { ...body };
			mobilesArray.push(newMobile);
			let data1 = JSON.stringify(mobilesArray);
			fs.writeFile(fname, data1, function (err) {
				if(err) res.status(404).send(err);
				else res.send(newMobile);
			}); 
		}
	});
});

app.put("/mobiles/:name", function(req,res){
	let body = req.body;
	let name = req.params.name;
	fs.readFile(fname, "utf8", function(err, data) {
		if (err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let index = mobilesArray.findIndex(st => st.name === name);
			if (index>=0) {
				let updatedMobile = {...mobilesArray[index],...body};
				mobilesArray[index] = updatedMobile;
				let data1 = JSON.stringify(mobilesArray);
				fs.writeFile(fname, data1, function (err) {
				if(err) res.status(404).send(err);
				else res.send(updatedMobile);
			});
			}
			else res.status(404).send("No mobiles found");
		}
	});
});

app.delete("/mobiles/:name", function(req,res){
	let body = req.body;
	let name = req.params.name;
	fs.readFile(fname, "utf8", function(err, data) {
		if (err) res.status(404).send(err);
		else {
			let mobilesArray = JSON.parse(data);
			let index = mobilesArray.findIndex(st => st.name === name);
			if (index>=0) {
				let deleteMobile = mobilesArray.splice(index, 1);
				let data1 = JSON.stringify(mobilesArray);
				fs.writeFile(fname, data1, function (err) {
				if(err) res.status(404).send(err);
				else res.send(deleteMobile);
			});
			}
			else res.status(404).send("No Mobile found");
		}
	});
});
