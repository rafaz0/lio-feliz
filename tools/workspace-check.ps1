<#
.SYNOPSIS
  Workspace Guard — Valida o workspace oficial do Lio Feliz.
.DESCRIPTION
  Verifica diretório, repositório git, remote, HEAD, branch e working tree.
  Exit Code 0 se tudo OK, Exit Code 1 em caso de erro.
#>

$ErrorActionPreference = "Stop"
$canonicalPath = "H:\Lio Feliz"
$canonicalRemote = "git@github.com:rafaz0/lio-feliz.git"

function Write-ErrorAndExit {
  param([string]$message)
  Write-Host "[ERRO] $message" -ForegroundColor Red
  exit 1
}

# 1. Validar diretório
if (-not (Test-Path $canonicalPath)) {
  Write-ErrorAndExit "Diretorio oficial nao encontrado: $canonicalPath"
}

Set-Location $canonicalPath

# 2. Validar git
try {
  $toplevel = git rev-parse --show-toplevel 2>$null
} catch {
  Write-ErrorAndExit "Falha ao executar git rev-parse --show-toplevel"
}
# Normalizar separadores para comparacao
$toplevelNorm = $toplevel.Replace('/', '\').TrimEnd('\')
$canonicalNorm = $canonicalPath.TrimEnd('\')
if ($toplevelNorm -ne $canonicalNorm) {
  Write-ErrorAndExit "Git toplevel ($toplevel) nao corresponde ao caminho canonico ($canonicalPath)"
}

# 3. Validar remote
$remote = git remote get-url origin 2>$null
if ($remote -ne $canonicalRemote) {
  Write-ErrorAndExit "Remote esperado: $canonicalRemote / obtido: $remote"
}

# 4. Validar HEAD
$head = git rev-parse HEAD 2>$null
if (-not $head) {
  Write-ErrorAndExit "Nao foi possivel obter HEAD"
}

# 5. Validar branch
$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ($branch -ne "main") {
  Write-ErrorAndExit "Branch esperada: main / obtida: $branch"
}

# 6. Validar Working Tree
$status = git status --porcelain 2>$null
$hasChanges = $status -ne ""

Write-Host "=== Workspace Guard OK ===" -ForegroundColor Green
Write-Host "Workspace: $canonicalPath"
Write-Host "HEAD:      $head"
Write-Host "Branch:    $branch"
Write-Host "Remote:    $remote"
if ($hasChanges) {
  Write-Host "Working Tree: suja (modified/untracked files)" -ForegroundColor Yellow
} else {
  Write-Host "Working Tree: limpa" -ForegroundColor Green
}

exit 0
