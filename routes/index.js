/*
 * GET home page.
 */
exports.root = function(req, res) {
	// console.log('exports.root = function(req, res)');
	// res.render('index', { title: 'PHX' });
	// res.render(path.join(__dirname, 'index'));
	res.render('index');
	// res.render('phx/home', { title: 'PHX' });
	// res.render('index.html', { title: 'PHX' });
	// res.sendfile(__dirname + '../public/index.html');
	// res.sendfile(__dirname + '../public/index.html');
	// res.sendfile(__dirname + 'public/index.html');
	// res.sendfile('public/index.html');
	// res.sendfile('index.html');
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