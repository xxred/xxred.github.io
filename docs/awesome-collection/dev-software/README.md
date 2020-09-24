# 常用开发软件

- 收集日常开发可能碰到的开发软件

|                              软件名称                               |                                      最新版下载                                      |                                  更多版本（镜像）地址                                   | 简介 |
| :-----------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :--: |
| <a href="https://git-scm.com/" target="_blank" >git-for-windows</a> |                 <a href="javascript:;" v-on:click="git">点击下载</a>                 | <a href="https://npm.taobao.org/mirrors/git-for-windows/" target="_blank" >淘宝镜像</a> |      |
|                       <a href="" >fiddler</a>                       | <a href="https://api.getfiddler.com/win/latest" download="Fiddler.exe" >点击下载</a> |                                                                                         | 抓包 |
|                               python                                |                                                                                      |     <a href=“https://npm.taobao.org/mirrors/python/”  target="_blank">淘宝镜像</a>      |

<script>
import axios from 'axios'
export default {
  data() {
    return {
    }
  },
  methods:{
      git(){
          let url = 'https://api.github.com/repos/git-for-windows/git/releases/latest'
          axios.get(url).then(res=>{
              let data = res.data
              let ver = data.tag_name.replace('v','Git-').replace(/\.windows(\.\d)?/,'')
              let fileName = ver + '-64-bit.exe'
              let downloadUrl = `https://npm.taobao.org/mirrors/git-for-windows/${data.tag_name}/${fileName}`
              console.log(downloadUrl)
              this.download(downloadUrl)
            })
      },
      download(url){
          let aLink = document.createElement('a');
          aLink.href = url;
          aLink.click();
      }
  },
  mounted () {
  }
}
</script>
