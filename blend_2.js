var express = require('express');
var app = express();
app.get('/download',function(req,res){
	var file = __dirname + '/test.mp4';
	res.download(file);
});


app.listen(3030);

