module.exports = {
    INVALID_ID: invalidTaskId,
    NOT_FOUND: notFound,
    NOT_AUTHORIZE: notAuthorize,
    NOT_GROUP    : notGroup,
    INVALID_NAME : INVALID_NAME,
    ERROR_SERVIDOR : ERROR_SERVIDOR
}

function notGroup (id) {
    return  {
        code : "e2",
        error : ` user is not group`
    }
}

function INVALID_NAME (name){
    return {
        code : "e1",
        error : `this name ${name.toString()} is a not valid `
    }
}
function invalidTaskId(id) {
    return {
        code: "e1",
        error: `${id.toString()} is not a valid id`
    }
}

function notFound(id) {
    return {
        code: "e2",
        error: ` Group ${id} not found`
    }
}

function notAuthorize() {
    return {
        code: "e3",
        error: `not authorize`
    }
}

function ERROR_SERVIDOR(){
    return {
        code: "e4",
        error: "Internal Server Error"
    }
}


