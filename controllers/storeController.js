const mongoose = require('mongoose');
const jimp = require('jimp');
const uuid = require('uuid');
const multer = require('multer');
const multerOptions = {
    storage: multer.memoryStorage(),
    filterFilter: function (req, file, next) {
        const isPhote = file.mimetype.startsWith('image/');
        if (isPhote) {
            next(null, ture);
        } else {
            next({
                message: "That filetype is not allowed!"
            }, false);
        }
    }
}
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addStore = (req, res) => {
    res.render('editStore', {
        title: 'Add Store'
    });
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    //console.log(req.file);
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;

    //resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`)
    // After written the photo to file system, keep going.
    next();
}


exports.createStore = async(req, res) => {
    // Relationship between user and store
    req.body.author = req.user._id;

    const store = new Store(req.body);
    await store.save();
    req.flash("success", `Successfully created ${store.name}. Care to leave a review?`); // type and message
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async(req, res) => {
    const stores = await Store.find();

    res.render('stores', {
        title: 'Stores',
        stores: stores
    });
};

const confirmOwner = (store, user) => {
    if (!store.author.equals(user._id)) {
        throw Error('You must own a store in order to edit it!');
    }
};


exports.editStore = async(req, res) => {
    // 1. find the store 
    const store = await Store.findOne({
        _id: req.params.id
    });
    // 2. confirm they are the owner of the store
    confirmOwner(store, req.user);

    // 3. Render out the edit form so the user can update their store
    res.render('editStore', {
        title: `Edit ${store.name}`,
        store
    });
};

exports.updateStore = async(req, res) => {
    // set the location data to be a point
    req.body.location.type = 'Point';
    const store = await Store.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true, //return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully update <strong> ${store.name} <strong>. 
                            <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/stores/${store._id}/edit`);
};


exports.getStoreBySlug = async(req, res, next) => {
    //res.json(req.params)
    const store = await Store.findOne({
        slug: req.params.slug
    }).populate('author'); // populate user data related to the store.

    if (!store)
        return next(); // go to errorHandlers.notFound
    res.render('store', {
        title: store.name,
        store
    });
};

// Multiple query
exports.getStoresByTag = async(req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || {
        $exists: true
    };

    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({
        tags: tagQuery
    });

    // destructure the result 
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    res.render('tags', {
        tag,
        title: 'Tags',
        tags,
        stores
    });
}