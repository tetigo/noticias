const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const session = require('express-session')
const User = require('./models/user')
const Noticia = require('./models/noticia')
const bodyParser = require('body-parser')

const restrito = require('./routes/restrito')
const noticias = require('./routes/noticias')
const admin = require('./routes/admin')
const auth = require('./routes/auth')
const pages = require('./routes/pages')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(session({
    secret: 'SuperSecret',
    name: 'LoginID',
    resave: false,
    saveUninitialized: false,
}))

app.use('/', auth)
app.use('/', pages)

app.use('/admin', admin)
app.use('/restrito', restrito)
app.use('/noticias', noticias)


const checkInitialUser  = async(admin_user, pass, roles) =>{
    try {
        const total = await User.countDocuments({username: admin_user})
        if(total === 0){
            const user = new User({
                username: admin_user,
                password: pass,
                roles: roles,
            })
            await user.save()
            console.log(colors.fg.Green, 'Admin User Created', colors.fg.White)
        }
        else
        console.log(colors.fg.Blue, 'Admin Creation Skipped', colors.fg.White)
        
    } catch (error) {
        throw new Error(colors.bg.Red, 'Erro Criando Usuario Admin', colors.bg.White)
    }

    // const noticia = new Noticia({
    //     title: 'Noticia Publica 01' + new Date().getTime(),
    //     content: 'Content',
    //     category: 'public',
    // })
    // await noticia.save()

    // const noticiap = new Noticia({
    //     title: 'Noticia Privada 01' + new Date().getTime(),
    //     content: 'Content',
    //     category: 'private',
    // })
    // await noticiap.save()
}

const createNotices  = async() =>{
    try {
        const noticia = new Noticia({
            title: 'Noticia Publica 01' + new Date().getTime(),
            content: 'Content',
            category: 'public',
        })
        await noticia.save()
        console.log(colors.fg.Green, 'Notices Created', colors.fg.White)

        const noticiap = new Noticia({
            title: 'Noticia Privada 01' + new Date().getTime(),
            content: 'Content',
            category: 'private',
        })
        await noticiap.save()
        console.log(colors.fg.Green, 'Notices Created', colors.fg.White)

    } catch (error) {
        throw new Error(colors.bg.Red, 'Erro Criando Noticias', colors.bg.White)
    }
}


const colors = require('./colors')

mongoose
.connect(mongo, {useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{
    const role1 = ['restrito', 'admin']
    checkInitialUser('tiago', '123', role1).catch(e=>{throw e})
    
    const role2 = ['restrito']
    checkInitialUser('user', '123', role2).catch(e=>{throw e})
    
    createNotices().catch(e=>{throw e})
    
    app.listen(port, (e)=>{
        if(e) 
        throw e
        else
        console.log(colors.fg.Green, 'listening....', colors.fg.White)
    })
})
.catch(e => {
    if(e.name === 'MongoNetworkError'){
        console.log(colors.bg.Red,'Ligue o Servidor MongoDB Cabeção!', colors.bg.Black)
    }else{
        console.log(e)
        process.exit()
    }
})



// const bcrypt = require('bcrypt')

// const getHash = async(loops, senha) =>{
//     try {
//         const salt = await bcrypt.genSalt(loops)
//         const gerada = await bcrypt.hash(senha, salt)
//         return gerada
//     } catch (error) {
//         return null        
//     }
// }
// getHash(10, '123')
// .then((r)=>{console.log('getHash--->>',r)})
// .catch((e)=>{console.log(e)})

// const usandoGetHash = async(loops, senha) =>{
//     const result = await getHash(loops, senha)
//     console.log('getHash$-->>',result)
    
// }

// usandoGetHash(10, '123')

// bcrypt.genSalt(10, (err, salt)=>{
//     if(!err){
//         console.log(salt)
//         bcrypt.hash('123', salt, (err, senha)=>{
//             if(!err){
//                 console.log('result---->>',senha)
//             }
//         })
//     }
// })


// bcrypt.genSalt(10)
// .then((salt)=>{
//     bcrypt.hash('123', salt)
//     .then(r=>console.log('r2-------->>', r))
//     .catch(e=>console.log(e))
// })
// .catch(e=>console.log(e))


// const User = require('./models/user')

// const user = new User({
//     username: 'tiago7',
//     password: '123'
// })

// user.save(()=>{
//     console.log('opa!!!')
// })





// User.count({username: 'tiago'})
// .then((total)=>{
//     console.log('Admin Cadastrado:', total)
//     if(total === 0){
//         const user = new User({
//             username: 'tiago',
//             password: '123',
//         })
//         user.save(()=>console.log('admin criado'))
//     }
// })
