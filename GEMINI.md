# Diretrizes e Contexto do Projeto: Prontuário Eletrônico do SUAS (UnB / Dataprev)

Este arquivo define as regras de desenvolvimento, documentação, terminologia e fluxos de trabalho específicos para o repositório **prontuario-dataprev**.

---

## 1. Visão Geral do Projeto

- **Nome do Projeto**: Prontuário Eletrônico do Sistema Único de Assistência Social (SUAS).
- **Parceria Institucional**: Universidade de Brasília (UnB), Dataprev e Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS).
- **Objetivo**: Elaboração, manutenção e editoração do Manual de Uso Oficial do Prontuário Eletrônico do SUAS, voltado aos profissionais e gestores da rede socioassistencial (especialmente CRAS e CREAS).
- **Repositório**: Contém os textos estruturados em Markdown tanto para visualização web (formato GitBook) quanto para compilação em publicação editorial e PDF de alta qualidade (formato Quarto).

---

## 2. Padrão da Pasta Oculta de Customizações: `.agents/`

A personalização do agente para este projeto é centralizada na pasta oculta **`.agents/`** na raiz do repositório:

- **Por que `.agents/` e não `.gemini/` no projeto?**
  - O motor do Antigravity/Gemini utiliza **`.agents/`** (ou `.agent/`) na raiz do repositório como o local padrão de descoberta automática de *workspace customizations*.
  - A pasta `~/.gemini/` é reservada para as configurações globais da máquina do usuário.
  - Para que as habilidades em `skills/` sejam registradas e ativadas automaticamente sob demanda durante a interação com o código, a pasta deve permanecer nomeada como **`.agents/`** na raiz do projeto.

Estrutura interna implementada:
```text
.agents/
├── context/                                  # Bases de conhecimento e documentações aprofundadas
│   ├── projeto-prontuario-suas.md            # Domínio SUAS, parceiros e módulos do sistema
│   ├── estrutura-documentacao.md             # Arquitetura GitBook vs. Quarto e mecânica de páginas
│   ├── diretrizes-estilo-e-conteudo.md       # Terminologia oficial, estilo instrucional e <kbd>
│   └── historico-evolucao.md                 # Registro histórico de decisões e atualizações
└── skills/                                   # Habilidades operacionais automatizadas
    ├── quarto-manual-build/                  # Automação de compilação Quarto, preview e PDF
    │   └── SKILL.md
    └── suas-doc-review/                      # Auditoria de sumário, links âncora e vocabulário
        ├── SKILL.md
        └── scripts/
            └── validate-summary.ps1          # Validador automático de sumário e páginas HTML
```

---

## 3. Diretrizes de Comunicação e Idioma Obrigatório

1. **Português do Brasil (pt-BR) Obrigatório**:
   - **Respostas**: Todas as explicações, relatórios, resumos, planos de ação, mensagens de commit e documentações técnicas devem ser redigidos **exclusivamente em Português do Brasil**.
   - **Perguntas e Interações**: Todas as perguntas de esclarecimento, confirmações, opções interativas (inclusive seleções em formulários/modais) devem ser formuladas **obrigatoriamente em Português do Brasil**. Sob hipótese alguma apresente perguntas ou opções em inglês ao usuário.
2. **Público-Alvo e Tom de Voz**:
   - Linguagem clara, didática, acessível e institucionalmente precisa, voltada para técnicos de referência (assistentes sociais, psicólogos, pedagogos) e gestores locais de assistência social.
3. **Fidelidade Normativa e Conceitual**:
   - Consonância estrita com a PNAS (2004), NOB/SUAS e NOB-RH/SUAS.
   - Utilização obrigatória dos termos oficiais: *Pessoa de Referência*, *Família de Referência*, *CadSUAS*, *CadÚnico*, *CRAS*, *CREAS*, *PAIF*, *PAEFI*, *RMA*, *Vulnerabilidade Social*, *Violação de Direitos*.
   - Proibido inventar ou renomear campos de telas do sistema: utilize sempre a nomenclatura exata dos formulários do Prontuário.

---

## 4. Gestão do Conhecimento: Manutenção de Contexto, Skills e Histórico

Para garantir a melhoria contínua e a preservação do histórico do projeto:

1. **Atualização Ativa do Contexto**:
   - Sempre que novos módulos, telas, decisões institucionais ou ajustes de regras forem implementados, o agente deve atualizar imediatamente os arquivos correspondentes em [`.agents/context/`](.agents/context/):
     - [`projeto-prontuario-suas.md`](.agents/context/projeto-prontuario-suas.md)
     - [`estrutura-documentacao.md`](.agents/context/estrutura-documentacao.md)
     - [`diretrizes-estilo-e-conteudo.md`](.agents/context/diretrizes-estilo-e-conteudo.md)
2. **Evolução Contínua das Skills**:
   - Novos comandos repetitivos, rotinas de validação de links, scripts de build ou fluxos editoriais devem ser documentados ou criados como novas habilidades em [`.agents/skills/`](.agents/skills/):
     - [`quarto-manual-build`](.agents/skills/quarto-manual-build/SKILL.md)
     - [`suas-doc-review`](.agents/skills/suas-doc-review/SKILL.md)
3. **Registro Obrigatório do Histórico (`historico-evolucao.md`)**:
   - Toda alteração relevante no projeto, mudança estrutural de documentação, nova convenção adotada ou atualização de contexto/skills deve ser registrada cronologicamente no arquivo [`historico-evolucao.md`](.agents/context/historico-evolucao.md).

---

## 5. Diretrizes Editoriais, Quarto e Git

1. **Sincronização entre GitBook e Quarto**:
   - Ao alterar ou adicionar arquivos em `gitbook/`, atualize o [`SUMMARY.md`](gitbook/SUMMARY.md).
   - Avalie e aplique as atualizações correspondentes no diretório `manual-markdown-quarto/` para assegurar a paridade do manual impresso (PDF).
2. **Regras de Paginação Quarto e Estabilidade de Âncoras**:
   - As quebras de página são geradas por `---` no Markdown, compiladas como `<hr>` no HTML e incrementadas no CSS (`counter-increment: page;`). O manual possui atualmente 187 páginas.
   - **Prevenção de IDs duplicados**: quando títulos se repetem (ex: *Migrar Prontuário*, *Composição familiar*), declare sempre um ID âncora explícito no Markdown (`## Título {#id-explicito}`). O Pandoc gera sufixos `-1` e `-2` que quebram links estáticos caso não haja ID explícito.
   - **Validação Mandatória**: após qualquer alteração no manual `completo.md`, execute o script da skill `suas-doc-review` (`.agents/skills/suas-doc-review/scripts/validate-summary.ps1`) para confirmar que todas as 40 seções do Sumário correspondem 1:1 às páginas reais do HTML compilado.
3. **Commits Convencionais com Escopo Semântico**:
   - Seguir o padrão do repositório:
     - `docs: atualizar manual de atendimento coletivo`
     - `docs(matriz): ajusta paginacao da tabela de perfis e atualiza sumario`
     - `docs(quarto): atualizar sumario com paginacao e links ancoras corretos`
     - `fix(quarto): corrigir include no capitulo de encaminhamentos`
4. **Preservação de Scripts e Folhas de Estilo**:
   - Não modificar `generate-pdf.ts`, `generate-pdf.sh` ou os arquivos `_*.css` sem validação prévia.
