import Handlebars from 'handlebars/dist/handlebars.runtime'
// - Layouts
import loginLayout from '../hbs/layouts/loginLayout.hbs'
import errorLayout from '../hbs/layouts/errorLayout.hbs'
import settingsLayout from '../hbs/layouts/settingsLayout.hbs'
import modalLayout from '../hbs/layouts/modalLayout.hbs'

// - Page Templates
import authTemplate from '../hbs/views/authView.hbs'
import registrationTemplate from '../hbs/views/registView.hbs'
import settingsView from '../hbs/views/settingsView.hbs'
import settingsEditView from '../hbs/views/settingsEditVIew.hbs'
import noPageTemplate from '../hbs/views/404.hbs'
import serverErrorTemplate from '../hbs/views/503.hbs'
import chatsTemplate from '../hbs/views/chatsView.hbs'

// - Modal Templates
import changePassword from '../hbs/modals/changePassword.hbs'

// - Partials
import defaultButton from '../hbs/partials/defaultButton.hbs'
import defaultLink from '../hbs/partials/defaultLink.hbs'
import routerLink from '../hbs/partials/routerLink.hbs'
import defaultInput from '../hbs/partials/defaultInput.hbs'
import reviewNav from '../hbs/partials/reviewNav.hbs'
import routerButton from '../hbs/partials/routerButton.hbs'

import '../styles/main.sass'


const LAYOUTS = {
    'loginLayout': loginLayout,
    'errorLayout': errorLayout,
    'settingsLayout': settingsLayout,
    'modalLayout': modalLayout
}

const PAGES = {
    'auth': authTemplate,
    'registration': registrationTemplate,
    'settings': settingsView,
    'settingsEdit': settingsEditView,
    'chats': chatsTemplate,
    '404': noPageTemplate,
    '503': serverErrorTemplate
}

const MODALS = {
    'changePassword': changePassword
}

const PARTIALS = {
    'defaultButton': defaultButton,
    'defaultLink': defaultLink,
    'routerLink': routerLink,
    'routerButton': routerButton,
    'defaultInput': defaultInput,
    'reviewNav': reviewNav
}

function registerPartials(groupObj = {}) {
    Object.entries(groupObj).forEach(([name, template ]) => {
        Handlebars.registerPartial(name, template);
    })
}

function renderPage(name) {
    const root = document.querySelector("#app")
    if (!root) return

    const template = PAGES[name]
    if (template) {
        root.innerHTML = template()
    } else {
        const errorTemplate = PAGES['404']
        if (errorTemplate) {
            root.innerHTML = errorTemplate()
        }
    }
}

function renderModal(name) {
    const root = document.querySelector("#app")
    if (!root) return

    let modalsContainer = root.querySelector('.modal-container')
    if (!modalsContainer) {
        modalsContainer = document.createElement('div')
        modalsContainer.classList.add('modal-container')
        root.append(modalsContainer)
    }

    const template = MODALS[name]
    if (template) {
        modalsContainer.innerHTML = template()
    }
}

function removeModal() {
    const modalsContainer = document.querySelector('.modal-container')
    if (!modalsContainer) return

    modalsContainer.innerHTML = ''
}

window.renderPage = renderPage
window.renderModal = renderModal
window.removeModal = removeModal

document.addEventListener('DOMContentLoaded', () => {
    registerPartials(LAYOUTS)
    registerPartials(PARTIALS)
    registerPartials(MODALS)

    setTimeout(renderPage, 0, 'auth')
})
