const express=require('express')
const router=express.Router()
const session=require('express-session');
const cookieParser=require('cookie-parser')
const {check,result}=require('express-validator');
const helmet=require('helmet')
const cors=require('cors');
const compression=require('express-compression');
const morgan=require('morgan')
router.use(session({
    secret:"fhrgfgrfrty84fwir767",
    resave:false,
saveUninitialized:false
}))
router.use(cookieParser())
router.use (helmet())
router.use(cors())
router.use(compression())
router.use(morgan('dev'))
// router.get('/',(req,res)=>{
//     res.send("Hello Word")
// })
router.get(`/greet/:name`,(req,res)=>{
    let name=req.params.name;
    res.send(`Hello ${name}`)
})
router.get('/echo/:message',(req,res)=>{
    let message=req.params.message
    res.send(message)
})
router.get('/data',(req,res)=>{
    res.json(require('../data.json'))
})
router.post('/info',(req,res)=>{
    let json=req.body
    res.json(json)
    //in postman test good
})
// router.get('/',(req,res)=>{
//   req.session.username="John";
// res.send("session variable 'username' is set")
// })
// router.get('/session',(req,res)=>{
//     let username=req.session.username;
//     res.send(`Hello ${username}`)
//     console.log(req.session)
// })
router.get('/',(req,res)=>{
    res.cookie('username',"john")
    res.send("cookies is set")
})
router.get('/cookie',(req,res)=>{
    let username=req.cookies.username;
    res.send("Hello " + username)
})
router.post('/register',[
    check('email').isEmail().withMessage('invalid email address')
],(req,res)=>{
const error=result(req);
if (!error.isEmpty()) {
    res.status(404).send('invalid registration')
}
else res.send('successfully validated')
})
router.get('/helmet',(req,res)=>{
    res.send("Hello world")
    console.log(helmet)
})
router.get('/cors',(req,res)=>{
    res.send('This is cors enabled in all origin')
    console.log(cors)
})
router.get('/compression',(req,res)=>{
    res.send('hello world')
    console.log(compression)
})
router.get('/morgan',(req,res)=>{
res.send("success")
console.log(morgan)
    
})


module.exports=router