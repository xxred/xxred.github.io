Write-Host "安装Chocolatey"
Write-Host "安装完之后搜索可用包 https://chocolatey.org/packages/"
Write-Host "可到 https://chocolatey.org/install 自行安装"

$chocolateyInstall = "H:\Program Files\Chocolatey"
$powershell = $env:windir + "\System32\WindowsPowerShell\v1.0\powershell.exe"
$installPathCmd = "$" + "env:ChocolateyInstall='" + $chocolateyInstall + "';"
$downloadCmd = "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) ;"
$configCmd = "choco config set cacheLocation 'H:\Cache\choco' ;"
$readHostCmd = "Read-Host '按回车键退出'"
$cmds = $installPathCmd + $downloadCmd + $configCmd + $readHostCmd
$ArgumentList = '-NoProfile -InputFormat None -ExecutionPolicy Bypass -Command ' + $cmds

Write-Host "Chocolatey安装目录" $chocolateyInstall
Read-Host "按回车键继续安装，否则关闭窗口退出"

Start-Process $powershell -ArgumentList $ArgumentList -Verb RunAs