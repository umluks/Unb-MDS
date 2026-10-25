# Script de Validacao de Sumario e Ancoras do Manual do Prontuario SUAS
# Execucao: powershell -ExecutionPolicy Bypass -File .agents/skills/suas-doc-review/scripts/validate-summary.ps1

param (
    [string]$CompletoMdPath = "c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto\completo.md",
    [string]$CompletoHtmlPath = "c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto\completo.html"
)

if (-not (Test-Path $CompletoMdPath)) {
    Write-Error "Arquivo completo.md nao encontrado em: $CompletoMdPath"
    exit 1
}

if (-not (Test-Path $CompletoHtmlPath)) {
    Write-Error "Arquivo completo.html nao encontrado em: $CompletoHtmlPath"
    exit 1
}

$mdText = [System.IO.File]::ReadAllText($CompletoMdPath, [System.Text.Encoding]::UTF8)
$htmlText = [System.IO.File]::ReadAllText($CompletoHtmlPath, [System.Text.Encoding]::UTF8)
$pages = $htmlText -split '<hr>'

Write-Output "=========================================================="
Write-Output "AUDITORIA DE SUMARIO E ANCORAS - PRONTUARIO SUAS (QUARTO)"
Write-Output "Total de paginas no HTML: $($pages.Length)"
Write-Output "=========================================================="

# Extrair bloco do Sumario do Markdown
$summaryMatch = [regex]::Match($mdText, '(?i)#\s*sum[a\u00E1\u00C1]rio[\s\S]*?(?=<div class="title"|---|\Z)')
if (-not $summaryMatch.Success) {
    Write-Error "Bloco '# Sumario' nao localizado no arquivo completo.md."
    exit 1
}

$summaryBlock = $summaryMatch.Value
$lines = $summaryBlock -split "`r?`n"

$totalItems = 0
$totalOk = 0
$totalMismatches = 0
$totalMissingAnchors = 0

foreach ($line in $lines) {
    if ($line -match '(?:\*\*)?\[(.*?)\]\(#(.*?)\)(?:\*\*)?\s*\[(\d+)\]\{\.n\}') {
        $totalItems++
        $title = $matches[1]
        $anchor = $matches[2]
        $expectedPage = [int]$matches[3]

        $foundPage = 0
        for ($i = 0; $i -lt $pages.Length; $i++) {
            if ($pages[$i] -match "id=[\`"']$anchor[\`"']") {
                $foundPage = $i + 1
                break
            }
        }

        if ($foundPage -eq 0) {
            $totalMissingAnchors++
            Write-Output " [ERRO - ANCORA INEXISTENTE] '$title' -> id='$anchor' nao encontrado no HTML (esperado na p. $expectedPage)"
        } elseif ($foundPage -ne $expectedPage) {
            $totalMismatches++
            Write-Output " [DIVERGENCIA DE PAGINA] '$title' (#$anchor) -> esperado p. $expectedPage, localizado na p. $foundPage"
        } else {
            $totalOk++
            Write-Output " [OK] '$title' -> p. $expectedPage (#$anchor)"
        }
    }
}

Write-Output "----------------------------------------------------------"
Write-Output "RESUMO DA AUDITORIA:"
Write-Output "Total de itens no Sumario : $totalItems"
Write-Output "Itens validados com sucesso: $totalOk"
Write-Output "Divergencias de pagina     : $totalMismatches"
Write-Output "Ancoras ausentes/quebradas : $totalMissingAnchors"
Write-Output "----------------------------------------------------------"

if ($totalMismatches -eq 0 -and $totalMissingAnchors -eq 0) {
    Write-Output "STATUS: DOCUMENTO 100% VALIDO E SINCRONIZADO!"
    exit 0
} else {
    Write-Output "STATUS: FORAM ENCONTRADAS INCONSISTENCIAS A CORRIGIR."
    exit 2
}
