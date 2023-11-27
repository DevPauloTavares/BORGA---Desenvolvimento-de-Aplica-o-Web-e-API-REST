const crypto = require('crypto');
const borgaGamesData = require('./borga-games-data');
const gamesData = require('./borga-games-data');
const errors = require('./errors/borga-errors')
const fetch = require('node-fetch')

const baseURL = "http://localhost:9200/"


 module.exports = {
  createNewUser : createNewUser,
  createNewGroup : createNewGroup,
  UpdateGroup : UpdateGroup,
  getGroup : getGroup,
  deleteGroup : deleteGroup,
  GroupDetails : GroupDetails,
  addGameToGroup : addGameToGroup,
  DeleteGameToGroup :DeleteGameToGroup,
  getTokenUser : getTokenUser,
  getUserByUsername : getUserByUsername,
  getGameById :getGameById,
  deleteGameById :deleteGameById
 }



function createNewUser(userName, password){
    token = crypto.randomUUID()
    const body = {
        userName : userName ,
        password : password ,
        token : token
    }

    return fetch(baseURL + `users/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(response => response.json())
    .then(result => {return {id : result._id, name: userName, token : token}})
    .then(user => {
        
        return user
    })    
}

function getUserByUsername(username){
   return fetch(baseURL + `users/_search?q=userName:"${username}"refresh=wait_for`, {
            headers : {"Accept" : "application/json"}
         })
        .then(response => response.json())
        .then(body => body.hits.hits.map(t => { 
            return {userName : t._source.userName, token : t._source.token, password : t._source.password}}))
        .then(r => {return { 
                            userName : r[0].userName,
                            token    : r[0].token,
                            password : r[0].password}})

}


function createNewGroup(name, description, userId){
    const body = {
        name : name,
        description : description,
        userId : userId
    }
    return fetch(baseURL + `borga/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(response => response.json())
    .then(
        result => { 
            console.log("vendo o result")
            console.log(result)
            return { id : result._id, 
                             name : name, 
                             description : description, 
                             userId : userId}})

}


function getGameById(id){
    return fetch(baseURL + `borga/_doc/${id}`, {
                headers : {"Accept" : "application/json"}
        })
        .then(response => response.json())
        .then(body => {return {id : body._id, name : body._source.name, description :body._source.description, userId : body._source.userId }})
}

function getGroup(userId) {
   
    return fetch(baseURL + `borga/_search?q=userId:"${userId}"refresh=wait_for`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(result => {return {id : result._id, 
                                                        name : result._source.name, 
                                                        description : result._source.description,
                                                        userId : userId }}))
    .catch(error => {
    
    })
}



function UpdateGroup(name, description,userId,idGroup) {
    const body ={ userId : userId, name : name, description : description}
    return fetch(baseURL + `borga/_doc/${idGroup}`, {
        method : "PUT",
        headers : {"Accept" : "application/json",
                    "Content-Type" : "application/json"
            }, 
        body :  JSON.stringify(body)
    })
    .then(response => response.json())
}

function deleteGroup(idGroup,userId) {
    return fetch(baseURL + `borga/_doc/${idGroup}`, {
                method : "DELETE",
                "_source.userId" : userId      
    })
    .then(response => response.json())
    .then(()=> deleteAllGames(idGroup))
} 

function deleteAllGames(idGroup) {
    return fetch(baseURL + `borga/_doc`, {
        method : "DELETE",
        "_source.userId" : idGroup
        ///"_source.idGroup": idGroup  
    }).then(
        response => response.json
    )
}
function GroupDetails(idGroup,userId){
    
    return fetch(baseURL + `borga/_search?q=userId:"${idGroup}"refresh=wait_for`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(result => {return {id : result._id, 
                                                        name : result._source.name, 
                                                        description : result._source.description,
                                                        image_url : result._source.image_url,
                                                        userId : result._source.userId }}))
                                                  

}


function addGameToGroup(userId, idGroup, gameId){
   
    const body = {
            name : gameId.name,
            url : gameId.url,
            image_url : gameId.image_url,
            description : gameId.description,
            userId : idGroup
        }

    body.name = gameId.name
    body.description = gameId.description

    return fetch(baseURL + `borga/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(response => response.json())
    .then(
        result => { 
            console.log("vendo o id do joog")
            console.log(result._id)
            return { id : result._id, 
                             name : "name", 
                             description : "description", 
                             userId : userId}})
           
      
}

function deleteGameById(gameId) {
    return fetch(baseURL + `borga/_doc/${gameId}`, {
        method : "DELETE"
    })
    .then(response => response.json()) 
}



function DeleteGameToGroup(userId, idGroup, gameId){
        
    return fetch(baseURL + `borga/_doc/${gameId}`, {
        method : "DELETE",
        "_source.userId" : userId, 
        "_source.idGroup": idGroup   
    })
    .then(response => response.json()) 
}


function getTokenUser(token){
    return Promise.resolve ( fetch(baseURL + `users/_search?q=token:"${token}"`, {
        headers : {"Accept" : "application/json"}
     })
    .then(response => {
        return response.json()})
    .then(body => body.hits.hits.map(t => { return {id : t._id , name : t._source.name, token : t._source.token}})[0])
    )
    .then(g => { return Promise.resolve(g)} )
    .catch(err => { return Promise.reject("Error")})
}
