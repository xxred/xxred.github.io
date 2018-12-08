
$powershell = $env:windir + "\System32\WindowsPowerShell\v1.0\powershell.exe"
$cmds = "choco upgrade googlechrome 7zip.install git nodejs.install sourcetree tim -y"
$ArgumentList = '-NoProfile -InputFormat None -ExecutionPolicy Bypass -Command ' + $cmds + ';  Read-Host ''按回车键退出'' '
Write-Host $ArgumentList
# Read-Host "确定要执行吗，按回车确认执行：" $cmds

Start-Process $powershell -ArgumentList $ArgumentList -Verb RunAs