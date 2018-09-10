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
        sidebar: {
            '/character-coding/': [{
                title: '字符编码',
                children: [
                    '字符编码.md'
                ]
            }],
            '/dev-tool/visualstudio/': [{
                title: 'visualstudio',
                children: [
                    '',
                    'MSBuildTasks.md',
                    'MsBuild属性元数据.md',
                    '多平台项目合并成单项目.md',
                    '折叠代码.md',
                    '调试.md'
                ]
            }],
            '/dev-tool/visualstudio-code/': [{
                title: 'visualstudio-code',
                children: [
                    'linux上的使用.md',
                    '插件.md',
                    '设置.md'
                ]
            }],
            '/dotnet-core/aspnetcore/': [{
                title: 'Asp.Net Core',
                children: [
                    'asp.net core移植',
                    'razor-page-library',
                    '搭建基于Asp.NetCore-Vue的SPA项目',
                    '坑坑更健康',
                    '路由'
                ]
            }],
            '/dotnet-core/dotnetcore/': [{
                title: '.Net Core',
                children: [
                    'dotnet-cli常用命令',
                    'linux下安装',
                    'window安装dotnet',
                    '常用api',
                    '版本问题'
                ]
            }],
            '/awesome-collection/': [{
                title: '资源集合',
                children: [
                    'architect-awesome/'
                ]
            }],
            '/front-end/iview/': [{
                title: 'IView',
                children: [
                    '注意事项和技巧',
                    '高级组件'
                ]
            }],
            '/front-end/nodejs/': [{
                title: 'nodejs',
                children: [
                    ''
                ]
            }],
            '/front-end/vuejs/': [{
                title: 'vuejs',
                children: [
                    'vue项目从零搭建.md'
                ]
            }],
            '/front-end/': [{
                title: 'front-end',
                children: [
                    '各种异常.md'
                ]
            }],
            '/operating-system/linux/': [{
                title: 'linux',
                children: [
                    'linux上常用命令.md',
                    '通用常用命令.md'
                ]
            }],
            '/operating-system/windows/': [{
                title: 'windows',
                children: [
                    'WinServer2008r2-IIS.Administration.md',
                    '添加右键快捷方式.md',
                    '自动化.md'
                ]
            }],
            '/programing-language/csharp/': [{
                title: 'csharp',
                children: [
                    '反射.md',
                    '编程技巧.md',
                    '静态构造函数.md'
                ]
            }],
            '/programing-language/powershell/': [{
                title: 'powershell',
                children: [
                    '入门.md',
                    '初识powershell、nuget powershell 调试.md',
                    '问题.md'
                ]
            }],
            '/tools/doc/docfx/': [{
                title: 'DocFX',
                children: [
                    '',
                ]
            }]
        }
    }
}