import express from 'express';
import login from 'routes/login';
import register from 'routes/register';

const app = express();

app.use('/login', login);
app.use('/register', register);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`api started on ${port}`);
});
