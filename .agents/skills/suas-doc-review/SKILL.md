---
name: suas-doc-review
description: "Auditoria contínua do manual do Prontuário SUAS: validação de numeração de páginas no sumário, integridade de âncoras e consistência terminológica."
---

# Skill: SUAS Doc Review

Esta habilidade fornece rotinas automatizadas e diretrizes para revisão de qualidade, auditoria de paginação, validação de âncoras e conformidade conceitual do Manual do Prontuário Eletrônico do SUAS.

---

## 1. Verificação Automatizada do Sumário e Âncoras

Sempre que houver qualquer alteração de conteúdo, inserção de páginas, remoção de seções ou reestruturação de capítulos em `completo.md`, o agente deve executar o script de validação oficial da skill:

```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/suas-doc-review/scripts/validate-summary.ps1
```

### O que o script valida:
1. **Contagem total de páginas** no HTML gerado (`completo.html` via split em `<hr>`).
2. **Existência de cada ID âncora** (`#id`) no documento compilado.
3. **Correspondência exata da página** indicada no Sumário (`[PAGINA]{.n}`) com a página real do HTML onde o ID reside.
4. **Capítulos principais em negrito** e **seções normais** (40 itens no total).

---

## 2. Auditoria de Referências Cruzadas de Página no Texto

Alterações de páginas podem desatualizar referências textuais internas (ex: *"disponível na página X"*, *"descrita na página Y"*).

Para auditar e localizar todas as referências cruzadas no texto:
```powershell
Select-String -Path prontuario-dataprev/manual-markdown-quarto/completo.md -Pattern 'p[aá]gina\s+\d+'
```
- Verifique se a página mencionada corresponde ao destino atualizado.
- Sempre prefira combinar a menção da página com um link âncora funcional:
  `[disponível na página 178](#prontuário-descritivo-de-perfis-e-permissões)`

---

## 3. Checklist de Terminologia Assistencial Obrigatória

Durante a revisão de qualquer texto adicionado ou alterado, verifique a conformidade com as diretrizes do SUAS:

- [ ] **Pessoa de Referência** (nunca usar "chefe de família").
- [ ] **Família de Referência** (núcleo atendido).
- [ ] **CadÚnico** (com acento agudo no "Ú").
- [ ] **CadSUAS** (com maiúsculas e minúsculas corretas).
- [ ] **CRAS / CREAS / PAIF / PAEFI / RMA** (siglas oficiais em maiúsculas).
- [ ] **Vulnerabilidade Social** e **Violação de Direitos** (usados com rigor técnico).
- [ ] **Nomenclatura idêntica aos botões do sistema** (`<kbd>1</kbd> **Nome Exato**`).

---

## 4. Prevenção de Títulos Duplicados no Pandoc

Se um novo título for idêntico a outro existente no manual (exemplo: títulos recorrentes como "Composição familiar" ou "Migrar Prontuário"), **nunca confie no ID automático do Pandoc**, pois ele adicionará sufixos como `-1` ou `-2`.
- **Ação obrigatória**: especifique o ID de forma explícita:
  ```markdown
  ## Novo Título {#novo-titulo-especifico}
  ```
