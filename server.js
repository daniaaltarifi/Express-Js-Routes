const express=require("express");
const app=express();
app.use(express.json())

const routing=require('./routes/routerFile');
const session = require("express-session");
let port=7777;
app.use('/',routing)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})