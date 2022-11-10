import Handlebars from 'handlebars/dist/handlebars.runtime'
import loginLayout from '../hbs/layouts/login-layout.hbs'
import authTemplate from '../hbs/views/auth.hbs'
import registTemplate from '../hbs/views/regist.hbs'


const PAGES = {
    'auth': authTemplate,
    'regist': registTemplate
}

function renderPage(name) {
    const root = document.querySelector("#app"),
    template = PAGES[name]

    root.innerHTML = template()
}

window.renderPage = renderPage

document.addEventListener('DOMContentLoaded', () => {
    Handlebars.registerPartial('loginLayout', loginLayout);

    setTimeout(renderPage, 0, 'auth')
})