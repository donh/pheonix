/*
 * GET home page.
 */
exports.root = function(req, res) {
	// res.render('phx/home', { title: 'PHX' });
	// res.render('index.html', { title: 'PHX' });
	res.sendfile(__dirname + '/index.html');
};

exports.react = function(req, res) {
	res.render('141022_react/home', { title: 'React' });
};

exports.auto = function(req, res) {
	res.render('140811_auto/home', { title: 'Testing and Automation' });
};

exports.doc = function(req, res) {
	res.render('140610_doc/home', { title: 'Documentation' });
};

exports.wd = function(req, res) {
	res.render('140415_wd/home', { title: 'WD' });
};

exports.epic = function(req, res) {
	res.render('140217_epic/home', { title: 'EPIC' });
};