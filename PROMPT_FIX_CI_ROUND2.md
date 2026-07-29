# Prompt para o OpenCode — quality-gates falhou de novo (após fix do bun)

## Causa confirmada (já temos o log, não precisa reinvestigar)

```
Run bun install --frozen-lockfile
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [528]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
Error: Process completed with exit code 1.
```

`bun.lock` está dessincronizado com `package.json` — mesma categoria do bug original do `npm ci`, agora do lado do bun. Duas causas possíveis, confirmar qual é:

1. Alguém alterou `package.json` (ou fez merge de uma branch que alterou) sem rodar `bun install` localmente depois para atualizar o `bun.lock`.
2. A versão do bun no CI (`bun-version: latest` no `setup-bun@v2`, resolveu para `1.3.14`) é diferente da versão usada localmente para gerar o `bun.lock`, e versões diferentes do bun podem resolver/formatar o lockfile de forma diferente, disparando o "frozen lockfile" mesmo sem mudança real de dependências.

## O que fazer

1. Rodar `bun --version` localmente e comparar com `1.3.14` (o que o CI está usando). Se forem diferentes, isso já explica o problema.
2. Rodar `bun install` (sem `--frozen-lockfile`) localmente para regenerar o `bun.lock` do zero, e ver o que muda no diff — isso mostra exatamente o que estava dessincronizado.
3. Fixar a versão do bun no workflow (trocar `bun-version: latest` por uma versão exata, ex: `bun-version: "1.3.14"` ou a versão que o Rafael/opencode usam localmente) para eliminar essa fonte de drift de vez — "latest" muda com o tempo e pode reintroduzir esse mesmo problema no futuro.
4. Commitar o `bun.lock` atualizado junto com a versão fixada no workflow.

## Importante: validar localmente com os comandos EXATOS do CI

Da vez passada, a validação local rodou um comando de teste diferente do que foi commitado no YAML (por isso passou local e falhou no CI). Desta vez, rode literalmente os mesmos comandos do workflow, na ordem, incluindo `bun install --frozen-lockfile` do zero com a versão de bun fixada, antes de considerar validado.

## Relatório

Mesmo formato de sempre (Resumo, Arquivos Alterados, Motivo, Impactos, Riscos, Próximos Passos), incluindo qual das duas hipóteses (ou outra) foi a causa real, confirmada pelo log.
