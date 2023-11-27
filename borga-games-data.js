const fetch = require('node-fetch')
const errors = require('./errors/borga-errors')
const client_id = "KbvHBMAUmU" //process.env.NODE_ENV 


module.exports ={
    getGames :getGames,
    getGamesById : getGamesById,
    getGamesByName : getGamesByName

}

function getGames (){
    const url = "https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=10&client_id="  + client_id;
   
    return fetch(url)
    .then(response => {
       return response.json()
    }).then(obj => obj.games
        )
        .then(games => games.map(games =>   {
            return  {
            id  : games.id ,
            name : games.name,
            url : games.url, 
            image_url : games.image_url,
            description : games.description                           
        } } ))

}

function getGamesById (gameId){

    const url = "https://api.boardgameatlas.com/api/search?ids="+ gameId +"&client_id=" + client_id
    return fetch(url)
             .then(response => {
              return response.json()
            })
            .then(obj =>  obj.games
        )
        .then(games => games.map(games =>   {
            return  {
            id  : games.id ,
            name : games.name,
            url : games.url,                            
        } } ))
        .catch(error => Promise.reject(errors.INVALID_ID(gameId)))

}

function getGamesByName(nameGame){

    const url = "https://api.boardgameatlas.com/api/search?name=" + nameGame + "&client_id="+ client_id
    return fetch(url)
             .then(response => {
                return response.json()
             })
             .then(obj =>  obj.games
             )
            .then(games => games.map(games =>   {
                return  {
                id  : games.id ,
                name : games.name,
                url : games.url,
                image_url : games.image_url,
                description : games.description                               
             } } ))
             
             .then(games => {
                 if(games.length === 0) {
                     console.log("1")
                     return Promise.reject(errors.INVALID_NAME(nameGame))
                 }
        
                 return games[0]
             })
             .catch(error => {
                console.log("2")
                return   Promise.reject(errors.INVALID_ID(nameGame))})
}