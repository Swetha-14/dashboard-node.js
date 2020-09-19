import express from 'express';
import bodyParser from 'body-parser';

let db;
const MongoClient = require('mongodb').MongoClient;
const port = 8900;
const app= express();
const mongourl = 'mongodb://127.0.0.1:27017/';
const col_name = 'userlist';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

//get data from MongoDB to display on index page
app.get('/', (req, resp)=>{ 
    db.collection(col_name).find().toArray((err, result)=>{
        if(err) throw err;
        resp.render('index.ejs',{ data : result});
    });
});

//post(insert) data from the UI into MongoDB
app.post('/addData', (req, resp) => { 
    db.collection(col_name).insert(req.body, (err, result) => {
        if(err) throw err;
        console.log('data inserted');
    });
    resp.redirect('/');
});

//delete selected user in the UI from MongoDB Database
app.delete('/delete_user', (req, res)=>{ 
    db.collection(col_name).findOneAndDelete({"name":req.body.name}, (err, result) => {
        if(err) return res.send(500, err)
        res.send({message: 'success'});
    });
});

//find user in the MongoDB database by name
app.post('/find_by_name', (req, resp)=>{ 
    let name = req.body.name;
    db.collections(col_name).find({name : name}).toArray((err, result) => {
        if(err) throw err;
        resp.send(result)
    });
});

//update user record from the UI into the MongoDB Database
app.put('/update_user', (req, res) => { 
    db.collection(col_name).findOneAndUpdate({"name": req.body.name}, {
        $set:{
            name: req.body.name,
            email:req.body.email,
            phone:req.body.phone
        }
    },(err, result) => {
        if(err) return res.send(err);
        res.send(result)
    });
});

// Opening Add User page
app.get('/adduser', (req, res)=>{
    res.render('admin'); // display the admin.ejs view
});

//connect to MongoDB Database
MongoClient.connect(mongourl, { useNewUrlParser:true, useUnifiedTopology: true}, (err, client)=>{ 
    if(err) throw err;
    db = client.db('march_dashboard');
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port} !`);
    });
});