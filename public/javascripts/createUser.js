window.addEventListener('load', loadHandler)

function loadHandler(){
    const buttonUpdate = document.querySelector('#btn_criar')
    buttonUpdate.addEventListener('click', updateTaskHandler)
}

function updateTaskHandler(){
    const nameUser = document.querySelector('#name').value
    console.log(nameUser)
    const passWord1 = document.querySelector('#password1').value
    const passWord2 = document.querySelector('#password2').value
    console.log(passWord1, passWord2)
    /////if(!namUser || !passWord1 || !passWord2) document.querySelector('#message').appendChild(document.createTextNode("Text Empty"))
    if(!nameUser || !passWord1 || !passWord2) 
    {
            document.querySelector('#message').innerHTML = "TextEmpty"
            
    }
    else {
        if(passWord1 == passWord2){
                console.log("verificando se vai a base dados")
                const options = {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body : JSON.stringify({
                        name : nameUser,
                        password : passWord1

                    })
                }
                
                fetch("/register", options)
                .then(res =>{
                    console.log(res.status)
                    if(res.status==401)  return Promise.reject("Unauthorize") 
                    return res
                } )
                .then(body => {
                    console.log(body)
                    document.location.href=`/`
                })
                .catch(error => {
                    document.querySelector('#message').innerHTML = error
                    console.log(error)
                })}
        else{  document.querySelector('#message').innerHTML = "passWord errado" }
        }
    
}

