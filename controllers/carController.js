const Validator = require('fastest-validator');
const CarModel = require('../models/car');
const jwt = require('jsonwebtoken');


async function CarRegister(req,res){
    const car_id  = req.body.car_id;
    const car_name  = req.body.car_name;
    const car_number = req.body.car_number;
    const car_model= req.body.car_model;
    const registration_date = req.body.registration_date;
    const car_color = req.body.car_color;
    
    const is_ac = req.body.is_ac;
    const is_bluetooth = req.body.is_bluetooth;
    const number_of_seats = req.body.number_of_seats;
    var photo = '';
    
    if(req.files && Object.keys(req.files).length != 0){
        if (req.files['photo'].length != 0) {
            photo = req.files['photo'][0].path;
        } 
    }
    const request_Car_Data = {
        car_name:car_name,
        car_number:car_number,
        car_model:car_model,
        registration_date:registration_date,
        car_color:car_color,
        is_ac:is_ac,
        is_bluetooth:is_bluetooth,
        number_of_seats:number_of_seats
    }

    const schema = {
        car_name:{type:"string",optional:false},
        car_number:{type:"string",optional:false},
        car_model:{type:"string",optional:false},
        registration_date:{type:"date",optional:false, convert:true},
        car_color:{type:"string",optional:true},
        is_ac:{type:"string",optional:true},
        is_bluetooth:{type:"string",optional:true},
        number_of_seats:{type:"string",optional:false}
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Car_Data,schema);
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }
    
    if(photo != ''){
        request_Car_Data.photo = photo;
    }

    if(car_id && car_id != 'null' && car_id != null){
        CarModel.findByIdAndUpdate({ _id: car_id }, request_Car_Data, { new: true }).then(updatedCar => {
        if (!updatedCar) {
            return res.status(500).json({
                message: "car not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "car updated",
                    result: updatedCar,
                    status:1,
                });
                
            }
        })
        
    }else{
        const data = new CarModel(request_Car_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
     
    

    
   
}

async function CarList(req,res){
    const result = await CarModel.find(); 
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

async function CarListById(req,res){
    const id = req.params.id;
    const result = await CarModel.findById(id); 
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

async function CarDelete(req,res){
    const id = req.params.id;
    const result = await CarModel.findByIdAndDelete(id); 
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
    CarRegister,CarList,CarListById,CarDelete
}