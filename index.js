const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const port = 8080;

app.get('/cars', (req, res) => {
    res.send([
        { id: 1, brand: 'Toyota', model: 'Corolla', year: 2022 },
        { id: 2, brand: 'BMW', model: '320d', year: 2021 },
        { id: 3, brand: 'Audi', model: 'A4', year: 2023 }
    ]);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Cars API is running');
});

app.listen(port, () => {
    console.log(`API is working on http://localhost:${port}`);
});