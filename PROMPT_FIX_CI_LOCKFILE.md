# Prompt para o OpenCode — Corrigir quality-gates (CI quebrando de forma recorrente)

## Contexto

O workflow `quality-gates` (`.github/workflows/ci-cd.yml`) já falhou várias vezes com o mesmo padrão: conserta, e volta a quebrar depois. Diagnóstico já feito, não precisa reinvestigar:

- O workflow usa `npm ci` (linha 33), que exige `package-lock.json` sincronizado com `package.json`.
- O projeto na prática usa `bun` (`bun.lock`, `bunfig.toml` existem e são o fluxo real de desenvolvimento).
- Os dois lockfiles (`bun.lock` e `package-lock.json`) estão dessincronizados hoje — confirmado que `package.json` pede `playwright: ^1.62.0` mas `package-lock.json` resolve `playwright@1.61.1`.
- Isso faz `npm ci` falhar na etapa de instalação (falha rápida, ~37s — antes de lint/test/build rodarem).
- Causa raiz da recorrência: toda vez que uma dependência é adicionada/atualizada via `bun add`/`bun update`, o `package-lock.json` não é regenerado junto, e o CI quebra de novo na próxima vez.

## O que fazer

1. Trocar o workflow `.github/workflows/ci-cd.yml` para usar `bun` em vez de `npm`:
   - `Install dependencies`: `bun install --frozen-lockfile`
   - `Lint`: `bun run lint`
   - `Unit tests`: `bun test` (ou o comando equivalente já usado no projeto — confirmar no `package.json`)
   - `Build`: `bun run build`
   - Adicionar setup do bun no job (ex: `oven-sh/setup-bun@v2`) no lugar do `actions/setup-node` com `cache: npm`, ou manter o Node se necessário para alguma ferramenta, mas a instalação de dependências deve ser só via bun.
2. Remover o `package-lock.json` da raiz do repositório (e do `.gitignore`, se necessário, adicionar `package-lock.json` para impedir que volte a ser criado por engano). Confirmar antes se `package-lock.json` dentro de `.opencode/` e `.output/` são gerados automaticamente (parecem ser artefatos, não deveriam estar versionados — verificar se já estão no `.gitignore` e, se não, adicionar).
3. Testar localmente antes de commitar: rodar `bun install --frozen-lockfile`, `bun run lint`, os testes, e `bun run build` do zero (se possível simulando um ambiente limpo) para confirmar que o pipeline via bun funciona de ponta a ponta.
4. Commitar e abrir PR (ou push direto se for o fluxo usual do Rafael) e confirmar que o `quality-gates` passa no GitHub.

## Não fazer

Não mexer em nada relacionado à migração do domínio de portfolio (EWO-003) neste prompt — são tarefas independentes.

## Relatório

Seguir o formato padrão do `00_START_HERE.md` (Resumo, Arquivos Alterados, Motivo, Impactos, Riscos, Próximos Passos) ao final.
