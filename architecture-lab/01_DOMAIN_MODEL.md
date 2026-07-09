# Modelo Conceitual do Domínio

**Status:** Em construção

**Versão:** 0.1

---

## Objetivo

Consolidar a ontologia, entidades, conceitos, relacionamentos, responsabilidades e limites do domínio do Lio Feliz.

## Aviso

Documento em construção. Nenhum conteúdo aqui representa decisão oficial.

## Entidades Previstas

- Ledger
- Fato
- Operação
- Ativo
- Posição
- Carteira
- Provento
- Evento Corporativo
- Snapshot
- Análise

## Relacionamentos Previstos

- Ledger → contém → Fatos
- Fatos → produzem → Posições
- Posições → compõem → Carteira
- Snapshot → deriva de → Fatos
- Análise → deriva de → Snapshot

## Limites do Domínio

A definir.