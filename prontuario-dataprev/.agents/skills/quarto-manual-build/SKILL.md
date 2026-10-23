---
name: quarto-manual-build
description: >-
  Use this skill when the user asks to compile, preview, test, or troubleshoot the Quarto manual build, generate PDF or HTML publications, or check layout styles in the manual-markdown-quarto directory.
---

# Quarto Manual Build Skill

Esta habilidade orienta a compilação, validação e resolução de problemas na geração dos manuais formatados com Quarto no projeto Prontuário SUAS.

## Visão Geral do Pipeline

O diretório [`manual-markdown-quarto/`](file:///c:/Users/Lucas/Desktop/Dev/Unb/prontuario-dataprev/manual-markdown-quarto) contém:
- Configuração do Quarto: `_quarto.yml`
- Script de automação pós-renderização: `generate-pdf.ts` / `generate-pdf.sh`
- Folhas de estilo para diagramação: `_base.css`, `_paginas.css`, `_sanitize.css`
- Documento consolidado: `completo.md`

## Procedimentos

### 1. Pré-requisitos de Ambiente

Verifique se as seguintes ferramentas estão instaladas e disponíveis no PATH:
- **Quarto CLI**: `quarto --version`
- **Deno / Node.js** (para scripts `.ts` ou `.sh`): `deno --version` ou `node --version`

### 2. Renderização do Manual

Para renderizar o projeto Quarto:

```powershell
cd manual-markdown-quarto
quarto render
```

Ou renderizar diretamente o arquivo consolidado para HTML:

```powershell
cd manual-markdown-quarto
quarto render completo.md --to html
```

### 3. Geração e Validação do PDF

A geração do PDF utiliza pós-processamento automatizado via script:

1. Execute o script TypeScript configurado:
   ```powershell
   quarto run generate-pdf.ts
   ```
