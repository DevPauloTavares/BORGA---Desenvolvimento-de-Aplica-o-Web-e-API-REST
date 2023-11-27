window.addEventListener('load', loadHandler)

function loadHandler(){
    const buttonUpdate = document.querySelector('#btn_update')
    buttonUpdate.addEventListener('click', updateTaskHandler)
}

function updateTaskHandler(){
    const idGroup = document.querySelector('#idGroup').value
    console.log(idGroup)
    const groupName = document.querySelector('#group_name').value
    const groupDiscription = document.querySelector('#group_discription').value 
    //if(!taskText) document.querySelector('#message').appendChild(document.createTextNode("Text Empty"))
    if(!groupName) document.querySelector('#message').innerHTML = "TextEmpty"
    const options = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            name : groupName,
            discription : groupDiscription

        })
    }
    
    fetch(`/groups/${idGroup}`, options)
    .then(res =>{
        console.log(res.status)
        if(res.status==401)  return Promise.reject("Unauthorize") 
        return res.json() 
    } )
    .then(body => {
        console.log(body)
        document.location.href=`/groupCreate/${idGroup}/${groupName}/${groupDiscription}`
    })
    .catch(error => {
        document.querySelector('#message').innerHTML = error
        console.log(error)
    })
    
}

