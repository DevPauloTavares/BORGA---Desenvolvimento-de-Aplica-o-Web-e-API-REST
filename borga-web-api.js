//const borgaServices = require('./borga-services')
const errors = require('./errors/http-errors')


 module.exports = function(router,borgaServices) {
     
    router.get('/games',getAllGames)                                         
    router.get('/games/:gameId',getGameById )                               
    router.post('/users',createNewUser)                             
    router.post('/groups',createNewGroup)                               
    router.get('/groups',getGroup)                                     
    router.put('/groups/:idGroup',UpdateGroup)                     
    router.delete('/groups/:idGroup',deleteGroup)                      
    router.get('/groups/:idGroup',GroupDetails)                 
    router.post('/groups/:idGroup/:gameId',addGameToGroup)         
    router.delete('/groups/:idGroup/:gameId',DeleteGameToGroup)                                
    router.get('/gamesN/:gameName',getGamesByName )
    
    return router

    function getAllGames(req, resp){
     borgaServices.getAllGames()
     .then(newUser => resp.status(200).json(newUser))
     
    }
 
    function getGameById(req, resp){
     borgaServices.getGameById(req.params.gameId)
         .then(newUser => resp.status(200).json(newUser))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})        
    }
 
    function getGamesByName(req, resp){
     borgaServices.getGamesByName(req.params.gameName)
         .then(games => resp.status(200).json(games))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})
         
    }
 
    function createNewUser(req, resp){
     borgaServices.createNewUser(req.body.name)
         .then(newUser => resp.status(200).json(newUser))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})
 
    }
 
 
    function createNewGroup(req, resp){
     let token = req.header('Authorization')
 
     borgaServices.createNewGroup(req.body.name,req.body.description,getToken(token))
         .then(g => resp.status(200).json(g))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})
  
    }
 
 
    function getGroup(req, resp) {
     borgaServices.getGroup(getToken())
         .then(g => resp.status(200).json(g))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})
 
    }
 
    function UpdateGroup(req, resp) {
     const token = req.header('Authorization')
     borgaServices.UpdateGroup(req.body.name,req.body.description,getToken(token),req.params.idGroup)
     .then(g => resp.status(200).json(g))
     .catch(error => {
         const httpError = errors.convertToHttpError(error)
         resp.status(httpError.status).json(httpError.body)})
 
    }
 
    function deleteGroup(req, resp){
     const token = req.header('Authorization')
     borgaServices.deleteGroup(req.params.idGroup,getToken(token))
         .then(g => resp.status(200).json(g))
         .catch(error => {
             const httpError = errors.convertToHttpError(error)
             resp.status(httpError.status).json(httpError.body)})
     
    }
 
    function GroupDetails(req, resp){
     const token = req.header('Authorization')
     borgaServices.GroupDetails(getToken(token), req.params.idGroup)
     .then(g => resp.status(200).json(g))
     .catch(error => {
         const httpError = errors.convertToHttpError(error)
         resp.status(httpError.status).json(httpError.body)})
   
     }
 
    function addGameToGroup(req, resp){
     const token = req.header('Authorization')
     borgaServices.addGameToGroup(getToken(token), req.params.idGroup, req.params.gameId)
     .then(g => resp.status(200).json(g))
     .catch(error => {
         const httpError = errors.convertToHttpError(error)
         resp.status(httpError.status).json(httpError.body)})
 
    }
    function DeleteGameToGroup(req, resp){
     const token = req.header('Authorization')
     borgaServices.DeleteGameToGroup(getToken(token), req.params.idGroup,req.params.gameId)
     .then(g => resp.status(200).json(g))
     .catch(error => {
         const httpError = errors.convertToHttpError(error)
         resp.status(httpError.status).json(httpError.body)})
 
     }

     function getToken( token ){
       // const tk = token.split(" ")
        return "3fa85f64-5717-4562-bb"
    }

   }


