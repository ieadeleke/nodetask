var fs = require('fs');
var http = require('http');
var qs = require('querystring');


var server = http.createServer(function(req,res) {
	if (req.url === '/') {

		res.writeHead(200, { 'Content-Type' : 'text/html' });
		res.write(`

					<html>
					<head>
						<title></title>
					</head>
					<body>

						<h3> Please enter your message here </h3>
						<br> <br>
						<form method="POST" action="/message">

								<textarea name="message" cols="30" rows="10"> </textarea>
								<br> <br>

								<button type="submit" id="submit"> SUBMIT </button>

						</form>
					</body>
				</html>

			`);
		res.end()
	} else if (req.url === '/message') {
		if (req.method === 'POST') {

			var data = '';

			req.on('data', chunck => {
				data += chunck;
			})
			req.on('end', chunck => {
				var mssg = qs.parse(data);

				fs.writeFile('message.txt', mssg.message, () => {
					console.log(' code complete ');
				})
			})
			res.end(' a new txt file has been created and your message has been written to it ');
		}
	}
})



server.listen(8080, () => {
	console.log('Server started on port 8080');
} )
