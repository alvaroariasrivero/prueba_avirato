const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Client = require('../models/client');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const saltRounds = 10;

const signUpClient = async(req, res) => {
    let data;
    try {
        const {nombre, telefono, email, fechaNacimiento, password, id} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        if(regex.validateEmail(email) && regex.validatePassword(password)){
            data = await Client.create({'email': email, 'password': hashPassword, 'nombre': nombre, 'telefono': telefono, 'fechaNacimiento': fechaNacimiento, 'id': id});
            res.status(201).json(data);
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
        }
    } catch (err) {
        console.log('Error:', err);
    }
};

const getAllClients = async(req, res) => {
    let data;
    try {
        data = await Client.find({}, '-_id -__v');
        res.status(201).json(data);
    } catch (err) {
        console.log('Error:', err);
    }
};

const getClientById = async (req,res) => {
    let data;
    try{
        data = await Client.findOne({'id': req.params.id}, '-_id -__v');
        res.status(200).json(data);
    }catch(err){
        res.status(400).json({"error":err})
    } 
};

const getOneClient = async(req, res) => {
    let data;
    try {
        console.log(req.params.filter);
        data = await Client.findOne({$search: req.pamas.filter });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const updateClientByEmail = async(req, res) => {
    const {email, password, nombre, telefono, fechaNacimiento, id} = req.body
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let data;
    try {
        data = await Client.findOneAndUpdate({'email': req.params.email}, {'email': email, 'password': hashPassword, 'nombre': nombre, 'telefono': telefono, 'fechaNacimiento': fechaNacimiento, 'id': id})
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const loginClient = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body
        data = await Client.findOne({'email': email}, '-_id -__v');
        if(!data){
            res.status(400).json({ msg: 'Incorrect user or password'}); 
        }else{
            const match = await bcrypt.compare(password, data.password);
            if(match){
                const {email, username} = data;
                const userForToken = {
                    email: email,
                    username: username,
                };
                const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
                res
                .status(200)
                .json({
                    msg:'Correct authentication',
                    token: token});
            }else {
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
        }        
    } catch (err) {
        console.log('Error:', err);
    }
};

const deleteOneClient = async(req, res) => {
    let data;
    try {
        data = await Client.findOneAndDelete({'email': req.body.email});
    } catch (err) {
        console.log('Error:', err);
    }
}

const user = {
    signUpClient,
    getAllClients,
    getClientById,
    getOneClient,
    updateClientByEmail,
    loginClient,
    deleteOneClient
};

module.exports = user;