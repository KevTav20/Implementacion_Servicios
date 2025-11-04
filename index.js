const express = require('express');
const app = express();
const swaggerSetup = require('./swagger');
const port = 3000;

const CategoriesService = require('./services/categoriesService');
const BrandsService = require('./services/brandsService');
const ProductsService = require('./services/productsService');

const categoriesRouter = require('./routes/categoriesRouter');
const brandsRouter = require('./routes/brandsRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.json());

// Instancias ÚNICAS y COMPARTIDAS
const categoriesService = new CategoriesService();
const brandsService = new BrandsService();
const productsService = new ProductsService(brandsService, categoriesService);

// Inyectar dependencias una vez
brandsService.injectProductsService(productsService);
categoriesService.injectProductsService(productsService);

// Pasar EL MISMO service a los routers
app.use("/categories", categoriesRouter(categoriesService, productsService));
app.use("/brands", brandsRouter(brandsService, productsService));
app.use("/products", productsRouter(productsService));

swaggerSetup(app);

app.listen(port, () => console.log("Server running on " + port));
