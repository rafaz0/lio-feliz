# Notas de CI — Artefatos Gerados

## Motivação

Esta documentação existe porque o CI falhou 3 vezes na mesma categoria:
arquivos gerados por ferramenta fora de sincronia com o que o CI espera.

## Arquivos gerados que exigem atenção antes de commit

| Arquivo                              | Ferramenta   | Script de regeneração      | Ignorado pelo lint?         |
| ------------------------------------ | ------------ | -------------------------- | --------------------------- |
| `bun.lock`                           | bun          | `bun install`              | N/A (lockfile, não lintado) |
| `src/integrations/supabase/types.ts` | Supabase CLI | `bun run supabase:types`   | Sim (`eslint.config.js`)    |
| `src/integrations/lovable/index.ts`  | Lovable      | — (gerado automaticamente) | Sim (`eslint.config.js`)    |

## Checklist pré-commit

1. `bun run lint` — sem erros
2. `bun run test` — sem falhas
3. `bun run build` — compila sem erros
4. Se `supabase gen types` foi executado: `bun run format` no arquivo gerado OU rodar `bun run supabase:types` (já formata automático via redirecionamento? não, mas o Prettier roda separado — melhor rodar `bun run format` depois)
5. Se `bun add/update` foi executado: `bun install --frozen-lockfile` roda limpo
