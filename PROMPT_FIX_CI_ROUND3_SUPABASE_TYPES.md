# Prompt para o OpenCode — quality-gates falhou de novo (lint no arquivo gerado do Supabase)

## Causa confirmada

O erro é lint (`prettier/prettier`) em `src/integrations/supabase/types.ts` — arquivo gerado automaticamente pelo Supabase CLI (`supabase gen types typescript`), não formatado com Prettier antes de ser commitado.

`eslint.config.js` (linha 9) só ignora `dist`, `.output`, `.vinxi` — o arquivo gerado do Supabase não está na lista de exclusão, então ele é lintado como código escrito à mão.

## O que fazer

1. Rodar `bunx prettier --write src/integrations/supabase/types.ts` (ou `bun run format` no projeto todo) para corrigir a formatação atual e destravar o CI agora.
2. Adicionar `src/integrations/supabase/types.ts` à lista `ignores` em `eslint.config.js` (linha 9), já que é código gerado — não deve ser lintado/formatado manualmente a cada regeneração.
3. Verificar se existe algum script no `package.json` para regenerar esse arquivo (procurar por `supabase gen types` no repo, incluindo `README.md`/`docs/`, e no histórico de comandos se houver). Se não existir um script formal, criar um (ex: `"supabase:types": "supabase gen types typescript --local > src/integrations/supabase/types.ts"`) — isso documenta o processo e evita que alguém regenere o arquivo de outra forma no futuro.
4. Verificar se há outros arquivos gerados/vendorizados em `src/` na mesma situação (não editados à mão, mas sujeitos a lint) — se houver, adicionar todos ao `ignores` de uma vez, para não repetir esse ciclo pela quarta vez.

## Padrão a registrar

Essa é a terceira falha seguida de CI na mesma categoria: artefato gerado por ferramenta (lockfile npm → lockfile bun → agora types do Supabase) fora de sincronia com o que o CI espera. Vale uma nota curta em algum lugar da documentação do projeto (ex: `docs/DEPLOY.md` ou um novo `docs/CI_NOTES.md`) listando os arquivos gerados que exigem atenção antes de commit, para não depender de descobrir isso de novo a cada recorrência.

## Validação e relatório

Rodar os 4 comandos exatos do `ci-cd.yml` localmente (install, lint, test, build) antes de commitar. Relatório no formato padrão do `00_START_HERE.md`.
