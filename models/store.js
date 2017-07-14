const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // tell mongoose use Promise provide by node.js
const slug = require('slugs'); //convert them to URL-friendly chars


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a store name!"
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});
storeSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Store', storeSchema);