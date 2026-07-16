<#
.SYNOPSIS
  Inicialização Oficial do Lio Feliz — PowerShell.
.DESCRIPTION
  Valida o workspace e abre o OpenCode. Deve ser o único método de inicialização.
  Ajuste OPCODE_CMD abaixo caso o executável esteja em outro local.
#>

$ErrorActionPreference = "Stop"
$canonicalPath = "H:\lio feliz"

# Caminho do executável OpenCode — detectar automaticamente ou usar fallback
$OPCODE_CMD = if (Get-Command "opencode" -ErrorAction SilentlyContinue) {
  "opencode"
} elseif (Get-Command "opencode.cmd" -ErrorAction SilentlyContinue) {
  "opencode.cmd"
} else {
  # Fallback: caminho comum de instalação via npm global
  $commonPaths = @(
    "$env:APPDATA\npm\opencode.cmd",
    "$env:APPDATA\npm\opencode",
    "$env:LOCALAPPDATA\npm\opencode.cmd",
    "$env:LOCALAPPDATA\npm\opencode",
    "C:\Program Files\opencode\bin\opencode.cmd"
  )
  $found = $null
  foreach ($p in $commonPaths) {
    if (Test-Path $p) { $found = $p; break }
  }
  if (-not $found) {
    Write-Host "[AVISO] OpenCode nao encontrado automaticamente." -ForegroundColor Yellow
    Write-Host "Defina OPCODE_CMD manualmente neste script." -ForegroundColor Yellow
    exit 1
  }
  $found
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " LIO FELIZ — Inicializacao Oficial"       -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Entrar no diretório oficial
Write-Host "[1/7] Entrando em $canonicalPath ..." -ForegroundColor Cyan
Set-Location $canonicalPath

# 2. Validar git toplevel
Write-Host "[2/7] Validando git toplevel ..." -ForegroundColor Cyan
try {
  $toplevel = git rev-parse --show-toplevel 2>$null
} catch {
  Write-Host "[ERRO] Falha ao validar diretorio git." -ForegroundColor Red
  exit 1
}
$toplevelNorm = $toplevel.Replace('/', '\').TrimEnd('\')
$canonicalNorm = $canonicalPath.TrimEnd('\')
if ($toplevelNorm -ne $canonicalNorm) {
  Write-Host "[ERRO] Git toplevel ($toplevel) nao corresponde ao caminho canonico ($canonicalPath)" -ForegroundColor Red
  exit 1
}
Write-Host "  OK: $toplevel" -ForegroundColor Green

# 3. Validar remote
Write-Host "[3/7] Validando remote ..." -ForegroundColor Cyan
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  Write-Host "[ERRO] Remote nao configurado." -ForegroundColor Red
  exit 1
}
Write-Host "  OK: $remote" -ForegroundColor Green

# 4. Validar HEAD
Write-Host "[4/7] Obtendo HEAD ..." -ForegroundColor Cyan
$head = git rev-parse HEAD 2>$null
if (-not $head) {
  Write-Host "[ERRO] Nao foi possivel obter HEAD." -ForegroundColor Red
  exit 1
}
Write-Host "  OK: $head" -ForegroundColor Green

# 5. Validar branch
Write-Host "[5/7] Validando branch ..." -ForegroundColor Cyan
$branch = git rev-parse --abbrev-ref HEAD 2>$null
Write-Host "  Branch: $branch" -ForegroundColor Green

# 6. Validar Working Tree
Write-Host "[6/7] Validando Working Tree ..." -ForegroundColor Cyan
$status = git status --porcelain 2>$null
if ($status) {
  Write-Host "  AVISO: Working Tree suja" -ForegroundColor Yellow
  $status | ForEach-Object { Write-Host "    $_" }
} else {
  Write-Host "  OK: Working Tree limpa" -ForegroundColor Green
}

# 7. Exibir resumo e abrir OpenCode
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " RESUMO DA SESSAO"                        -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Workspace: $canonicalPath"
Write-Host "HEAD:      $head"
Write-Host "Branch:    $branch"
Write-Host "Remote:    $remote"
Write-Host "Working Tree: $(if ($status) { 'suja' } else { 'limpa' })"
Write-Host ""

Write-Host "[7/7] Abrindo OpenCode ..." -ForegroundColor Cyan
Write-Host ""

& $OPCODE_CMD
