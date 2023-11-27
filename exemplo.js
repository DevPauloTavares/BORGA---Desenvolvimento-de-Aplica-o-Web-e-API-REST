let ar = [1,2,3,4,5,6,7,8]

ar.map(nu => {
    console.log("map")
    if (nu -3 == 0){ 
        console.log("1")
      nu =0}
    return nu
})

console.log(ar)