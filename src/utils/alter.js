import Vue from 'vue';
let Alter =new Vue();


// 成功
export let successalter=(msg)=>{
    Alter.$message({
        message: msg,
        type: "success"
    });
}   
// 错误
export let erroralter=(msg)=>{
    Alter.$message({
        message: msg,
        type: "warning"
    });
}   