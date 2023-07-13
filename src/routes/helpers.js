function createId(data){
    let newId = data[data.length-1].id + 1;
    return newId;
}

function checkValidId(param){
    const regx = new RegExp(/^\d+$/);
    return regx.test(param);
}

export {createId, checkValidId}