const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');

// Parsing all the body into json
app.use(bodyParser.json());

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
    res.send(database.users);
})

// checking the sign in information and stuff
app.post('/sigin', (req, res) => {
    // Load hash from your password DB.
    bcrypt.compare("123", hash, function(err, res) {
    // res == true
    });
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        res.json("success mate!");
    }
    else {
        res.status(400).json('error logging in');
    }
})

// register stuff
app.post('/register', (req, res) => {
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    const {email, name, password} = req.body;
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    // always you have to make a response, bc it's a function and a function must have return.
    res.json(database.users[database.users.length-1]);// look that we put -1 bc the length method will return the length starting from 1, not from 0 as it's used by computer
})

app.get('/profile/:id',(req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('not found!');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('not found!');
    }
})




// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

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