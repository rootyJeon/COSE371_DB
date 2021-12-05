require('./env')

const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`COSE371: Listening on port ${port}.`);
});