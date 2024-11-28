const Validator = require('fastest-validator');
const OperatorModel = require('../models/operator');
const jwt = require('jsonwebtoken');


async function OperatorRegister(req,res){
    
    const operator_id  = req.body.operator_id;
    const operator_name  = req.body.operator_name;
    const operator_phone_number = req.body.operator_phone_number;
    const operator_email_id= req.body.operator_email_id;
    const operator_country_name = req.body.operator_country_name;
    const operator_state_name = req.body.operator_state_name;
    const operator_city_name = req.body.operator_city_name;
    const landmark= req.body.landmark;
    const zipcode = req.body.zipcode;
    const number_of_cars = req.body.number_of_cars;
    const operator_rating = req.body.operator_rating;


    var photo = '';
    
    if(req.files && Object.keys(req.files).length != 0){
        if (req.files['operator_photo'].length != 0) {
            photo = req.files['operator_photo'][0].path;
        } 
    }
    

    const request_Operator_Data = {
        operator_name:operator_name,
        operator_phone_number:operator_phone_number,
        operator_email_id:operator_email_id,
        operator_country_name:operator_country_name,
        operator_state_name:operator_state_name,
        operator_city_name:operator_city_name,
        landmark:landmark,
        zipcode:zipcode,
        number_of_cars:number_of_cars,
        operator_rating:operator_rating,
       
    }

    const schema = {
        operator_name:{type:"string",optional:false},
        operator_phone_number:{type:"string",optional:false},
        operator_email_id:{type:"string",optional:false},
        operator_country_name:{type:"string",optional:false, convert:true},
        operator_state_name:{type:"string",optional:true},
        operator_city_name:{type:"string",optional:false},
        landmark:{type:"string",optional:true},
        zipcode:{type:"string",optional:true},
        number_of_cars:{type:"string",optional:false},
        operator_rating:{type:"string",optional:false}
       
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Operator_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    if(photo != ''){
        request_Operator_Data.operator_photo= photo;
    }

    console.log(operator_id);
    if(operator_id && operator_id != 'null' && operator_id != null){
		
    

        OperatorModel.findByIdAndUpdate({ _id: operator_id }, request_Operator_Data, { new: true }).then(updatedOperator => {
        if (!updatedOperator) {
            return res.status(500).json({
                message: "operator not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "operator updated",
                    result: updatedOperator,
                    status:1,
                });
                
            }
        })
        
    }else{
        const data = new OperatorModel(request_Operator_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }  
   
}


async function OperatorList(req,res){
    const result = await OperatorModel.find(); 
    if(result != ''){
        return res.status(200).json({
            message: " ",
            result: result,
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

async function OperatorListById(req,res){
    const id = req.params.id;
    const result = await OperatorModel.findById(id); 
    if(result != ''){
       return res.status(200).json({
            message: " ",
            result: result,
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

async function OperatorDelete(req,res){
    const id = req.params.id;
    const result = await OperatorModel.findByIdAndDelete(id); 
    if (!result) {
       return res.status(403).json({
            message: "Data not found",
            status:0
        });
    }else{
        return res.status(200).json({
            message: "Record Deleted Successfull",
            result: result,
            status:1
        });
    }
    
}


module.exports = {
    OperatorRegister,OperatorList,OperatorListById,OperatorDelete
}