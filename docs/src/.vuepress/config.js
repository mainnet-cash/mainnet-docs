const {description} = require('../../package')

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'mainnet',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        nav: [
            {
                text: 'Tutorial',
                link: '/tutorial/',
            },
            // {
            //   text: 'Config',
            //   link: '/config/'
            // },
            {
              text: 'Original proposal',
              link: '/original.html'
            }
        ],
        sidebar: [
            {
                title: 'Programming Bitcoin Cash',
                path: '',
                collapsable: false,
                children: [
                    '/tutorial/',
                    '/tutorial/rest.html',
                    '/tutorial/smartbch.html',
                    '/tutorial/smartbch-rest.html',
                    '/tutorial/other-languages.html',
                    '/tutorial/running-rest.html',
                    '/tutorial/shipping-mainnet.html',
                ]
            },
            {
                title: 'Bitcoin Cash',
                path: '',
                collapsable: false,
                children: [
                    '/for-developers.html',
                    '/people.html',
                    '/projects.html',
                    '/node.html',
                ]
            },
            {
                title: 'Additional',
                path: '',
                collapsable: false,
                children: [
                    '/developing_mainnet.html',
                    '/original.html',
                    '/chips.html'
                ]
            },
        ]
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}
