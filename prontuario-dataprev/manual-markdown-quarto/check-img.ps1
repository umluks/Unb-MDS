Add-Type -AssemblyName System.Drawing

$filePath = Join-Path $PSScriptRoot "img\login-no-sistema-1.png"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.R -lt 250 -or $pixel.G -lt 250 -or $pixel.B -lt 250) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounding box: X=$minX to $maxX, Y=$minY to $maxY"
Write-Host "Content size: Width=$($maxX - $minX + 1), Height=$($maxY - $minY + 1)"
$bmp.Dispose()
