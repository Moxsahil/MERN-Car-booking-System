const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"],
        },
        lastName : {
            type: String,
        }

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

    socketId: {
        type: String,
    },

    status : {
        type: String,
        default: "inactive",  
        enum : ["active", "inactive"],
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color name must be at least 3 characters long"],
        }, 
        vehicle_No : {
            type: String,
            required: true,
            minLength: [3, "vehicle no must be at least 8 characters long"],
        },
        capacity: {
            type: Number,
            required: true, 
            minLength: [1, "capacity must be at least 1"],
        },
        vehicleType : {
            type: String,
            required: true,
            enum: ["car","bus","motorcycle","auto"],
        }

    },

    location : {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password){ 
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel; 