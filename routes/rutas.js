const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter')
const categoriesRouter = require('./categoriesRouter')
const brandsRouter = require('./brandsRouter')

function routerApi(app){
    app.use('/products', productsRouter)
    app.use('/users', usersRouter)
    app.use('/categories', categoriesRouter)
    app.use('/brands', brandsRouter)
}

module.exports = routerApi


