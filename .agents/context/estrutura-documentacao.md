# Arquitetura e Estrutura da Documentação: GitBook vs. Quarto

Este documento detalha a organização técnica dos formatos de documentação mantidos no projeto, com ênfase especial na compilação editorial paginada via **Quarto**.

---

## 1. Dois Formatos de Publicação

O repositório mantém duas representações complementares do manual:

1. **GitBook (`gitbook/`)**:
   - Voltado para leitura digital online, navegação rápida via web browser.
   - Organizado em múltiplos arquivos Markdown modulares por capítulo.
   - Navegação controlada pelo arquivo [`gitbook/SUMMARY.md`](file:///c:/Users/Lucas/Desktop/Dev/Unb/gitbook/SUMMARY.md).
   - Imagens armazenadas na pasta de assets da web.

2. **Quarto (`prontuario-dataprev/manual-markdown-quarto/`)**:
   - Voltado para editoração gráfica e geração de publicação impressa e **PDF de alta fidelidade**.
   - Baseado no arquivo central [`completo.md`](file:///c:/Users/Lucas/Desktop/Dev/Unb/prontuario-dataprev/manual-markdown-quarto/completo.md) que consolida todos os capítulos com paginação e design paged-media.
   - Estilização paged-media via CSS puro (`_base.css`, `_sanitize.css`), cabeçalhos parciais (`_header-*.md`) e vetores SVG (`svg/cover.svg`, `svg/title.svg`, etc.).

---

## 2. Mecânica de Paginação e Compilação no Quarto

A paginação do manual impresso/PDF é controlada estritamente pelas regras de renderização do Quarto/Pandoc combinadas com o CSS:

### 2.1. Como as Páginas São Criadas
- No Markdown, a quebra de página manual é indicada por **três hífens** em linha isolada:
  ```markdown
  ---
  ```
- Na compilação Quarto (`completo.html`), cada `---` (exceto os do frontmatter YAML inicial) é convertido em uma tag horizontal `<hr>`.
- No arquivo `_base.css`, a regra de mídia impressa define:
  ```css
  hr {
    break-after: page;
    page-break-after: always;
    counter-increment: page;
  }
  ```
- O número de página visual no rodapé e nas referências é calculado dinamicamente por:
  ```css
  content: counter(page);
  ```

### 2.2. Total de Páginas Atual
- O manual possui atualmente **187 páginas** (de Page 1 até Page 187).
- A **Capa** é a Página 1.
- O **Sumário** é a Página 2.
- A **Apresentação** começa na Página 3.

---

## 3. Padrões Estruturais em `completo.md`

### 3.1. Páginas de Capa de Capítulo (Title Covers)
Utilizadas na abertura dos grandes módulos do sistema:
```markdown
---

<div class="title">

```{=html}
{{< include svg/title.svg >}}
```

<div class="top"></div>

<div class="middle">

# Prontuário: Atendimento individual e familiar

</div>

<div class="bottom qr">

![QR Code image](img/prontuario-dataprev_qr-code-login-e-atendimento.png){.qr-code}

[Clique aqui](URL_DO_VIDEO) ou escaneie o QR Code para acessar o vídeo explicativo.

</div>

</div>
```

### 3.2. Páginas de Conteúdo com Layout 2 Colunas
Padrão de página dupla com imagem de tela à esquerda e texto explicativo à direita:
```markdown
---

<div class="page-2col">

{{< include _header-prontuario-individual.md >}}

![Descrição da Imagem](img/nome-imagem.png){.img-pagina}

## Nome da Seção {#nome-da-secao}

Texto explicativo e campos do sistema...

</div>
```

---

## 4. Regras Críticas para Links Âncora e Prevenção de Falhas

### 4.1. Problema dos Títulos Homônimos no Pandoc
O Pandoc gera automaticamente os identificadores de âncora a partir do texto do cabeçalho. Quando o mesmo título se repete no documento (por exemplo, "Migrar Prontuário", "Composição familiar" ou "Identificação da pessoa de referência"), o Pandoc anexa sufixos automáticos (`#migrar-prontuário-1`, `#migrar-prontuário-2`, etc.).

**Solução Obrigatória**: Sempre declarar explicitamente o ID âncora no cabeçalho Markdown:
```markdown
## Migrar Prontuário {#migrar-prontuário-modulo}
## Composição familiar {#composição-familiar-quadro}
## Composição familiar {#composição-familiar-bloco}
```

### 4.2. Formato dos Itens no Sumário
No Sumário (página 2), cada item deve associar o link âncora ao número de página correspondente:
- **Títulos principais (capítulos em negrito):**
  ```markdown
  **[Nome do Capítulo](#ancora-do-capitulo)** [PAGINA]{.n}
  ```
- **Seções e subseções (itens de lista):**
  ```markdown
  - [Nome da Seção](#ancora-da-secao) [PAGINA]{.n}
  ```

### 4.3. Comentários HTML e Quebras de Página
- Blocos comentados com `<!-- ... -->` que contenham quebras `---` não geram quebras visíveis no HTML compilado se o Pandoc mantiver o bloco raw inline/comentado.
- Para evitar deslocamento acidental de páginas ou artefatos de espaçamento vertical no Sumário, linhas comentadas de seções excluídas não devem ser mantidas dentro do bloco do sumário.
