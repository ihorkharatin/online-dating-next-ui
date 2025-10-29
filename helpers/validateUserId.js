export function validateUserId(userId=''){
    const index = userId.lastIndexOf('_');
    if(index>=0){
        return userId.slice(0,index);
    }else{
        return userId;
    }
}