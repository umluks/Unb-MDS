---
name: quarto-manual-build
description: "Automação e compilação do Manual do Prontuário SUAS com Quarto, preview em tempo real e geração de PDF editorial via Playwright."
---

# Skill: Quarto Manual Build

Esta habilidade orienta a compilação, pré-visualização e geração do PDF editorial do Manual do Prontuário Eletrônico do SUAS no ambiente Quarto.

---

## 1. Localização e Arquivos Centrais

O diretório de trabalho do Quarto é:
`c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto\`

- **Arquivo fonte principal**: [`completo.md`](file:///c:/Users/Lucas/Desktop/Dev/Unb/prontuario-dataprev/manual-markdown-quarto/completo.md)
- **Arquivo HTML compilado**: [`completo.html`](file:///c:/Users/Lucas/Desktop/Dev/Unb/prontuario-dataprev/manual-markdown-quarto/completo.html)
- **Folhas de estilo ativas**: `_sanitize.css` e `_base.css`
- **Cabeçalhos parciais**: `_header-*.md`
- **Script de exportação para PDF**: `generate-pdf.ts` / `generate-pdf.sh`

---

## 2. Comandos Operacionais

### 2.1. Pré-visualização em Tempo Real (Preview)
Para iniciar ou verificar o servidor local com recarregamento dinâmico:
```powershell
cd c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto
quarto preview completo.md
```
> **Nota**: Ao editar `completo.md`, o processo em segundo plano do Quarto recompila automaticamente o arquivo `completo.html`.

### 2.2. Renderização Estática Única (Render)
Para forçar uma compilação síncrona sem subir o servidor de desenvolvimento:
```powershell
cd c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto
quarto render completo.md
```

### 2.3. Geração do PDF Final de Alta Fidelidade
A geração do PDF oficial é executada pelo script TypeScript com Playwright:
```powershell
cd c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto
deno run --allow-all generate-pdf.ts
```
ou pelo script shell (em ambientes bash):
```bash
./generate-pdf.sh
```

---

## 3. Verificação Rápida de Páginas no HTML Compilado

Para auditar o total de páginas geradas no HTML:
```powershell
$html = [System.IO.File]::ReadAllText('c:\Users\Lucas\Desktop\Dev\Unb\prontuario-dataprev\manual-markdown-quarto\completo.html', [System.Text.Encoding]::UTF8)
$pages = $html -split '<hr>'
Write-Output "Total de páginas geradas no HTML: $($pages.Length)"
```
O manual padrão possui **187 páginas**.

---

## 4. Cuidados e Diretrizes

1. **Arquivos Protegidos**:
   - Nunca modifique `generate-pdf.ts`, `generate-pdf.sh` ou os arquivos `_*.css` sem validação prévia.
2. **Ambiente Windows / PowerShell**:
   - Sempre utilize `[System.Text.Encoding]::UTF8` ao ler ou salvar arquivos de texto em scripts PowerShell para preservar diacríticos e acentuação da língua portuguesa.
3. **Validação Pós-Compilação**:
   - Sempre execute a skill `suas-doc-review` após compilar para validar se os números de página do Sumário coincidem com o HTML gerado.
