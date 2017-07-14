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
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: 'String',
            required: 'You must supply an address!'
        }
    }
});
storeSchema.pre('save', async function (next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    
    //find other stores that have a slug of ...
    const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$))$`, 'i');
    const storeWithSlug = await this.constructor.find({slug: slugRegex});

    if(storeWithSlug.length)
    {
        this.slug = `${this.slug}-${this.storeWithSlug.length + 1}`;
    }
    next();
});

module.exports = mongoose.model('Store', storeSchema);