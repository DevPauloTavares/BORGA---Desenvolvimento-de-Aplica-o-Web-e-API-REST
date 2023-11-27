window.addEventListener('load', loadHandler)


function loadHandler(){
    const buttonsDelete = document.querySelectorAll('button')
    buttonsDelete.forEach(b => b.addEventListener('click', deleteGameHandler))
}

function deleteGameHandler(){
    const idGame = this.id.split('_')[1]
    const idGroup = this.id.split('_')[2]
    const row = document.getElementById("gamerow_" + idGame + "_" +idGroup)
    console.log("vendo row ")
    console.log(idGame)
    console.log(idGroup)
    const options = {
        method : "DELETE",
        headers : {"Accept" : "application/json"}
    }
    //row.remove()
    fetch(`/deleteGameById/${idGroup}/${idGame}`, options)
    .then(res =>{
        console.log(res.status)
        return res.json()
    } )
    .then(body => {
        console.log(body)
        row.remove()
    })
    .catch(error => console.log(error))
}
