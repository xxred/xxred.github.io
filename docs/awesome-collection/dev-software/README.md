# 常用开发软件

- 收集日常开发可能碰到的开发软件

|                      软件名称                      |                      最新版下载                      |                          更多版本（镜像）地址                          |
| :------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------------------------: |
| <a href="https://git-scm.com/">git-for-windows</a> | <a href="javascript:;" v-on:click="git">点击下载</a> | <a href="https://npm.taobao.org/mirrors/git-for-windows/">淘宝镜像</a> |

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
              let ver = data.tag_name.replace('v','Git-').replace('.windows','')
              let fileName = ver + '-64-bit.exe'
              let downloadUrl = `https://npm.taobao.org/mirrors/git-for-windows/${data.tag_name}/${fileName}`
              console.log(downloadUrl)
              this.download(downloadUrl)
            })
      },
      download(url){
          document.location = url
      }
  },
  mounted () {
  }
}
</script>
