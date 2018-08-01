module.exports = {
    title:'xxred\'s notes',
    description:'记录学习，收集学习资源',
    dest:'vuepress',
    serviceWorker:true,
    lastUpdated:'上次更新',
    themeConfig:{
        repo:'xxred/xxred.github.io',
        repoLabel: '查看源码',        
        editLinks: true,
        editLinkText: '帮助我们改善此页面！',
        docsDir: 'docs',
        lastUpdated:'上次更新',
        nav:[
            { text:'DotNetCore',link:'/dotnet-core/DotNetCore/'}
        ],
        sidebar: {
            '/dotnet-core/DotNetCore/':[{
                title:'DotNetCore',
                collapsable: true,
                children:[
                    '',
                    'dotnet-cli常用命令',
                    'linux下安装',
                    'window安装dotnet',
                    '常用api',
                    '版本问题'
                ]
            }]
        }
    }
}