# Arquitetura e Estrutura da Documentação

Este projeto abriga o manual oficial sob dois formatos complementares:

## 1. Diretório `gitbook/`

Destinado à publicação web interativa e navegação estruturada por menus:

- **`README.md`**: Página inicial do manual, apresentando a publicação, o objetivo institucional e os módulos.
- **`SUMMARY.md`**: O índice mestre do GitBook. Cada link listado no `SUMMARY.md` compõe a barra lateral de navegação.
- **Módulos organizados em subpastas**:
  - `apresentacao/`: Conceitos gerais, estrutura do sistema e público-alvo.
  - `acesso-ao-prontuario/`: Login, CadSUAS, perfis de acesso e termo de uso.
  - `prontuario-atendimento-individual-e-familiar/`: Todos os blocos do prontuário individual e familiar.
  - `prontuario-atendimento-coletivo/`: Diretrizes e preenchimento de ações coletivas.
  - `prontuario-migrar-prontuario/`: Regras e fluxos de migração.
  - `prontuario-painel-estatistico/`: Relatórios gerenciais e indicadores.

## 2. Diretório `manual-markdown-quarto/`

Destinado à compilação tipográfica e geração de PDFs e documentos finais consolidados:

- **`_quarto.yml`**: Configuração central do Quarto (metadados do livro/documento, pós-processamento e opções de renderização).
- **`completo.md` / `completo.html` / `completo.pdf`**: Arquivos consolidados para renderização unificada.
- **Folhas de Estilo (`_base.css`, `_paginas.css`, `_sanitize.css`)**: Regras de diagramação, margens de impressão (@page), tipografia, cabeçalhos e rodapés oficiais.
- **Templates parciais (`_before-body.html`, `_after-body.html`, `_header.md`)**: Inserção de capa, sumário, numeração e marcas institucionais.
- **Scripts de Compilação (`generate-pdf.ts`, `generate-pdf.sh`)**: Automação da geração de PDF com Quarto e ferramentas headless (Puppeteer / Playwright).

## 3. Fluxo de Edição Recomendado

1. Edite ou crie o conteúdo textual na pasta temática relevante de `gitbook/`.
2. Caso um novo arquivo seja criado, adicione a entrada correspondente em `gitbook/SUMMARY.md`.
3. Para compilar o manual impresso/PDF, replique ou inclua os capítulos correspondentes em `manual-markdown-quarto/` e execute o script de renderização Quarto.
