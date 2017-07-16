##
    authController.js


## avatar
    layout.pug
        li.nav__item: a.nav__link(href="/account", class=(currentPath.startsWith('/account') ? 'nav__link--active' : ''))
                img.avatar(src=user.gravatar + 'd=retro')