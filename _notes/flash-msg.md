## Flash message 

    app.use((req, res, next) => {
        ...
        res.locals.flashes = req.flash();
        next();
    });

    req.flash("success", `Successfully created ${store.name}. Care to leave a review?`);  // type and message
   