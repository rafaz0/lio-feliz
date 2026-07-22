# BR-22 — Personalização da Plataforma

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-012 (Onda 6 — Módulo 22)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Personalização da Plataforma** do Lio Feliz. O módulo permite ao usuário configurar preferências de tema (claro/escuro/sistema), layout do dashboard e notificações.

Toda persistência reutiliza exclusivamente `IConfigurationRepository` (ADR-011-002 / R-017). Nenhum novo port é criado.

---

## 2. Modelo de Domínio

### 2.1 `UserPreferences` (Entidade)

Preferências consolidadas do usuário.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `UserPreferencesId` | Identificador único |
| `userId` | `string` | ID do usuário |
| `theme` | `ThemeMode` | LIGHT, DARK, SYSTEM |
| `dashboardLayout` | `DashboardLayout` | Layout do dashboard |
| `notifications` | `boolean` | Notificações ativadas |
| `language` | `string` | Idioma (padrão: "pt-BR") |

### 2.2 Value Objects

**ThemeMode**: `LIGHT`, `DARK`, `SYSTEM`

**ThemeConfig**: mode (ThemeMode), primaryColor (string), fontSize (number)

**DashboardLayout**: widgets (WidgetPosition[]), columns (number), compactMode (boolean)

**WidgetPosition**: widgetId (string), x (number), y (number), w (number), h (number)

---

## 3. Serviço de Domínio: `PreferencesService`

| Método | Descrição |
|--------|-----------|
| `mergeDefaults(userPrefs, defaults)` | Aplica defaults sobre preferências parciais |
| `applyTheme(theme)` | Valida tema, retorna configuração de tema |

---

## 4. Invariantes

- **I-001 (Extensão de Configuration — R-017):** Nenhum novo port de persistência é criado. Tudo via `IConfigurationRepository`.
- **I-002 (ThemeMode válido):** ThemeMode deve ser LIGHT, DARK ou SYSTEM.
- **I-003 (Merge de defaults):** Preferências parciais recebem valores padrão via `PreferencesService.mergeDefaults`.

---

## 5. Layout Padrão do Dashboard

| Widget | Posição padrão |
|--------|---------------|
| Patrimônio Total | x:0, y:0, w:6, h:2 |
| Alocação por Classe | x:6, y:0, w:6, h:2 |
| Últimos Proventos | x:0, y:2, w:4, h:2 |
| Rentabilidade | x:4, y:2, w:4, h:2 |
| Metas | x:8, y:2, w:4, h:2 |

---

## 6. Não-escopo

- Criação de novos widgets (apenas layout de widgets existentes)
- Temas customizados completos (apenas claro/escuro/sistema)

---

## 7. Dependências

- `IConfigurationRepository` — extensão com 6 novos métodos (ADR-011-002)
