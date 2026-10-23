---
name: suas-doc-review
description: >-
  Use this skill when the user asks to review, audit, validate, format, or organize manuals and chapters in the SUAS Prontuario project, including checking SUMMARY.md links, terminology consistency, and GitBook structure.
---

# SUAS Documentation Review Skill

Esta habilidade orienta a auditoria, padronização e revisão textual dos manuais do Prontuário Eletrônico do SUAS, garantindo conformidade com a legislação assistencial e a estrutura editorial do repositório.

## Checklist de Validação

### 1. Verificação Estrutural de Links e Sumário

1. Ao criar ou renomear arquivos em `gitbook/`:
   - Verifique se a referência no [`gitbook/SUMMARY.md`](file:///c:/Users/Lucas/Desktop/Dev/Unb/prontuario-dataprev/gitbook/SUMMARY.md) foi devidamente inserida ou atualizada.
   - Garanta que todos os links relativos utilizem caminhos corretos com extensão `.md`.
2. Verifique se o título no cabeçalho H1 do arquivo corresponde ao rótulo utilizado no sumário.

### 2. Auditoria Terminológica do SUAS

Certifique-se de que o texto respeita o vocabulário oficial da assistência social:
- Usar **Pessoa de Referência** em vez de "Chefe de Família".
- Usar **Composição Familiar** e **Membros da Família**.
- Usar as siglas oficiais com seu significado na primeira ocorrência:
  - **CRAS**: Centro de Referência de Assistência Social
  - **CREAS**: Centro de Referência Especializado de Assistência Social
  - **PAIF**: Serviço de Proteção e Atendimento Integral à Família
  - **PAEFI**: Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos
  - **CadSUAS**: Sistema de Cadastro Nacional do SUAS
  - **RMA**: Registro Mensal de Atendimentos

### 3. Validação de Callouts e Avisos

- Confirmar que instruções críticas (como perda de dados, exclusão de prontuários ou regras de sigilo) utilizam caixas de alerta adequadas (`> [!WARNING]` ou `> [!IMPORTANT]`).
- Assegurar que os nomes de botões, abas e campos de formulário estejam destacados em negrito (ex.: **Salvar**, **Avançar**, **Adicionar Membro**).

### 4. Sincronização entre Formatos

- Caso o conteúdo de um capítulo seja alterado de forma expressiva no GitBook, verifique se a versão consolidada no Quarto (`manual-markdown-quarto/`) necessita de atualização simultânea para manter a paridade do manual impresso.
