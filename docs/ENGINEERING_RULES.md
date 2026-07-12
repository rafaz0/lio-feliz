# ENGINEERING_RULES.md

**Projeto:** Lio Feliz

**Categoria:** Engineering

**Versão:** 0.10

**Status:** Working Draft

**Maturidade:** N0 — Ideia

**Responsáveis:** Rafael Santos + IA

---

# 1. Objetivo

Este documento define as regras permanentes da Engenharia do projeto.

Seu objetivo é padronizar a implementação da arquitetura oficial, garantindo consistência, previsibilidade e rastreabilidade durante toda a evolução do código.

As Engineering Rules complementam a metodologia do projeto, mas possuem foco exclusivo na implementação técnica.

---

# 2. Escopo

Estas regras aplicam-se a:

- novas implementações;
- refatorações;
- migrações arquiteturais;
- correções estruturais;
- integração entre componentes.

Não se aplicam à modelagem do domínio nem às regras de negócio.

---

# 3. Engineering Rules

---

## ER-001 — Arquitetura Oficial

Toda implementação deverá respeitar a arquitetura oficial aprovada.

Nenhuma solução temporária poderá substituir permanentemente a arquitetura documentada.

---

## ER-002 — Implementação Incremental

Grandes alterações deverão ser divididas em pequenas entregas independentes.

Cada etapa deverá produzir um sistema funcional.

---

## ER-003 — Convergência Arquitetural

Sempre que possível deverá ser priorizada a convergência sobre o código existente.

Reescritas completas deverão ser evitadas.

---

## ER-004 — Dependências Explícitas

Toda dependência arquitetural deverá ser claramente identificada.

Dependências implícitas deverão ser eliminadas progressivamente.

---

## ER-005 — Responsabilidade Única

Cada componente deverá possuir uma única responsabilidade claramente definida.

---

## ER-006 — Camadas Obrigatórias

Nenhum componente poderá ignorar as camadas definidas pela arquitetura oficial.

Fluxos alternativos somente poderão existir mediante ADR.

---

## ER-007 — Compatibilidade

Toda implementação deverá preservar compatibilidade durante o processo de migração, salvo decisão arquitetural em contrário.

---

## ER-008 — Refatoração Segura

Refatorações deverão priorizar alterações estruturais sem modificar comportamento funcional.

---

## ER-009 — Rastreabilidade

Toda implementação deverá ser rastreável até pelo menos um dos seguintes artefatos:

- ADR
- Business Rule
- Working Draft
- Pacote de Sincronização
- Documento de Engenharia

---

## ER-010 — Código Morto

Código obsoleto somente poderá ser removido quando:

- não possuir dependências;
- existir substituição definitiva;
- a migração estiver concluída.

---

## ER-011 — Planejamento

Nenhuma implementação arquitetural relevante deverá iniciar sem um plano de implementação correspondente.

---

## ER-012 — Critérios de Conclusão

Uma implementação somente poderá ser considerada concluída quando:

- arquitetura respeitada;
- documentação atualizada;
- critérios de aceite atendidos;
- riscos conhecidos documentados.

---

# 4. Evolução

Novas Engineering Rules deverão:

- possuir identificador permanente;
- descrever apenas regras permanentes;
- evitar decisões específicas de um único PS.

---

# Histórico

## v0.10

Criação inicial das Engineering Rules.
