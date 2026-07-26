# Lio Feliz - Documentação Oficial

# ADR-009: Separação entre Carteira e Gestão Financeira

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A plataforma Lio Feliz possui um módulo consolidado de Carteira de Investimentos que gerencia posições, proventos, rentabilidade e IRPF.

Solicitações de usuários indicam a necessidade de uma visão financeira mais ampla: contas bancárias, receitas, despesas, dívidas, financiamentos e patrimônio líquido.

Inicialmente considerou-se estender a Carteira para incluir esses dados. No entanto, isso criaria um acoplamento indevido entre investimentos e finanças pessoais.

---

## Problema

Como adicionar gestão financeira pessoal (contas, receitas, despesas, patrimônio global) sem:

- criar dependência na Carteira de Investimentos;
- tornar a Carteira mais complexa;
- obrigar usuários que só querem investimentos a configurarem dados financeiros;
- violar o princípio de responsabilidade única do módulo atual.

---

## Decisão

Criar um novo domínio denominado **Gestão Financeira**, completamente independente da Carteira.

### Regras da Decisão

1. A Carteira de Investimentos **não pode depender** da Gestão Financeira.
2. A Gestão Financeira **não pode depender** da Carteira.
3. A integração entre ambos é **opcional** (opt-in por configuração do usuário).
4. Quando a integração está desativada, a Carteira funciona exatamente como hoje.
5. Quando ativada, a Carteira pode sincronizar dados com o Patrimônio Global.
6. A origem de recursos em operações de compra só fica disponível com integração ativa.

---

## Alternativas Consideradas

### Alternativa 1: Estender a Carteira

Adicionar contas, receitas e despesas como sub-módulos da Carteira.

**Rejeitada** porque:

- Mistura responsabilidades de investimento com finanças pessoais.
- Aumenta a complexidade do módulo Carteira.
- Obriga todos os usuários a terem dados financeiros mesmo que não queiram.

### Alternativa 2: Criação de domínio independente (escolhida)

Manter dois bounded contexts separados com integração opcional.

**Escolhida** porque:

- Preserva a simplicidade e foco da Carteira.
- Permite evolução independente.
- Usuários escolhem se querem ou não a funcionalidade.
- Segregação clara de responsabilidades.

### Alternativa 3: Módulo na Carteira com flag de ativação

Criar os componentes dentro da Carteira mas escondê-los por configuração.

**Rejeitada** porque:

- Código financeiro misturado com código de investimentos.
- Dificulta manutenção e testes.
- Maior risco de regressão na Carteira.

---

## Consequências

### Positivas

- Separação clara de responsabilidades.
- Carteira permanece focada em investimentos.
- Usuário decide o nível de integração.
- Cada domínio pode evoluir em ritmo próprio.
- Menor risco de regressão.

### Negativas

- Duplicação de alguns conceitos (ex: valor monetário, data).
- Necessidade de mecanismo de sincronização entre domínios.
- Complexidade adicional de configuração para o usuário.

### Neutras

- A interface do usuário precisará de ajustes para exibir/ocultar a Gestão Financeira conforme configuração.

---

## Referências

- `docs/PERSONAL_FINANCE_ARCHITECTURE.md` — Documento de arquitetura do novo domínio.
- R-PF-001 a R-PF-006 — Princípios arquiteturais da Gestão Financeira.
- PI-017, PI-018, PI-019 — Roadmap de implementação.
