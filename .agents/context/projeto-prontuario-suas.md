# Contexto do Projeto: Prontuário Eletrônico do SUAS

## 1. Visão Institucional e Objetivos

O projeto do **Prontuário Eletrônico do SUAS** é desenvolvido pela **Universidade de Brasília (UnB)** em cooperação técnica com a **Dataprev** e o **Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS)**.

O objetivo central é a concepção, manutenção e qualificação contínua do **Manual de Uso Oficial do Prontuário Eletrônico do Sistema Único de Assistência Social (SUAS)**, assegurando uma documentação didática, visual e institucionalmente alinhada para os profissionais que atuam na ponta da rede socioassistencial (especialmente equipes do **CRAS** e do **CREAS**), bem como para gestores municipais e estaduais de assistência social.

---

## 2. Princípios Normativos do SUAS

A documentação deve refletir com total fidelidade as normas regulatórias do SUAS:
- **PNAS (2004)**: Política Nacional de Assistência Social.
- **NOB/SUAS (2012)**: Norma Operacional Básica do SUAS.
- **NOB-RH/SUAS**: Norma Operacional Básica de Recursos Humanos do SUAS.
- **Tipificação Nacional de Serviços Socioassistenciais**.

### Terminologia Assistencial Obrigatória:
- **Pessoa de Referência**: pessoa responsável pela unidade familiar cadastrada (nunca "chefe de família").
- **Família de Referência**: unidade nuclear receptora da proteção e acompanhamento social.
- **CadÚnico**: Cadastro Único para Programas Sociais do Governo Federal (base de dados federal).
- **CadSUAS**: Sistema de Cadastro Nacional do SUAS (gestão de unidades, vínculos e permissões de acesso).
- **CRAS**: Centro de Referência de Assistência Social (Proteção Social Básica).
- **CREAS**: Centro de Referência Especializado de Assistência Social (Proteção Social Especial de Média Complexidade).
- **PAIF**: Serviço de Proteção e Atendimento Integral à Família (executado no CRAS).
- **PAEFI**: Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos (executado no CREAS).
- **RMA**: Registro Mensal de Atendimentos.
- **Vulnerabilidade Social**: situações de fragilidade econômica, relacional ou de acesso a bens públicos.
- **Violação de Direitos**: situações de violência, negligência, abandono, abuso ou exploração.

---

## 3. Arquitetura Funcional do Prontuário Eletrônico

O sistema é subdividido nos seguintes módulos e funcionalidades documentadas no manual:

### 3.1. Acesso ao Sistema e Gestão de Vínculos
- **Autenticação Gov.br**: login de usuário via conta única Gov.br com controle por CPF.
- **Perfis de Acesso no CadSUAS**: associação de perfis (Técnico de Referência Nível Superior, Nível Médio, Coordenador, Gestor, Administrativo) a unidades socioassistenciais específicas.
- **Termo de Uso e Sigilo**: aceite obrigatório para conformidade com a LGPD e sigilo profissional.

### 3.2. Módulo Prontuário: Atendimento Individual e Familiar
- **Busca e Consulta**: pesquisa por CPF ou NIS (Consulta Simples) ou filtros combinados (Consulta Avançada).
- **Identificação da Pessoa de Referência e Endereço**: dados pessoais, NIS, RG, endereço e contato provenientes do CadÚnico.
- **Composição Familiar**: perfil etário e quadro de integrantes da família.
- **Condições de Vida**: blocos de Condições Habitacionais, Educacionais, Saúde, Trabalho e Rendimento.
- **Registro de Atendimentos**: histórico cronológico de escutas, atendimentos individualizados e intervenções técnicas.
- **Benefícios Eventuais**: registro e histórico de concessões (auxílio natalidade, funeral, vulnerabilidade temporária).
- **Vulnerabilidades e Violação de Direitos**: assinalamento técnico de marcadores e situações de risco/desproteção.
- **Planejamento e Evolução Familiar**: plano de acompanhamento social com metas, compromissos e periodicidade.
- **Serviços, Programas e Medidas**: acompanhamento de participação em programas sociais, cumprimento de medidas socioeducativas em meio aberto (PSC e LA) e histórico de acolhimento institucional.
- **Controle de Encaminhamentos**: encaminhamentos intra-setoriais (rede socioassistencial) e intersetoriais (saúde, educação, habitação, justiça, trabalho).
- **Relatório de Atendimentos Coletivos**: visualização da participação de membros da família em atividades coletivas.

### 3.3. Módulo Extra Cadastro
- Atendimento e cadastramento simplificado no Prontuário para pessoas/famílias não encontradas no CadÚnico ou indocumentadas.
- Funcionalidade **Gerenciar Família**: inserção manual de membros e composição do núcleo familiar sem dependência imediata de base externa.

### 3.4. Módulo Atendimento Coletivo
- Registro e gestão de grupos, palestras, oficinas temáticas e reuniões coletivas no âmbito do PAIF, PAEFI ou SCFV.
- Registro de frequência, temas abordados, técnicos facilitadores e emissão de listas de presença e relatórios.

### 3.5. Módulo Migrar Prontuário
- Transferência de prontuários de atendimento entre unidades CRAS/CREAS (dentro do mesmo município ou entre municípios).
- Fluxo de solicitação, justificativa técnica e aceite pela unidade de destino com rastreabilidade completa.

### 3.6. Módulo Painel Estatístico
- Visão agregada dos atendimentos, famílias acompanhadas, principais vulnerabilidades registradas e perfil etário para suporte à tomada de decisão e planejamento da gestão socioassistencial.

### 3.7. Descritivo de Perfis e Permissões
- Matriz completa de acessos especificando as ações habilitadas para cada perfil técnico e administrativo:
  - Visualização simples vs. inclusão, alteração e exclusão de dados.
  - Restrições a campos sensíveis (como anotações de observações sigilosas e marcadores de violência).
