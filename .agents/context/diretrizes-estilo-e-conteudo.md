# Diretrizes de Estilo, Terminologia e Formatação

Este guia estabelece os padrões editoriais, conceituais e tipográficos para a redação e manutenção do Manual do Prontuário Eletrônico do SUAS.

---

## 1. Glossário e Terminologia Oficial do SUAS

A documentação deve empregar rigorosamente os termos oficiais consagrados pela Política Nacional de Assistência Social (PNAS) e pelas Normas Operacionais Básicas do SUAS.

| Termo Obrigatório / Recomendado | Termo Proibido / Evitar | Justificativa Conceitual |
| :--- | :--- | :--- |
| **Pessoa de Referência** | Chefe de família, chefe da casa | A assistência social não hierarquiza os membros familiares. |
| **Família de Referência** | Família vulnerável (como rótulo) | O foco é a unidade familiar enquanto núcleo de proteção. |
| **Vulnerabilidade Social** | Pobreza absoluta, carência | O conceito de vulnerabilidade abrange dimensões relacionais e de acesso, não apenas renda. |
| **Violação de Direitos** | Vítima de violência (quando usado de forma reducionista) | O termo técnico expressa a ruptura de garantias de direitos fundamentais. |
| **Usuário(a) do SUAS** | Cliente, paciente, beneficiário passivo | O cidadão atendido é sujeito de direitos sociais. |
| **CadÚnico** | Cadastro Único, Cadunico (grafia) | Utilizar com acento agudo no "Ú" e maiúsculas adequadas: CadÚnico. |
| **CadSUAS** | CadSuas, CADSUAS | Padrão oficial de escrita do cadastro nacional. |
| **Técnico(a) de Referência** | Atendente, funcionário, assistente (genérico) | Profissionais de nível superior responsáveis pelo acompanhamento (assistente social, psicólogo). |
| **Registro de Atendimento** | Prontuário físico, ficha de papel | Referência ao sistema eletrônico em substituição aos formulários legados. |

---

## 2. Tom de Voz e Estilo de Redação

1. **Didático e Orientado à Ação**:
   - Utilize a segunda pessoa do discurso de forma respeitosa e direta: *"Ao selecionar a opção...", "Você pode verificar...", "Informe o número do CPF..."*.
   - Frases concisas, com ordem direta (sujeito + verbo + predicado).
2. **Precisão Institucional de Telas e Campos**:
   - Nunca invente ou parafraseie o nome de campos, botões ou telas do sistema.
   - Use exatamente o texto visível na interface do software:
     - Exemplo: se o botão diz *"Confirmar"*, escreva **Confirmar**, não *"Clique para salvar"*.
3. **Imparcialidade e Proteção de Dados (LGPD)**:
   - Todas as imagens de exemplo devem conter dados fictícios ou anonimizados (CPFs fictícios, nomes de teste, municípios genéricos).

---

## 3. Padrões de Formatação Visual e Markdown

### 3.1. Marcação de Elementos de Interface (<kbd>)
Os números indicativos que vinculam o texto explicativo às marcações na imagem de tela devem usar a tag HTML `<kbd>` acompanhada do nome do elemento em negrito:
```markdown
No agrupamento <kbd>1</kbd> **Informações do Prontuário**, você pode verificar...
Acione a opção <kbd>2</kbd> **Opções** e em seguida <kbd>3</kbd> **Migrar prontuário**...
```

### 3.2. Formatação de Listas de Campos
Os campos de formulários devem ser estruturados em listas com travessão e descrição:
```markdown
- **Nome** – campo que informa o nome da pessoa de referência;
- **CPF** – campo que informa o número do CPF;
- **Grau de parentesco** – campo que informa a relação com o responsável familiar. As alternativas são:
  - Cônjuge ou companheiro(a)
  - Filho(a)
  - Enteado(a)
```

### 3.3. Classes Utilitárias de Imagens
No Quarto, as imagens devem receber as classes CSS pré-configuradas para manter o alinhamento da diagramação:
- `{.img-pagina}`: imagem principal da coluna esquerda da página dupla.
- `{.w-100}`: largura de 100% da coluna.
- `{.w-90}`: largura de 90% (usada frequentemente em modais e pop-ups).
- `{.w-50}`: largura de 50% (usada para detalhes ou janelas pequenas).
- `{.qr-code}`: dimensão padronizada para os códigos QR nos rodapés das capas.

### 3.4. Blocos de Destaque e Avisos
Utilize citações em bloco com negrito indicativo:
```markdown
> **Importante:** se um bloco ou uma funcionalidade não estiver disponível, confirme se o seu perfil no CadSUAS possui a permissão necessária.
```

### 3.5. Referências Cruzadas de Página
Quando fizer referência a outro capítulo ou seção no corpo do texto, sempre forneça o link com âncora e a indicação do número da página:
```markdown
...consulte o anexo “Prontuário: Descritivo de perfis e permissões”, [disponível na página 178](#prontuário-descritivo-de-perfis-e-permissões).
...conforme a funcionalidade Gerenciar família, **descrita na página 147**.
```
