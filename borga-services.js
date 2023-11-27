//const borgaDataMen = require('./borga-data-mem')
const borgaGamesData = require('./borga-games-data')
const errors = require('./errors/borga-errors')
//const borgaGamesData = require('./borga-games-data');
module.exports = function(borgaDataMen) {
    return {
        getGameById : getGameById,
        getAllGames: getAllGames,
        createNewUser : createNewUser,
        createNewGroup : createNewGroup,
        UpdateGroup : UpdateGroup,
        getGroup : getGroup,
        deleteGroup : deleteGroup,
        GroupDetails : GroupDetails,
        addGameToGroup : addGameToGroup,
        DeleteGameToGroup :DeleteGameToGroup,
        getGamesByName : getGamesByName,
        validateUser   : validateUser
    }

    function getGameById (gameId){
        return borgaGamesData
                 .getGamesById(gameId)
                 .then(game => Promise.resolve(game))
                 .catch(err => console.error(err))
    
    }
    
    function getAllGames(){
        return borgaGamesData
                .getGames()
                .then(gamesall => Promise.resolve(gamesall))
                .catch(error => Promise.reject(error))
    }
    
    function getGamesByName(name){
        return borgaGamesData.getGamesByName(name)
                .then(games => Promise.resolve(games))
                .catch(error => Promise.reject(error))
    }
    
    function createNewUser(name,password){
        console.log("analises")
        return borgaDataMen
                .createNewUser(name, password)
                .then(newUser => {
                   console.log(newUser)
                   return  Promise.resolve(newUser)})
                .catch(error =>{ 
                    console.log(error)
                    Promise.reject(error)})
     
    }
    
    function createNewGroup(name, description, token){
       return borgaDataMen
                .getTokenUser(( token ))
                .then( user =>{
                  return  borgaDataMen.createNewGroup(name, description, user.id)})
                  .catch(error => {
                    if(error.length  == 5)
                        {
                            return Promise.reject(errors.ERROR_SERVIDOR())
                        }
                    else 
                        {
                            return Promise.reject(errors.NOT_AUTHORIZE())
                        }
                })        
    }
    
    
    function getGroup(token) {
        return borgaDataMen
                 .getTokenUser((token))
                 .then( user =>{
                     console.log(user)
                    return borgaDataMen.getGroup(user.id)})
                 .catch(error => {
                     console.log(error)
                    if(error.length  == 5)
                        {
                            return Promise.reject(errors.ERROR_SERVIDOR())
                        }
                    else 
                        {
                            return Promise.reject(errors.NOT_AUTHORIZE())
                        }
                })
              
                 
                          
    }
    
    function UpdateGroup(name, description,token,idGroup) {
        return borgaDataMen
                .getTokenUser((token))
                .catch(error => {
                    return Promise.reject(errors.NOT_AUTHORIZE()) })
                .then( user => {
                    borgaDataMen.UpdateGroup(name, description, user.id, idGroup)})
                
                
    }
    
    function deleteGroup(idGroup,token) {
       
        return borgaDataMen
                .getTokenUser((token))
                .catch(error => {
                    return Promise.reject(errors.NOT_AUTHORIZE()) })
                .then( user => borgaDataMen.deleteGroup(idGroup,user.id))
                
    }
    
    function GroupDetails(token, idGroup){

        return borgaDataMen
                .getTokenUser(( token ))
                .catch(error => {
                    return Promise.reject(errors.NOT_AUTHORIZE())}) 
                .then( user => borgaDataMen.GroupDetails(idGroup,user.id))
                
    
    }
    
    function addGameToGroup(token, idGroup, gameId){

        return borgaGamesData.getGamesByName(gameId)
                .catch(error => {
                    return Promise.reject(error)})
                .then(game => borgaDataMen.getTokenUser(token)
                                          .catch(error => { 
                                                 return Promise.reject(errors.NOT_AUTHORIZE())})
                                          .then( user => borgaDataMen.addGameToGroup(user.id, idGroup, game))           
                     )
    }
    
    function DeleteGameToGroup(token, idGroup, gameId){
      
        return borgaDataMen
                .getTokenUser((token))
                .catch(error => { 
                    return Promise.reject(errors.NOT_AUTHORIZE())})
                .then( user => borgaDataMen.DeleteGameToGroup(user.id, idGroup, gameId))
                
    }
    
    function validateUser(username, password){
       
        return borgaDataMen.getUserByUsername(username)
                .then(user => {
                    if(user.password == password){ return Promise.resolve({userName : user.userName , token : user.token})}
                    return Promise.reject(errors.NOT_AUTHORIZE())
                })
    }

      
  
   }





