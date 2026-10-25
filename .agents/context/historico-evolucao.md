# Histórico de Evolução do Projeto

Este arquivo registra cronologicamente as principais alterações, decisões editoriais, auditorias e atualizações técnicas realizadas no projeto do Prontuário Eletrônico do SUAS (UnB / Dataprev).

---

## [2026-10-25] - Auditoria de Revisão (Emille) e Limpeza de Scripts Temporários

- **Auditoria Completa da Revisão de Emille Catarine:**
  - Confrontadas as 263 anotações presentes em `manual-dataprev-completo-revisado-emille.pdf` com o arquivo `completo.md`.
  - Verificado que aproximadamente 96% das modificações já haviam sido aplicadas ao longo dos commits do branch `feat/21Out-revisaov1`.
  - Levantadas pendências residuais em células da tabela de permissões (IDs 136, 189, 190, 191) e padronizações no capítulo de Extra Cadastro (IDs 92, 93, 94, 95, 97, 100).
- **Limpeza de Arquivos Temporários:**
  - Excluídos 7 scripts temporários de teste/auditoria ad-hoc (`check-encaminhamentos.ts`, `check-img.ps1`, `check-pages.ts`, `detailed-audit.ts`, `extract-old-summary.ts`, `find-double-hr.ts`, `find-titles.ts`) e o arquivo vazio `_paginas.css` na pasta `prontuario-dataprev/manual-markdown-quarto/`.
  - Preservados os scripts operacionais permanentes (`generate-pdf.ts` e `generate-pdf.sh`) e folhas de estilo ativas (`_base.css`, `_sanitize.css`).
  - Commit registrado: `chore(quarto): remover scripts temporarios de teste e arquivo css vazio`.

---

## [2026-10-25] - Atualização da Paginação do Sumário e Sincronização de Âncoras

- **Auditoria e Recontagem de Páginas:**
  - Mapeamento completo das 187 páginas do documento `completo.html` gerado pelo Quarto/CSS.
  - Sincronização de todos os 40 itens do Sumário (`completo.md`):
    - `Identificação da pessoa de referência e endereço da família` corrigido para página **32** (estava apontando para pág. 30).
    - `Formulário de controle de encaminhamentos` corrigido para página **116** (estava 117).
    - `Relatório de participação em atendimentos coletivos` corrigido para página **127** (estava 128).
    - Capas e capítulos subsequentes reajustados para as páginas **130** (Extra cadastro), **151** (Atendimento Coletivo), **163** (Migrar Prontuário), **171** (Painel Estatístico) e **178** (Descritivo de perfis e permissões).
    - Removidos links fantasmas e referências comentadas (`Relatório simplificado dos atendimentos` e `Excluir Prontuário`) que geravam espaçamento visual excessivo.
- **Correção de Âncoras e Referências Cruzadas:**
  - Atribuídos IDs explícitos para evitar ambiguidades no Pandoc (`#cadsuas-e-as-permissões-do-prontuário-suas`, `#migrar-prontuário-modulo`, `#identificação-da-pessoa-de-referência-e-endereço-da-família`, `#composição-familiar-quadro`, `#composição-familiar-bloco`, `#prontuário-migrar-prontuário`, `#prontuário-painel-estatístico`).
  - Atualizadas referências cruzadas no texto: página 180 -> **178** (anexo de permissões, linha 553) e página 150 -> **147** (Gerenciar família, linha 3639).

