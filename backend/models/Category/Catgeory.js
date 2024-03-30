const mongoose = require("mongoose");

// create the category schema
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;