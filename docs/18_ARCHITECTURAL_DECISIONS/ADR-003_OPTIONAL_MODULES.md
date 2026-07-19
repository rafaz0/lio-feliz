# Lio Feliz - Documentação Oficial

# ADR-003: Módulos Opcionais

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

O Lio Feliz pode oferecer diversos módulos ao longo do tempo:

- Vida Financeira
- Integração com B3
- Investidor10
- Corretoras
- Criptomoedas
- Notificações

Alguns usuários podem não querer ou não precisar de todas as funcionalidades.

---

## Problema

Como garantir que módulos opcionais não se tornem requisitos obrigatórios para o funcionamento básico do sistema?

---

## Alternativas Consideradas

### Alternativa 1: Módulos sempre ativos

Todos os módulos são carregados e executados independentemente do uso.

Rejeitada porque aumenta complexidade e consumo de recursos desnecessariamente.

### Alternativa 2: Módulos opcionais por design (escolhida)

Todo módulo é opcional por padrão.

Apenas o núcleo do sistema (carteira, movimentações, cotações) é obrigatório.

---

## Decisão

Nenhuma integração externa ou módulo complementar pode tornar-se obrigatório para o funcionamento do sistema.

O sistema deve funcionar completamente mesmo sem:

- B3
- Yahoo Finance
- BRAPI
- CoinGecko
- Importação CSV
- Vida Financeira
- Qualquer integração futura

Cada módulo opcional deve poder ser ativado ou desativado sem impacto nos demais.

A integração com Vida Financeira, por exemplo, segue explicitamente o princípio das Ações Vinculadas: nenhuma informação é duplicada, apenas vinculada.

---

## Consequências

Positivas:

- Usuário escolhe o que utilizar.
- Sistema resiliente a falhas de provedores externos.
- Novas integrações podem ser adicionadas sem risco ao núcleo.

Negativas:

- Módulos opcionais exigem arquitetura preparada para desacoplamento.
- Funcionalidades integradas podem parecer menos coesas se mal implementadas.

---

## Documentos Relacionados

- `01_VISION.md` — independência de fornecedores.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` — integrações nunca são obrigatórias.
- `06_BUSINESS_RULES/05_PROVENTOS.md` — integração com Vida Financeira é opcional.
- `05_SYSTEM_ARCHITECTURE.md` — camada de integrações separada do domínio.

---

## Histórico

| Data       | Versão | Descrição       |
| ---------- | ------ | --------------- |
| 09/07/2026 | 1.0    | Criação do ADR. |
