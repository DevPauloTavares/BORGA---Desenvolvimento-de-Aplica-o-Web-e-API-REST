//npm install hbs
const errors = require('./errors/http-errors')
const httpErrors = require('./errors/http-errors')
const path = require('path')
const ex = require('./borga-db.js')
const borgaData = require('./borga-games-data')
const res = require('express/lib/response')
const { render } = require('express/lib/response')
let idGroupV =0
let name =0
let discription =0
module.exports = function(router, borgaServices){

    const fileOptions = {
		root: path.join(__dirname, 'views'),
		dotfiles: 'deny'
	};

    router.get('/register',registerPag)
    router.post('/register',register)
    router.get('/', getHomePage)
    router.get('/Groups', getGroup)
    router.post('/createGroups', createNewGroup)
    router.get('/groupCreate/:id/:name/:discription', GroupDetails)
    router.get('/Create%20new%20group',daGroup)
    router.get('/Update%20group',upGROup)
    router.put('/groups/:idGroup',UpdateGroup)
    router.get('/Popular%20games',getAllGames)
    router.post('/addGameGroup',addGameToGroup)
    router.get('/Detail%20game',gameDetailsClick)
    router.get('/Detail%20game/:name',getGamesByName)
    router.delete('/groupDelete/:id',deleteGroup)
    router.delete('/deleteGameById/:idGroup/:id',DeleteGameToGroup)
    return router
   
    
    function getHomePage(req, resp){
        resp.render("home", {username :getUserName(req)})
    }

    function registerPag(req, resp){
        resp.render("register",{scriptName :"createUser"})
    }
    

    async function register(req,resp)
    {
      
      try { 
        const user = await borgaServices.createNewUser(req.body.name,req.body.password)
        resp.render("home")
      }catch(err){
          console.log(err)
      }
    }

    function daGroup(req,resp)
    {
        resp.render("group", {username :getUserName(req)})
    }

    function gameDetailsClick(req,resp){
        resp.render('game',{ username :getUserName(req)})
    }

    function upGROup(req,resp){
        resp.render("upDateGroup", {username :getUserName(req), scriptName : "UpdateGroups", idGroupV : idGroupV})
    }

  
    async function getGroup(req, resp){
        try{
      
        const groups = await borgaServices.getGroup(getToken(req))

        resp.render("groups-list", {groups: groups,  scriptName : "deleteGroups", username :getUserName(req)} )
        }catch(err){
            console.log("sim")
            console.log(err)
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
        }
    }

    async function createNewGroup(req, resp){
        try {
        const group = await borgaServices.createNewGroup(req.body.nome,req.body.description, getToken(req))
        resp.redirect(303,`/groupCreate/${group.id}/${req.body.nome}/${req.body.description}`)
        }catch(err){
           
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
        }
    }

    async function GroupDetails(req, resp){
        idGroupV = req.params.id
        name = req.params.name
        discription = req.params.discription
        detail = {
            name : name, 
            discription : discription
        }
    
        try {
          
        const group = await borgaServices.GroupDetails(getToken(req),idGroupV)
        console.log(group)
        resp.render("details", {group: group,
                                scriptName :"deleteGame",
                                username :getUserName(req), 
                                nameGroup :name,
                                discription : discription})
        }catch(err){
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
        }
    }

 

    async function getAllGames(req, resp){
        const games = await borgaServices.getAllGames()
        resp.render("popularGames",{games:games, username :getUserName(req)})
       }
    


    async function getGamesByName(req,resp){
            const game = await borgaData.getGamesByName(req.params.name)
            const valor = []
            valor.push(game)
            resp.render("detailsGame", {game: valor, username :getUserName(req)})
       }


      
    async   function addGameToGroup(req, resp){
        try {
            
        const task = await borgaServices.addGameToGroup(getToken(req),idGroupV,req.body.nome)
        resp.redirect(303,`/groupCreate/${idGroupV}/${name}/${discription}`)
        }catch(err){
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
        }
    }

   async  function deleteGroup(req, resp){
        try{
            const groupDelete = await borgaServices.deleteGroup(req.params.id,getToken(req))
            resp.json({message : `deleteTask id = ${req.params.id}` })
        }catch(err){
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
        }
        
       }

   async function DeleteGameToGroup(req, resp){
       try {
            
            const gameDelete = await borgaServices.DeleteGameToGroup(getToken(req),req.params.idGroup,req.params.id)
            resp.json({message : `deleteTask id = ${req.params.id}` })
       }catch(err){
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)////.json(httpError.body)
            resp.render("error", {error : httpError})
       }
   }

   async function UpdateGroup(req, resp){
       try{
           const groupsUpDate = await borgaServices.UpdateGroup(req.body.name,req.body.discription,
                                                        getToken(req),req.params.idGroup)
            resp.json({message : `deleteTask id = ${req.params.id}` })
       }catch(err){
            const httpError = errors.convertToHttpError(err)
            resp.status(httpError.status)
            resp.render("error", {error : httpError})
       }

   }


    function getToken(req) {
        return req.user && req.user.token;
    }

    function getUserName(req) {
        return req.user && req.user.userName;
    }

}
