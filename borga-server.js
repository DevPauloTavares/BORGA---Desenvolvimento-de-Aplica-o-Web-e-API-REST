const TASKS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = 8080
const baseURL = "http://localhost:9200/"
const express = require('express')
const path = require('path')
const app = express()
const borgaData = require('./borga-data-mem.js')
//const borgaData = require('./borga-db.js')
const borgaServices = require('./borga-services.js')(borgaData)
const borgaWebApiRouter = require('./borga-web-api')(express.Router(),borgaServices)
const borgaSiteRouter = require('./borga-web-site.js')(express.Router(),borgaServices)
const authUiRouter = require('./Auth-web-iu.js')(app ,express.Router(), borgaServices)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/api',borgaWebApiRouter)
app.use('/',borgaSiteRouter)
app.use('/',authUiRouter)
console.log(process.env.PORT)
app.listen(process.env.PORT || DEFAULT_PORT , ()=> console.log('Example app listening at http://localhost:' + DEFAULT_PORT))

///const borgaWebApiRouter = require('./borga-web-api')(express.Router(),borgaServices)






  




