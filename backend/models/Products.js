const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category',
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{
        type: String, 
        required: true,
    }],
    colors: [{
        name: {
            type: String, 
            required: true,
        },
    }],
    sizes: [{
        name: {
            type: String, 
            required: true,
        },
        instoke: {
            type: Boolean, 
            required: true,
            default: true,
        },
    }],
    description: {
        type: String,
        required: true,
    },
    highlights: {
        type: [String], 
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    popular: {
        type: Boolean, 
        default: false, 
    },
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);
