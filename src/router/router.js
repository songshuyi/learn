import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = resolve => require(['@/container/Index.vue'], resolve)
const Content = resolve => require(['@/container/Content.vue'], resolve)

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/content/:zid/:fzid',
            component: Content
        }
    ]
})

router.beforeEach((to, from, next) => {
    setTitle(to.meta.title)
    next()
})

function setTitle(title) {
    document.title = title
    // let mobile = navigator.userAgent.toLowerCase()
    // if (/iphone|ipad|ipod/.test(mobile)) {
    //     let iframe = document.createElement('iframe')
    //     iframe.style.display = 'none'
    //     iframe.setAttribute('src', '/static/favicon.ico')
    //     let iframeCallback = function () {
    //         setTimeout(function () {
    //             iframe.removeEventListener('load', iframeCallback)
    //             document.body.removeChild(iframe)
    //         }, 0)
    //     }
    //     iframe.addEventListener('load', iframeCallback)
    //     document.body.appendChild(iframe)
    // }
}
export default router
