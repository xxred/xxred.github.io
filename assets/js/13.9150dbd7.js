(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{284:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"gitlab-runner-k8s-实现自动部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-runner-k8s-实现自动部署","aria-hidden":"true"}},[t._v("#")]),t._v(" gitlab-runner + k8s 实现自动部署")]),t._v(" "),s("ul",[s("li",[t._v("本次教程带来的是 gitlab-runner 上结合 k8s 实现自动部署，前面的教程都只是到打包程序，或者发布到 docker 镜像仓库，线上服务更新还是得手动更新重启。动手次数多了，还是觉得搞成自动部署比较妥。其实也挺简单的，接下来请看教程")])]),t._v(" "),s("h2",{attrs:{id:"过程说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过程说明","aria-hidden":"true"}},[t._v("#")]),t._v(" 过程说明")]),t._v(" "),s("ol",[s("li",[t._v("想要实现自动部署，就要借助工具"),s("code",[t._v("kubectl")]),t._v("，安装文档 https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux")]),t._v(" "),s("li",[t._v("将该工具集成到 alpine 镜像里面，当然也可以去 docker 仓库找个现成的")]),t._v(" "),s("li",[t._v("准备好 k8s 配置文件，使得"),s("code",[t._v("kubectl")]),t._v("工具能连接上 k8s 集群")]),t._v(" "),s("li",[t._v("准备部署的命令，这里又分两种情况，一种是删掉 deployment 重新部署 ，另一种是更新 deployment 以重启 pod。第一种需要准备 deployment 的配置文件，而每次更新只是拉取新的镜像而已，因此这里选择第二种。第二种实现的方式是添加一个时间变量，触发 pod 更新，以免系统认为配置文件不变而没有更新 pod")])]),t._v(" "),s("h2",{attrs:{id:"准备-kubectl-镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#准备-kubectl-镜像","aria-hidden":"true"}},[t._v("#")]),t._v(" 准备 kubectl 镜像")]),t._v(" "),s("div",{staticClass:"language-Dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("FROM alpine:latest\nARG KUBE_LATEST_VERSION=v1.15.3\n\n# RUN apk add --update ca-certificates\nRUN apk add --update -t deps curl\nRUN curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBE_LATEST_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl\nRUN chmod +x /usr/local/bin/kubectl\nRUN apk del --purge deps\nRUN rm /var/cache/apk/*\n")])])]),s("ul",[s("li",[t._v("Dockerfile 如上，构建命令"),s("code",[t._v('docker build --build-arg KUBE_LATEST_VERSION="v1.15.3" -t kubectl:v1.15.3 .')])])]),t._v(" "),s("h2",{attrs:{id:"准备-k8s-配置文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#准备-k8s-配置文件","aria-hidden":"true"}},[t._v("#")]),t._v(" 准备 k8s 配置文件")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("配置文件也可以集成在镜像里面，但是不太灵活，一旦配置有变或者有多个集群，镜像就得修改或者准备多个版本，因此通过 gitlab ci/cd 环境变量传递")])]),t._v(" "),s("li",[s("p",[t._v("首先取得配置信息，通过命令"),s("code",[t._v("kubectl config view --raw -o yaml")]),t._v("得到配置信息，复制到 gitlab 的 ci/cd 环境变量中")])]),t._v(" "),s("li",[s("p",[t._v("这里要注意的是，命令必须带参数"),s("code",[t._v("--raw")]),t._v("，为了将 certificate-authority-data 的值输出，否则只能看到 DATA+OMITTED。另外，环境变量必须选择文件类型，否则最后输出格式不对，导致"),s("code",[t._v("mapping values are not allowed in this context")]),t._v("错误，当然选择"),s("code",[t._v("-o json")]),t._v("，使用 json 格式，就不用担心格式问题")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs20190928180402.png",alt:" "}})]),t._v(" "),s("h2",{attrs:{id:"重新部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重新部署","aria-hidden":"true"}},[t._v("#")]),t._v(" 重新部署")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("kubectl patch deployment nginx  -p "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"spec":{"template":{"spec":{"containers":[{"name":"nginx","env":[{"name":"RESTART_TIME","value":"\'')]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("date")]),t._v(" +%s"),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"}]}]}}}}'")]),t._v("\n")])])]),s("ul",[s("li",[t._v("命令参考 https://v1-15.docs.kubernetes.io/docs/reference/generated/kubectl/kubectl-commands.html#patch")]),t._v(" "),s("li",[t._v("上面将 nginx 换成自己应用即可")])]),t._v(" "),s("h2",{attrs:{id:"完整-gitlab-ci-yml-文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#完整-gitlab-ci-yml-文件","aria-hidden":"true"}},[t._v("#")]),t._v(" 完整.gitlab-ci.yml 文件")]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stages")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" deploy\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("deploy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kubectl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v1.15.3\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" deploy\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" mkdir $HOME/.kube && cat $KUBE_CONFIG "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")]),t._v(" $HOME/.kube/config\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" kubectl patch deployment nginx "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("p '"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"spec"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"template"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"spec"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"containers"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"name"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"nginx"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v('"env"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v('"name"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RESTART_TIME"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v('"value"'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"'$(date +%s)'\"")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("'\n")])])]),s("ul",[s("li",[t._v("为了看起来简洁，就不展示 build 这个步骤了。变量$KUBE_CONFIG 实际上是个地址，因为 gitlab ci/cd 环境变量类型设置为 file")])]),t._v(" "),s("h2",{attrs:{id:"其他问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其他问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 其他问题")]),t._v(" "),s("ul",[s("li",[t._v("除了上面提到的一些问题，还有个就是网络问题。gitlab-runner 创建的这个基于"),s("code",[t._v("kubectl:v1.15.3")]),t._v("镜像的容器，是访问不到 k8s 集群的，因为不是在同一个网络，而 k8s 集群又没设置通过外网访问。这里的简单处理方法是在 gitlab-runner 配置中，将网络模式设置为 host，因为这里是 microk8s 创建的单节点集群，总之只要达到使他们处于同一个网络或者可以访问即可")])]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("runners"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("runners.docker"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v('\n    network_mode = "host"\n')])])]),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("ul",[s("li",[t._v("Gitlab CI 与 Kubernetes 的结合 https://www.qikqiak.com/post/gitlab-ci-k8s-cluster-feature/")]),t._v(" "),s("li",[t._v("K8S 重启 Deployment 的小技巧 https://chanjarster.github.io/post/k8s-restart-deployment/")])]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("ul",[s("li",[t._v("先把过程基本原理了解再去干活，会有事半功倍的效果，而且出了问题也比较好排查")])])])},[],!1,null,null,null);a.default=n.exports}}]);