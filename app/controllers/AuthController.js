const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const User = require('../models/user')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
    register (req, res) {
        try {
            var user = new User();
                user.email = req.body.email;
                user.password = user.generateHash(req.body.password);

                user.save().then(
                    user => {
                        const userJson = user.toJSON()
                        res.send({
                            user: userJson,
                            token: jwtSignUser(userJson)
                        })
                    },
                    err => {
                        res.status(400).send({
                            error: 'This email account is already in use.'
                        })
                    }
                )
        
        } catch (err) {
        res.status(500).send({
            error: 'Try again later'
        })
        }
    },

    login (req, res) {
        try {
            const {email, password} = req.body
                User.findOne({email: email}, (err, user) => {
                
                    if (!user) {
                        return res.status(403).send({
                            error: 'The login or password is incorrect'
                        })
                    }

                    const isPasswordValid = user.validPassword(password)
                    if(!isPasswordValid) {
                        return res.status(403).send({
                            error: 'The login or password is incorrect'
                        })
                    }
        
                    const userJson = user.toJSON()
                    res.send({
                        user: userJson,
                        token: jwtSignUser(userJson)
                    })
                })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}
