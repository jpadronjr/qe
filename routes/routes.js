const { Router } = require("express");
const { MongoClient, ObjectId, ConnectionCheckedInEvent} = require("mongodb");

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'TercerioUsers';
const db = client.db(dbName);
const collection = db.collection('PlayerUsers');

exports.index = async (req, res) => {
    await client.connect();
    const findResult = await collection.find({}).toArray();
    //console.log("Found documents => ", findResult);
    client.close();
    res.render('index', {
        title: 'Player List',
        people: findResult
    });
};

exports.create =(req, res) => {
    res.render('create',{
        title: 'Add New Player'
    });
};

exports.createPerson = async (req, res) => {
    await client.connect();
    let person = {
        name: req.body.name
    };
    const insertResult = await collection.insertOne(person);
    client.close();
    //console.log(req.body.name + ' added');
    res.redirect('/');
};

