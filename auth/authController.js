const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generate_jwt = (_id, res) => {

    const secret = process.env.JWT_SECRET;

    const payload = {
        _id
    }

    const token = jwt.sign(payload, secret, { expiresIn: '15d' })

    return res.cookie('jwt', token,
        {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }
    )
}



class controller {
    async registration(req, res) {
        try {
            const { login, password, fullname } = req.body;

            const candidate = await User.findOne({login});

            if (candidate) {
                return res.status(400).json({
                    message: `Пользователь ${login} уже существует`
                })
            }

            const hashPassowrd = bcrypt.hashSync(password, 8);

            const newUser = new User({
                login,
                password: hashPassowrd,
                fullname
            });

            await newUser.save();

            await generate_jwt(newUser._id, res);


            return res.status(200).json({
                fullname,
                login,
            })

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async login(req, res) {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({login});

            if (!user) {
                return res.status(400).json({
                    message: `Пользователя ${login} не существует`
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    message: 'Неверный пароль'
                })
            }

            await generate_jwt(user._id, res);

            return res.status(200).json({
                fullname: user.fullname,
                login: user.login
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Ошбка на сервере'
            })
        }
    }
    async logout(req, res) {
        try {
            res.cookie('jwt', '', {
                maxAge: ''
            });

            res.status(200).json({
                message: 'Успешный выход из аккаунта'
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Ошибка на сервере'
            })
        }
    }
}


module.exports = new controller();