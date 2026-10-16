const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const port = 8080;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Cars API is running');
});

app.listen(port, () => {
    console.log(`API is working on http://localhost:${port}`);
});