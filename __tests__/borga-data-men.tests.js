const data = require('../borga-data-mem.js');
// teste de borga-data-mem

  test('create new user of name Pedro', () => {
   return data.createNewUser("Pedro")
            .then(user => expect({name : user.name, id : user.id})
                        .toStrictEqual({name: 'Pedro', id:4}))
  });


 test('create new user of name Paulo', () => {
   return data.createNewUser("Paulo")
            .then(user => expect({name : user.name, id : user.id})
                        .toStrictEqual({name: 'Paulo', id:5}))
  });

  
  test('create group', () => {
   return data.createNewGroup("Grupo do Paulo", "jogos favoritos",4)
                .then(user => expect(user)
                .toStrictEqual({id : 1, name: "Grupo do Paulo", 
                                description : "jogos favoritos",
                                 games: [], userId : 4})
  )})


  test('create group', () => {
   return data.createNewGroup("Grupo do Paulo", "jogos favoritos 2",4)
              .then(group => expect(group)
              .toStrictEqual({id : 2, name: "Grupo do Paulo", 
                              description : "jogos favoritos 2", 
                              games: [], userId : 4})
)})



test("get all groups user Paulo", () => {
   return data.getGroup(4)
              .then(group => expect(group)
              .toStrictEqual(
                 [
                    {
                       id : 1, name: "Grupo do Paulo", 
                       description : "jogos favoritos",
                       games: [], userId : 4
                    }, 
                    {
                       id : 2, name: "Grupo do Paulo", 
                       description : "jogos favoritos 2",
                       games: [], userId : 4}]))
})


test("update group user Paulo", () => {
   return data.UpdateGroup("Novo grupo do Paulo","jogos favoritos 3",4,1)
               .then(group => expect(group)
               .toStrictEqual(
                  {
                     id : 1, name: "Novo grupo do Paulo", 
                     description : "jogos favoritos 3", 
                     games: [], userId : 4
                  }))
})


test("Delete group of Paulo with id 2", () => {
   return data.deleteGroup(2,4)
              .then(group => expect(group)
              .toStrictEqual(
            [
               {
                     "description": "jogos favoritos 3",
                     "games":  [],
                     "id": 1,
                      "name": "Novo grupo do Paulo",
                     "userId": 4,
                     }
            ]
              ))
})



test(" add game to group user Paulo 1", () => {
   return data.addGameToGroup(4,1,"TAAifFP590")
              .then(game => expect(game.games)
              .toStrictEqual(
                 [{
                    
                    id : "TAAifFP590",
                    name : "Root",
                    url : "https://www.boardgameatlas.com/game/TAAifFP590/root"
                 }
               ]
              ))
})



test(" add game to group user Paulo 2", () => {
   return data.addGameToGroup(4,1,"5H5JS0KLzK")
              .then(game => expect(game.games)
              .toStrictEqual(
                 [
                  {
                     id: 'TAAifFP590',
                     name: 'Root',
                     url: 'https://www.boardgameatlas.com/game/TAAifFP590/root'
                   },
                   {
                     id: '5H5JS0KLzK',
                     name: 'Wingspan',
                     url: 'https://www.boardgameatlas.com/game/5H5JS0KLzK/wingspan'
                   }
                 ]
              ))

})


test("detele game to group user Paulo 2",() => {
   return data.DeleteGameToGroup(4,1,"5H5JS0KLzK")
              .then(game => expect(game.games)
              .toStrictEqual(
                 [
                  {
                     id: 'TAAifFP590',
                     name: 'Root',
                     url: 'https://www.boardgameatlas.com/game/TAAifFP590/root'
                   }
                 ]
              )
              )
})



 