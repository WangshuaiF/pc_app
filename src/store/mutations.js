export let state={
    userlist:{}
}
export let getters={
    userlist(state){
        return state.userlist
    }
}
export let mutations={
    changeUserList(state,arr){
        state.userlist=arr
    }
}