echo 'Hello World'

$files = Get-ChildItem ".\openfin\"

for ($i=0; $i -lt $files.Count; $i++) {
    $outfile = $files[$i].Name

    Start-Process -FilePath "openfin" -ArgumentList "--launch --config ./openfin/$outfile --allow-running-insecure-content"
}