# Lio Feliz - Documentação Oficial

# ADR-017-002: Política Arquitetural de Feature Flags e FinanceIntegrationConfig

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-017 (Arquitetura da Gestão Financeira) definiu que a integração entre a Carteira de Investimentos e o novo módulo de Gestão Financeira deve ser opcional e controlada por configuração do usuário.

O documento `PERSONAL_FINANCE_ARCHITECTURE.md` (EWO-036) introduziu inicialmente o conceito de um booleano simples chamado `FinanceIntegrationEnabled`.

Durante a elaboração da PI-017, identificou-se que um booleano simples seria insuficiente para capturar a complexidade das decisões de integração: o usuário pode querer ativar a Gestão Financeira mas desativar a sincronização automática, ou incluir a carteira no cálculo do Patrimônio Líquido mas não nas despesas.

A ER-017 validou a evolução para `FinanceIntegrationConfig` e recomendou o registro formal desta decisão em ADR.

---

## Problema

Como controlar a ativação e o comportamento da integração entre domínios independentes (Carteira e Gestão Financeira) de forma:

- flexível para acomodar diferentes perfis de usuário;
- extensível para suportar futuras opções de integração;
- segura para garantir que o comportamento padrão (desativado) preserve integralmente a Carteira;
- centralizada para facilitar auditoria e manutenção.

Adicionalmente, o projeto não possuía uma política formal para utilização de Feature Flags, o que poderia levar a decisões inconsistentes em futuras implementações.

---

## Decisão

### Decisão 1: Política Geral de Feature Flags (R-FF)

Estabelecer os seguintes princípios oficiais para utilização de Feature Flags no projeto Lio Feliz:

| Regra                                     | Descrição                                                                                                                                                              |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R-FF-001** — Ativação Opcional          | Toda funcionalidade controlada por Feature Flag deve ser opcional para o usuário. O estado padrão é "desativado".                                                      |
| **R-FF-002** — Isolamento entre Domínios  | Quando uma Feature Flag está desativada, o domínio correspondente não deve impactar nenhum outro domínio. Zero acoplamento, zero overhead.                             |
| **R-FF-003** — Compatibilidade Retroativa | A desativação de uma Feature Flag deve restaurar o comportamento exato anterior à sua introdução. Nenhuma funcionalidade existente pode ser afetada.                   |
| **R-FF-004** — Configuração Centralizada  | Toda Feature Flag deve ser acessível através de um ponto único de configuração, permitindo auditoria e gerenciamento centralizados.                                    |
| **R-FF-005** — Previsibilidade            | O comportamento do sistema para qualquer combinação de flags deve ser determinístico e documentado.                                                                    |
| **R-FF-006** — Evolução sem Quebra        | A adição de novas flags ou propriedades não pode quebrar contratos existentes. Utilizar interfaces extensíveis (objetos de configuração) em vez de booleanos isolados. |

### Decisão 2: FinanceIntegrationConfig

Utilizar um objeto de configuração tipado em vez de um booleano simples:

```typescript
interface FinanceIntegrationConfig {
  enabled: boolean; // Gestão Financeira ativada/desativada
  autoSync: boolean; // Sincronização automática entre domínios
  includeInvestments: boolean; // Incluir carteira no cálculo do PL
  defaultIncomeSource: IncomeSource; // Origem padrão para compras
}
```

### Justificativa Técnica

| Aspecto             | Booleano simples                                | Objeto de configuração                                   |
| ------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| **Escalabilidade**  | Cada nova opção requer nova flag isolada        | Propriedades adicionadas sem quebrar interface           |
| **Extensibilidade** | N booleanos = N parâmetros distintos            | Um objeto com N propriedades                             |
| **Manutenção**      | Lógica espalhada (cada flag lida separadamente) | Lógica centralizada no objeto                            |
| **Clareza**         | `if (enabled)` não revela intenção              | Propriedades nomeadas (`autoSync`, `includeInvestments`) |
| **Testabilidade**   | Múltiplas combinações de booleanos soltos       | Um objeto mockável                                       |
| **Evolução**        | Adicionar flag = mudar assinatura de funções    | Adicionar propriedade opcional = sem breaking change     |

### Regras da Decisão

1. `FinanceIntegrationConfig` é a interface oficial de configuração da integração.
2. Quando `enabled = false` (padrão), as demais propriedades são ignoradas.
3. O comportamento da Carteira com `enabled = false` é idêntico ao cenário anterior à PI-017.
4. A configuração é armazenada por usuário (nível de conta).
5. Nenhum componente da Carteira consulta `FinanceIntegrationConfig` diretamente — apenas a camada de sincronização (`FinanceIntegrationService`) o faz.

---

## Alternativas Consideradas

### Alternativa 1: Booleano simples (`FinanceIntegrationEnabled`)

Manter a abordagem original do `PERSONAL_FINANCE_ARCHITECTURE.md`.

**Rejeitada** porque:

- Não permite controle granular de comportamento.
- Cada nova opção exigiria uma nova flag paralela.
- Dificulta a evolução sem quebra de contrato.
- Não comunica a intenção das diferentes opções de integração.

### Alternativa 2: Objeto de configuração (escolhida)

Interface tipada com propriedades nomeadas.

**Escolhida** porque:

- Extensível sem breaking changes.
- Comunica claramente as opções disponíveis.
- Centraliza a lógica de configuração.
- Compatível com R-FF-006 (Evolução sem Quebra).

### Alternativa 3: Configuração via módulo separado

Criar um microsserviço ou módulo de configuração dedicado.

**Rejeitada** porque:

- Overhead desnecessário para o porte do projeto.
- A complexidade adicional não se justifica para o número atual de flags.
- O objeto de configuração atende aos requisitos com simplicidade.

---

## Consequências

### Positivas

- Política de Feature Flags formalizada e reutilizável (R-FF-001 a R-FF-006).
- Integração configurável sem acoplamento.
- Carteira permanece inalterada quando desativada.
- Extensibilidade para futuras opções de integração.
- Interface tipada提供 type safety e documentação inline.

### Negativas

- Objeto de configuração precisa ser trafegado entre camadas.
- Necessidade de valor padrão claro para cada propriedade.
- Complexidade adicional de UI para configurar as opções.

### Neutras

- A interface poderá ser armazenada em configuração do usuário (Supabase ou localStorage), a ser definido na implementação.

---

## Referências

- `architecture-lab/PI-017.md` — Arquitetura da Gestão Financeira (§9 Feature Flags, §14 ADR-017-002).
- `architecture-lab/ER-017.md` — Engineering Review que validou a decisão (Critério 4, R01).
- `docs/PERSONAL_FINANCE_ARCHITECTURE.md` — Documento original com `FinanceIntegrationEnabled`.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-009_PERSONAL_FINANCE_SEPARATION.md` — Separação Carteira/Gestão Financeira.
- R-PF-002, R-PF-003 — Princípios de sincronização opcional e ausência de dependência.
- R-FF-001 a R-FF-006 — Política de Feature Flags (este ADR).
