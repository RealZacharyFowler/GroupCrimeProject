const mongoose = require("mongoose");

const CrimeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Type of crime is required"],
        minLength: [3, "Input must be at least 3 characters"],
    },
    status: {
        type: String,
        enum: ['In Progress', 'Investigating', 'Resolved'],
        required: [true, "Please select status of crime"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
        minLength: [3, "City must be at least 3 characters"],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps:true});


module.exports = mongoose.model("Crime", CrimeSchema);