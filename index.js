var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
//const { fileTypeFromfile  } = require('file-type');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({dest: 'uploads/'});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	if (!req.file) {
		    return res.status(400).send('No file uploaded');
	}
	try {
		const {originalname, mimetype, size} = req.file;
		return res.json({name: originalname, type: mimetype, size: size});
	} catch (err) {
		console.error('Error processing file:', err);
	    res.status(500).send('Failed to process file');
	}
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
