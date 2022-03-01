const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
var User = require('../models/user')


router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/login', actions.login)


router.get('/getUser', actions.getUserEmail);



router.get('/getUser/:id', function (req, res){
    User.findById(req.params.id)
    .then(userFound => {
        if(!userFound) { return res.status(404).end();
        }
         return res.status(200).json(userFound);   
    })
    .catch(err => next(err))
})

router.get('/getUser', function(req, res){
    User.find({}, function(err, users){
        if(err){
            res.send('sads')
            next()
        }
        res.json(users)
    })
})

// router.post('/auth', actions.auth)


router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            res.json(user)   
        }
    })
})


//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

module.exports = router
