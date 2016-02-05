import Express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import config from '../../config';
import urlService from '../common/utils/urlService';

const app = Express();
const port = config.port || 3000;

if (!config.isProduction) {
    const devMiddleware = require('./devMiddleware').default;
    app.use(devMiddleware());
}

const apiRoutes = Express.Router();
const db = new sqlite3.Database(':memory:');
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT)");
    var stmt = db.prepare("INSERT INTO urls VALUES (?, ?)");
    stmt.run(1234567, 'http://example.com');
    stmt.finalize();
});

apiRoutes.get('/getShortId', function(req, res) {
    const url = req.query.url;
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO urls VALUES (?, ?)");
        stmt.run(null, url);
        stmt.finalize();

        db.get("SELECT id, url FROM urls where url = ? limit 1", [url], function(err, row) {
            const shortId = row ? urlService.encode(row.id) : null;
            res.json({'shortId': shortId});
        });
    });
});

apiRoutes.get('/getLongUrl', function(req, res) {
    const shortId = req.query.shortid;
    const id = urlService.decode(shortId);

    db.get("SELECT id, url FROM urls where id = ? limit 1", [id], function(err, row) {
        const url = row ? row.url : null;
        res.json({'url': url});
    });
});

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(Express.static(publicPath));
app.use('/api', apiRoutes);
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
