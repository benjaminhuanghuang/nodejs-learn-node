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
    // 2. 

    // 3.
    res.render('editStore', {title:`Edit ${store.name}`, store:  });
};

exports.updateStore = async (req, res) => {
    const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,  //return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully update <strong> ${store.name} <strong>. 
                            <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/stores/${store._id}/edit`);
};