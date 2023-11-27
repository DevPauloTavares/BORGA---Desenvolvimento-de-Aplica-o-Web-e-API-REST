const crypto = require('crypto');
const borgaGamesData = require('./borga-games-data');
const gamesData = require('./borga-games-data');
const errors = require('./errors/borga-errors')

const users = [{id : 1, userName : "Barbara", token :"3fa85f64-5717-4562-b3fc-2c963f66afa6", password : "1234" },
               {id :2, userName : "Paulo", token : "3fa85f64-5717-4562-b3fc-2c963f66afa7", password : "1234" },
               {id :3, userName : "Mogas", token : "3fa85f64-5717-4562-bb"}
]



const groups =[
                {id : 1, name: "Nome do grupo", description : "groupBarbara", games: [], userId : 1},
                {id : 1, name: "Meu Primeiro Grupo", description : "groupPaulo", games: [], userId : 2}
                //{id : 1, name: "asas", description : "groupMogas", games: [], userId : 3}
                
            ]

const nextId = [
    
                {nextid : 1, userId : 1},
                {nextid : 1, userId : 2}
               // {nextid : 1, userId : 3}
    
            ]

let nextIdUser = 3


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
  getUserByUsername : getUserByUsername

 }



function createNewUser(name, password){
    const newid = ++nextIdUser
    token = crypto.randomUUID()
    const newUser = {
        id : newid,
        userName : name,
        token : token,
        password : password
    }
    users.push(newUser)
    return Promise.resolve(newUser)
}


function createNewGroup(name, description, userId){
    let idNext = nextId.find(ids => ids.userId == userId)
    if(!idNext){
        
        idNext = {
            nextid : 0,
            userId : userId
        }
        nextId.push(idNext)
    }
    
    idNext.nextid =  ++idNext.nextid
    const newGroup = {
        id : idNext.nextid,
        name : name,
        description : description,
        games : [],
        userId : userId
    }
 
    groups.push(newGroup)
    return Promise.resolve(newGroup)
}



function getGroup(userId) {
    const allgroup = groups.filter(g => g.userId == userId )
    console.log("vendo o all grupo em analize")
    console.log(allgroup)
  //  if(!allgroup || allgroup.length == 0) return Promise.reject(errors.NOT_GROUP(userId))
    return Promise.resolve(allgroup)
}


function UpdateGroup(name, description,idUser,idGroup) {
    const allGroups = groups.filter(group => group.userId == idUser)
    if(!allGroups) return Promise.reject(errors.NOT_FOUND(idUser))
    const GrupoUpdate = allGroups.find(group => group.id == idGroup)
    if(!GrupoUpdate) return Promise.reject(errors.NOT_FOUND(idGroup))
    const games = GrupoUpdate.games
    const newGroup = {
        id : GrupoUpdate.id,
        name :name,
        description : description,
        games : games,
        userId : idUser
    }
    deleteGroup(idGroup,idUser)

    groups.push(newGroup)   
    return Promise.resolve(newGroup)
    
}

function deleteGroup(idGroup,userId) {
    const allGroups = groups.filter(group => group.userId == userId)
    if(!allGroups) return Promise.reject(errors.NOT_FOUND(userId))
    const groupDele = allGroups.find(group => group.id == idGroup)
    if(!groupDele) return Promise.reject(errors.NOT_FOUND(idGroup))
    const groupexit = groups.filter(group => group.userId != groupDele.userId)
    const groupnew = allGroups.filter(group => group.id != groupDele.id)
    while(groups.length)
        groups.pop()
    groupexit.forEach(group => groups.push(group))
    groupnew.forEach(g => groups.push(g)) 
   /// allGroups = groups.filter(group => group.userId == userId)
    return Promise.resolve(groupnew)
}

function GroupDetails(idGroup,userId){
    const allGroups = groups.filter(group => group.userId == userId)
    if(!allGroups) return Promise.reject(errors.NOT_FOUND(userId))
    const GrupoDetails = allGroups.find(group => group.id == idGroup)
    if(!GrupoDetails) return Promise.reject(errors.NOT_FOUND(idGroup))
    let aux = []
    GrupoDetails.games.forEach(games =>{
        games.userId = GrupoDetails.id
        aux.push(games)
    })
    return Promise.resolve(aux)
}


function addGameToGroup(userId, idGroup, gameId){
    const allGroups = groups.filter(group => group.userId == userId)
    if(!allGroups) return Promise.reject(errors.NOT_FOUND(userId))
    const GrupoGameAdditional = allGroups.find(group => group.id == idGroup)
    if(!GrupoGameAdditional) return Promise.reject(errors.NOT_FOUND(idGroup))
    GrupoGameAdditional.games.push(gameId)
    deleteGroup(idGroup,userId)
    groups.push(GrupoGameAdditional)

    return Promise.resolve(GrupoGameAdditional)                  
}

function DeleteGameToGroup(idUser, idGroup, gameId){
  
    const allGroups = groups.filter(group => group.userId == idUser)
    if(!allGroups) return Promise.reject(errors.NOT_FOUND(userId))
    const GrupoGameDelete = allGroups.find(group => group.id == idGroup)
    if(!GrupoGameDelete) return Promise.reject(errors.NOT_FOUND(idGroup))
    const new_group = {
        id: GrupoGameDelete.id,
        name: GrupoGameDelete.name,
        description: GrupoGameDelete.description,
        games : [], 
        userId: GrupoGameDelete.userId
    }
    if(!(GrupoGameDelete.games.find(g => g.id == gameId))) return Promise.reject(errors.NOT_FOUND(gameId))
    const newGroup = GrupoGameDelete.games.filter(games => games.id != gameId)
    new_group.games = newGroup
    deleteGroup(idGroup,idUser)
    groups.push(new_group)   
    return Promise.resolve(new_group)
    }

function getUserByUsername(name){
    const user = users.find(u=>u.userName==name)
    if(!user) return Promise.reject(errors.NOT_AUTHORIZE()) 
   
    return Promise.resolve(user)
}

function getTokenUser(token){
    const user = users.find(user=> user.token == token)
    if(!user)  return Promise.reject(errors.NOT_AUTHORIZE())
    return Promise.resolve(user)
}
