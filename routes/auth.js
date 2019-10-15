const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.use((req, res, next)=>{
    if('user' in req.session){
        res.locals.user = req.session.user
        res.locals.role = req.session.role
    }
    return next()
})

router.get('/change-role/:role', (req, res)=>{
    if('user' in req.session){
        if(req.session.user.roles.indexOf(req.params.role) >= 0){
            req.session.role = req.params.role
        }
    }
    res.redirect('/')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


router.post('/login', async(req, res)=>{
    
    const user = await User.findOne({username: req.body.username})

    if(!user){
        req.session.destroy()
        return res.redirect('/login')
    }
    
    const isValid = await user.checkPass(req.body.password)
    
    if(isValid){
        req.session.user = user
        req.session.role = user.roles[0]
        return res.redirect('/restrito/noticias')
    }else{
        req.session.destroy()
        return res.redirect('/login')
    }
    
    // console.log(isValid)
    // res.send({...user._doc, isValid: isValid})
})

module.exports = router
