const sidebar = require('./sidebar.json')
module.exports = {
    title: 'xxred\'s notes',
    description: '记录学习过程，收集学习资源',
    dest: 'vuepress',
    serviceWorker: true,
    locales: {
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    head: [
        ['link', {
            rel: 'icon',
            href: `/logo.png`
        }],
        ['link', {
            rel: 'manifest',
            href: '/manifest.json'
        }],
        ['meta', {
            name: 'theme-color',
            content: '#3ab1ff'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ['link', {
            rel: 'apple-touch-icon',
            href: `/logo.jpg`
        }],
        // ['link', {
        //     rel: 'mask-icon',
        //     href: '/icons/safari-pinned-tab.svg',
        //     color: '#3ab1ff'
        // }],
        ['meta', {
            name: 'msapplication-TileImage',
            content: '/logo.jpg'
        }],
        ['meta', {
            name: 'msapplication-TileColor',
            content: '#000000'
        }]
    ],
    lastUpdated: '上次更新',
    // theme: 'vue',
    themeConfig: {
        repo: 'xxred/xxred.github.io',
        repoLabel: '查看源码',
        editLinks: true,
        editLinkText: '帮助我们改善此页面！',
        docsDir: 'docs',
        lastUpdated: '上次更新',
        next: true,
        nav: [{
                text: '.Net Core',
                items: [{
                    text: '.Net Core',
                    link: '/dotnet-core/dotnetcore/'
                }, {
                    text: 'Asp.Net Core',
                    link: '/dotnet-core/aspnetcore/'
                }]
            },
            {
                text: '前端',
                items: [{
                    text: 'nodejs',
                    link: '/front-end/nodejs/'
                }, {
                    text: 'vuejs',
                    link: '/front-end/vuejs/'
                },{
                      text: 'iview',
                        link: '/front-end/iview/'
                }]
            },
            {
                text: '编程语言',
                items: [{
                    text: 'C#',
                    link: '/programing-language/csharp/'
                }, {
                    text: 'PowerShell',
                    link: '/programing-language/powershell/'
                }]
            },
            {
                text: '编程基础',
                items: [{
                    text: '字符编码',
                    link: '/character-coding/'
                }]
            },
            {
                text: '操作系统',
                items: [{
                    text: 'Windows',
                    link: '/operating-system/windows/'
                }, {
                    text: 'Linux',
                    link: '/operating-system/linux/'
                }]
            },
            {
                text: '工具',
                items: [{
                    text: '开发工具',
                    items:[
                        {
                            text: 'Visual Studio',
                    link: '/dev-tool/visualstudio/'
                        },{
                            text: 'Visual Studio Code',
                            link: '/dev-tool/visualstudio-code/'
                        }
                    ]
                },{
                    text: '文档工具',
                    items:[
                        {
                            text:'DocFX',
                            link:'/tools/doc/docfx/'
                        }
                    ]
                }]
            },
            {
                text: '资源收集',
                link: '/awesome-collection/'
            }
        ],
        sidebar: sidebar
    }
}