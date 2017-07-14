const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addStore = (req, res) => {
    res.render('editStore', {
        title: 'Add Store'
    });
}

exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save();
    req.flash("success", `Successfully created ${store.name}. Care to leave a review?`);  // type and message
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    const stores = await Store.find();

    res.render('stores', {title: 'Stores', stores: stores});
};

exports.editStore = async (req, res) => {
    // 1. find the store 
    const store = await Store.findOne({_id:req.params.id});
     // 2. confirm they are the owner of the store
    // TODO
    // 3. Render out the edit form so the user can update their store
    res.render('editStore', {title:`Edit ${store.name}`, store});
};

exports.updateStore = async (req, res) => {
    // set the location data to be a point
    req.body.location.type = 'Point';
    const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,  //return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully update <strong> ${store.name} <strong>. 
                            <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/stores/${store._id}/edit`);
};


exports.getStoreBySlug = async (req, res, next) => {
    //res.json(req.params)
    const store = await Store.findOne({slug:req.params.slug});
    if(!store)
        return next(); // go to errorHandlers.notFound
    res.render('store', {title:store.name, store});
};

