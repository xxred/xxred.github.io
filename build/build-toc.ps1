Write-Host "********************generate sidebar start!***********************"

$targetDir = $PSScriptRoot + "/../docs/"
$buildPath = [System.IO.DirectoryInfo]::new($targetDir).FullName

$fileInfos = Get-ChildItem -Path $buildPath -Recurse -Include *.md -Exclude readme.md

$tocContent = @("")
$lastRPath = ""

$fileInfos | ForEach-Object{

    $fileInfo = $_
    $rPath = $fileInfo.DirectoryName.Replace($buildPath, "\").Replace("\","/")+"/"

    if (!($rPath -eq $lastRPath )) {

        if (!($lastRPath -eq "")) {
            $lastIndex = $tocContent.Length - 1
            $tocContent[$lastIndex] = $tocContent[$lastIndex].Replace("',","'")
            $tocContent =  $tocContent + "                ]" + "            }],"
        }

        $tocContent =  $tocContent + ("            '" + $rPath + "': [{") + ("                title: '" + $fileInfo.Directory.Name+"',") + "                children: ["
        $lastRPath = $rPath
    }

    $tocContent = $tocContent + ("                    '"+$fileInfo.Name+"',")
}

$tocContent =  $tocContent + "                ]" + "            }]"
$tocContent[0] = "        sidebar: {"
$tocContent  = $tocContent + ("        }")

$tocContent | Out-File -FilePath "temp-sidebar.json" -Encoding "utf8"

Write-Host "********************generate sidebar end!***********************"