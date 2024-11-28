const Validator = require('fastest-validator');
const Model = require('../models/user');
const jwt = require('jsonwebtoken');

async function login(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const requestData = {
        username:username,
        password:password
    }

    const schema = {
        username:{type:"string",optional:false},
        password:{type:"string",optional:false}
    }

    const v = new Validator();
    const validatorResponse = v.validate(requestData,schema);
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }


    // const data = new Model({
    //     username:username,
    //     password: password
    // })
    // data.save();
    
    const result = await Model.find({username:username,password:password}); 
    if(result != ''){
        const userdata = { username: username,password:password };
        const access_token = jwt.sign(userdata, process.env.JWT_KEY);

        return res.status(200).json({
            message: "request received",
            result: result,
            access_token:access_token,
            status:1
        });
    }else{
        return res.status(403).json({
            message: "Record Not Found",
            result: [],
            status:0
        });
    }

    
   
}

module.exports = {
    login
    
}