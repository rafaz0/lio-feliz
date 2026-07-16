<#
.SYNOPSIS
  Inicialização Oficial do Lio Feliz — PowerShell.
.DESCRIPTION
  Executa o Workspace Guard (workspace-check.ps1) e, se aprovado,
  abre o OpenCode. Ajuste OPCODE_CMD abaixo se necessário.
  GOV-010, GOV-011.
#>

$ErrorActionPreference = "Stop"
$canonicalPath = "H:\Lio Feliz"
$guardScript = Join-Path $canonicalPath "tools\workspace-check.ps1"

# Caminho do executável OpenCode
$OPCODE_CMD = if (Get-Command "opencode" -ErrorAction SilentlyContinue) {
  "opencode"
} elseif (Get-Command "opencode.cmd" -ErrorAction SilentlyContinue) {
  "opencode.cmd"
} else {
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

# 1. Executar Workspace Guard
Write-Host "[1/2] Executando Workspace Guard ..." -ForegroundColor Cyan
& $guardScript
if ($LASTEXITCODE -ne 0) {
  Write-Host "[BLOQUEADO] Workspace Guard falhou. Nenhuma operacao pode prosseguir." -ForegroundColor Red
  exit 1
}
Write-Host "  Workspace Guard: APROVADO" -ForegroundColor Green
Write-Host ""

# 2. Abrir OpenCode
Write-Host "[2/2] Abrindo OpenCode ..." -ForegroundColor Cyan
Write-Host ""

& $OPCODE_CMD
