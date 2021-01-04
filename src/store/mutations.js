export let state={
    userlist:sessionStorage.getItem("userlist")?JSON.parse(sessionStorage.getItem("userlist")):{}
    // userlist:{}
}
export let getters={
    userlist(state){
        return state.userlist
    }
}
export let mutations={
    changeUserList(state,obj){
        state.userlist=obj
        if(obj.username){
            sessionStorage.setItem("userlist",JSON.stringify(obj));
        }else{
            sessionStorage.removeItem('userlist')
        }
    }
}