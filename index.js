
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const port = 8080;

app.use(express.json());

const cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2022 },
    { id: 2, brand: 'BMW', model: '320d', year: 2021 },
    { id: 3, brand: 'Audi', model: 'A4', year: 2023 }
];

// GET /cars — get all cars
app.get('/cars', (req, res) => {
    res.status(200).json(cars);
});

// GET /cars/:id — get a car by ID
app.get('/cars/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid car ID' });
    }

    const car = cars.find(car => car.id === id);

    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }

    return res.status(200).json(car);
});

// POST /cars — add a new car
app.post('/cars', (req, res) => {
    const { id, brand, model, year } = req.body;

    if (
        id === undefined ||
        typeof brand !== 'string' ||
        !brand.trim() ||
        typeof model !== 'string' ||
        !model.trim() ||
        year === undefined
    ) {
        return res.status(400).json({
            error: 'id, brand, model and year are required'
        });
    }

    if (
        !Number.isInteger(id) ||
        id < 1 ||
        !Number.isInteger(year) ||
        year < 1886 ||
        year > new Date().getFullYear()
    ) {
        return res.status(400).json({
            error: 'Invalid car parameters'
        });
    }

    if (cars.some(car => car.id === id)) {
        return res.status(409).json({
            error: 'Car with this ID already exists'
        });
    }

    const newCar = {
        id,
        brand: brand.trim(),
        model: model.trim(),
        year
    };

    cars.push(newCar);

    return res.status(201).json(newCar);
});

// DELETE /cars/:id — delete a car by ID
app.delete('/cars/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid car ID' });
    }

    const carIndex = cars.findIndex(car => car.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }

    cars.splice(carIndex, 1);

    return res.status(204).send();
});

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Cars API is running');
});

app.listen(port, () => {
    console.log(`API is working on http://localhost:${port}`);
});
