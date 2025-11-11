const express = require('express');
const app = express();
const swaggerSetup = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/errorHandler');
const port = 3000;

const mongoose = require('mongoose');

// Servicios
const CategoriesService = require('./services/categoriesService');
const BrandsService = require('./services/brandsService');
const ProductsService = require('./services/productsService');
const UsersService = require('./services/usersService');

// Routers
const categoriesRouter = require('./routes/categoriesRouter');
const brandsRouter = require('./routes/brandsRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

// Middlewares
app.use(express.json());

//  Conectar a MongoDB UNA VEZ aquí
mongoose.connect('mongodb+srv:///?retryWrites=true&w=majority&appName=cluster25712')
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB', err));

// Instancias ÚNICAS y COMPARTIDAS
const categoriesService = new CategoriesService();
const brandsService = new BrandsService();
const productsService = new ProductsService(brandsService, categoriesService);
const usersService = new UsersService();

// Inyección de dependencias
brandsService.injectProductsService(productsService);
categoriesService.injectProductsService(productsService);

// Routers con los servicios
app.use("/categories", categoriesRouter(categoriesService, productsService));
app.use("/brands", brandsRouter(brandsService, productsService));
app.use("/products", productsRouter(productsService));
app.use("/users", usersRouter(usersService));

// Swagger
swaggerSetup(app);

// Middleware de errores (debe ir al final)
app.use(logErrors);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log("Server running on " + port));
