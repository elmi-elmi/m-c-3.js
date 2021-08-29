
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>enter message</title></head>')
        res.write('<body>')
        res.write('<form action="/message" method="POST">')
        res.write('<input type="text" name="message">')
        res.write('<button type="submit">Send</button>')
        res.write('</form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk)
        });
        return req.on('end', () => {
            parsed_data = Buffer.concat(body).toString();
            // fs.writeFile('message.txt', parsed_data.split('=')[1]);
            fs.writeFile('message.txt', parsed_data.split('=')[1], err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            });

        })
    }


    res.setHeader('Content-type', 'text/html')
    res.write('<html> <head> <h1> This is title </h1> </head></html>')
    res.end()
}

module.exports = requestHandler

// module.export = {
//     handler: requestHandler,
//     someText: 'Hard code text'
// }

// module.export.handler = requestHandler;
// module.exports.someText = 'some text';

// exports.handler = requestHandler;
// exports.someText = 'some text';
