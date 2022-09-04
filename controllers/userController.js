const User = require('../database/models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Role = require('../database/models/role')

const register = async (req, res, next) => {
    try {
        let exitUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (exitUser) {
            res.status(400).json({
                status: 400,
                message: 'user already exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    phone: req.body.phone,
                    password: hashedPass,
                })
                await user.save((err,user) => {
                    if(err) {
                        res.status(500).json({message:err})
                    }
                    if(req.body.roles){
                        Role.find(
                            {
                                role:{$in: req.body.roles}
                            },(err,roles) => {
                                if(err){
                                    return res.status(500).send({message:err})
                                }
                                user.roles = roles.map(role => role._id)
                                user.save(err => {
                                    if(err){
                                        return res.status(500).send({message: err})
                                    }
                                    return res.json({
                                        message: 'User added successfully',
                                        data: user
                                    })
                                })
                            })
                    }
                })
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


const login = (req, res, next) => {
        var username = req.body.username
        var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result){
                        let token = jwt.sign({id:user.id, name:user.name, role: user.role,email: user.email}, process.env.secret, {expiresIn: '2d'})
                        res.json({
                            message: 'login successfull',
                            token,
                            role:user.role
                        })
                    } else {
                        res.json({
                            message: 'password does not match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'no user found'
                })
            }
        })
}


module.exports= {
    login, register
}