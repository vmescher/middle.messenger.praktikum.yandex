import Handlebars from 'handlebars/dist/handlebars.runtime'
// - Layouts
import loginLayout from '../hbs/layouts/loginLayout.hbs'
import errorLayout from '../hbs/layouts/errorLayout.hbs'
import settingsLayout from '../hbs/layouts/settingsLayout.hbs'

// - Templates
import authTemplate from '../hbs/views/authView.hbs'
import registTemplate from '../hbs/views/registView.hbs'
import settingsView from '../hbs/views/settingsView.hbs'
import noPageTemplate from '../hbs/views/404.hbs'
import serverErrorTemplate from '../hbs/views/503.hbs'

// - Partials
import defaultButton from '../hbs/partials/defaultButton.hbs'
import defaultLink from '../hbs/partials/defaultLink.hbs'
import routerLink from '../hbs/partials/routerLink.hbs'
import defaultInput from '../hbs/partials/defaultInput.hbs'
import reviewNav from '../hbs/partials/reviewNav.hbs'

import '../styles/main.sass'


const LAYOUTS = {
    'loginLayout': loginLayout,
    'errorLayout': errorLayout,
    'settingsLayout': settingsLayout
}

const PAGES = {
    'auth': authTemplate,
    'registration': registTemplate,
    'settings': settingsView,
    '404': noPageTemplate,
    '503': serverErrorTemplate
}

const PARTIALS = {
    'defaultButton': defaultButton,
    'defaultLink': defaultLink,
    'routerLink': routerLink,
    'defaultInput': defaultInput,
    'reviewNav': reviewNav
}

function registerPartials(groupObj = {}) {
    Object.entries(groupObj).forEach(([name, template ]) => {
        Handlebars.registerPartial(name, template);
    })
}

function renderPage(name) {
    const root = document.querySelector("#app"),
    template = PAGES[name]

    root.innerHTML = template()
}

window.renderPage = renderPage

document.addEventListener('DOMContentLoaded', () => {
    registerPartials(LAYOUTS)
    registerPartials(PARTIALS)

    setTimeout(renderPage, 0, 'auth')
})