/* 
* @Author: roverzon
* @Date:   2015-03-05 14:06:05
* @Last Modified by:   roverzon
* @Last Modified time: 2015-03-05 14:11:01
*/

'use strict';

var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('Hello');
});

app.listen(3000);