##
    authController.js


## avatar
    layout.pug
        li.nav__item: a.nav__link(href="/account", class=(currentPath.startsWith('/account') ? 'nav__link--active' : ''))
                img.avatar(src=user.gravatar + 'd=retro')

    in user.js
        add virtual field "gravatar" for user


## Permission checking
    in authController.js
        exports.isLoggedIn = (req, res, next) => {

        });

    in index.js, add middleware to the router
        router.get('/add', authController.isLoggedIn, storeController.addStore);