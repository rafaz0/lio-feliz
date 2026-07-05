<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Constraints
- Foco em investidor de longo prazo: fundamentos e dividendos
- Cripto, day trade, gamificação, cursos e AI chat não são prioridade
- Projeto conectado ao Lovable — não reescrever histórico git
- Usuário não é programador — comandos precisam ser claros

## Relevant Files
- `src/lib/yahoo.server.ts`: funções server-side Yahoo Finance (fundamentos, histórico, dividendos, news) com cache em memória
- `src/lib/data-functions.ts`: server functions combinadas (Yahoo Finance + BRAPI + mock fallback); `getAssetData` (detalhe), `getAssetList` (500+ ativos), `getAllAssets` (mock enriquecido), `getRealProjections` (projeção real de dividendos via Yahoo + fallback mock)
- `src/lib/mock-data.ts`: dados mock de 20 ações (usado como fallback/seed)
- `src/lib/fii-mock-data.ts`: dados mock de 20 FIIs
- `src/lib/quotes.functions.ts`: server function BRAPI para cotações em tempo real
- `src/lib/portfolio.ts`: consolidação de carteira + histórico patrimonial
- `src/lib/watchlist.ts`: hook React `useWatchlist()` com `useSyncExternalStore` + localStorage
- `src/lib/recommended-portfolios.ts`: dados mock de 5 carteiras recomendadas (Dividendos, Valor, Crescimento, Small Caps, FIIs)
- `src/routes/ativo.$ticker.tsx`: página de detalhe do ativo (Yahoo Finance + BRAPI) + botão Watchlist + Fatos Relevantes
- `src/routes/fii.$ticker.tsx`: página de detalhe do FII (BRAPI + mock)
- `src/routes/dividendos.tsx`: calendário de dividendos (ações + FIIs)
- `src/routes/rankings.tsx`: rankings com toggle ações/FIIs (dados reais no loader)
- `src/routes/comparar.tsx`: comparador com toggle ações/FIIs (dados reais no loader)
- `src/routes/calculadoras.tsx`: 5 calculadoras — Juros Compostos, Reserva de Emergência, DCF, Preço Teto, CDB
- `src/routes/provisionador.tsx`: provisionador de dividendos com gráfico de timeline (barras + linha acumulada)
- `src/routes/watchlist.index.tsx`: watchlist com busca, tabela, indicadores (DY, P/L), cotações ao vivo
- `src/routes/noticias.tsx`: notícias do mercado com dados reais do Yahoo Finance (+ tickers linkáveis)
- `src/routes/carteiras-recomendadas.tsx`: 5 carteiras pré-definidas com detalhamento por ativo
- `src/routes/_authenticated/carteira.index.tsx`: visão geral da carteira com gráfico de evolução + link IRPF
- `src/routes/_authenticated/irpf.index.tsx`: apuração mensal de IRPF (ganho de capital) — ações 15%, FIIs 20%, isenção R$ 20k, exportação CSV
- `src/routes/index.tsx`: página inicial com busca, tabela de 500+ ativos, links para watchlist e demais seções
- `src/components/site-header.tsx`: navegação principal + dropdown do usuário com links Carteira/IRPF

## Commands
- Dev server: `npm run dev` (na pasta do projeto, roda em http://localhost:8080)
- Lint/check: `npx tsc --noEmit`
- Build: `npm run build`
- Type checking requires `powershell -ExecutionPolicy Bypass -Command "& 'node_modules\.bin\tsc' --noEmit"` on this machine (PowerShell execution policy restriction)

## Next Steps Priority
- ✅ Fase 3: calculadoras (DCF, Price Target, CDB) + provisionador com timeline
- ✅ Fase 4: watchlist + IRPF Helper
- ✅ Fase 5: fatos relevantes + carteiras recomendadas
- ✅ Pente fino: removidos 10+ imports não utilizados em 8 arquivos; migrados 6 `inputValidator()` → `validator()` (em `data-functions.ts`, `operations.functions.ts`, `quotes.functions.ts`)
- Pendente: error/notFound components em páginas que ainda não têm; responsividade mobile; skeletons para loading

## Data Architecture
- **Listas** (index, rankings): BRAPI batch quotes para preços + mock/Yahoo para fundamentos quando disponíveis
- **Detalhe** (ativo/$ticker): Yahoo Finance (fundamentos, histórico, dividendos) com cache 1h + fallback mock
- **FIIs**: BRAPI quotes para preços ao vivo + mock-data para indicadores específicos (vacância, cap rate, etc.)
- **Cobertura**: 20 ativos com fundamentos completos (mock + Yahoo) + 500+ ativos com preço e nome via BRAPI
