const fs = require('fs');

const requestHandler = (req, res) => {
    // console.log(req);
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send Message</button></form></body>');
        res.write('</html>');

        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);

        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // writeFileSync is a blocking method
            // fs.writeFileSync('message.txt', message);
            // writeFile accepts 3rd argument that catches the error in err otherwise it executes
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });


        });

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Sever!</h1></body>');
    res.write('</html>');
    return res.end();
}



// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text.'
// };

module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text.';