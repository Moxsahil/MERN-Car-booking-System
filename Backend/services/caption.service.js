const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({firstName, lastName, email, password, color, vehicle_No, capacity, vehicleType}) => {
    if(!firstName || !email || !password || !color || !vehicle_No || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
        fullName : {
            firstName,
            lastName
        },
        email,
        password,
        vehicle : {
            color,
            vehicle_No,
            capacity,
            vehicleType
        }
    });
    return captain;
}

