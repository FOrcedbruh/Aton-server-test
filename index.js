const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./auth/authRouter');
const Client = require('./models/Client');
const User = require('./models/User');



dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());

// routers

app.use('/auth', authRouter)


const PORT = process.env.PORT || 3000;
const db_url = process.env.DB_URL;

app.get('/', (req, res) => {
    res.json({
        message: 'hello!'
    })
})


app.post('/clients', async (req, res) => {

    const { resFullname } = req.body;

    const allClients = await Client.find();

    if (resFullname) {

        const clients = allClients.filter(client => client.resFullname === resFullname);

        return res.status(200).json(clients);
    }

    return res.status(200).json(allClients);
});

app.get('/users', async (req, res) => {

    const users = await User.find();

    return res.status(200).json(users);
})

app.post('/editStatus', async (req, res) => {
    const {_id, status} = req.body;

    await Client.findByIdAndUpdate(_id, { status: status});

    res.status(200).json({
        message: 'Статус успешно обновлен'
    })
})


const start = async  () => {
    try {
        mongoose.connect(db_url).then(() => {
            console.log('Подключено к дб')
        })
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();