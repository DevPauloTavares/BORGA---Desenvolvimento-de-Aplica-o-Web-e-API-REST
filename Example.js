const TASKS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = 8080
const baseURL = "http://localhost:9200/"
const express = require('express')
const path = require('path')
const app = express()



app.use(express.urlencoded({extended : false}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/api',borgaWebApiRouter)
app.use('/',borgaSiteRouter)
app.use('/',authUiRouter)
app.listen(8080, ()=> console.log('Example app listening at http://localhost:' + DEFAULT_PORT))

///const borgaWebApiRouter = require('./borga-web-api')(express.Router(),borgaServices)//


