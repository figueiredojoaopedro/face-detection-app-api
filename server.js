const e = require('express');
const express = require('express');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        },        {
            id: '123',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/sigin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json("success mate!");
    }
    else {
        res.status(400).json('error logging in');
    }
    })

app.listen(3000, () =>{
    console.log("app is running on port 3000");
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/