<#
.SYNOPSIS
  Workspace Guard — Valida o workspace oficial do Lio Feliz.
.DESCRIPTION
  Guardião bloqueante. Verifica diretório, git, remote, HEAD, branch,
  working tree, fingerprint, documentos obrigatórios e clones duplicados.
  Exit Code 0 = tudo OK. Exit Code 1 = bloqueado.
  GOV-008, GOV-010, GOV-011.
#>

$ErrorActionPreference = "Stop"
$canonicalPath = "H:\Lio Feliz"
$canonicalRemote = "git@github.com:rafaz0/lio-feliz.git"
$canonicalBranch = "main"
$requiredFiles = @(
  "AGENTS.md",
  "project-context/PROJECT_BOOTSTRAP.md",
  "project-context/AI_OPERATION_CHECKLIST.md",
  "project-context/WORKSPACE_FINGERPRINT.md"
)
$duplicatePaths = @("C:\lio-feliz")

$allOk = $true
$errors = @()
$warnings = @()

function Add-Error {
  param([string]$message)
  $script:allOk = $false
  $script:errors += $message
}

function Add-Warning {
  param([string]$message)
  $script:warnings += $message
}

# ────────────────────────────────────────────
# 1. Validar diretório
# ────────────────────────────────────────────
if (-not (Test-Path $canonicalPath)) {
  Add-Error "Diretorio oficial nao encontrado: $canonicalPath"
} else {
  Set-Location $canonicalPath
}

# ────────────────────────────────────────────
# 2. Validar git toplevel
# ────────────────────────────────────────────
try {
  $toplevel = git rev-parse --show-toplevel 2>$null
} catch {
  Add-Error "Falha ao executar git rev-parse --show-toplevel"
}
if ($toplevel) {
  $toplevelNorm = $toplevel.Replace('/', '\').TrimEnd('\')
  $canonicalNorm = $canonicalPath.TrimEnd('\')
  if ($toplevelNorm -ne $canonicalNorm) {
    Add-Error "Git toplevel ($toplevel) nao corresponde ao caminho canonico ($canonicalPath)"
  }
}

# ────────────────────────────────────────────
# 3. Validar remote
# ────────────────────────────────────────────
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  Add-Error "Remote nao configurado"
} elseif ($remote -ne $canonicalRemote) {
  Add-Error "Remote esperado: $canonicalRemote / obtido: $remote"
}

# ────────────────────────────────────────────
# 4. Validar HEAD
# ────────────────────────────────────────────
$head = git rev-parse HEAD 2>$null
if (-not $head) {
  Add-Error "Nao foi possivel obter HEAD"
}

# ────────────────────────────────────────────
# 5. Validar branch
# ────────────────────────────────────────────
$branch = git rev-parse --abbrev-ref HEAD 2>$null
if (-not $branch) {
  Add-Error "Nao foi possivel obter a branch atual"
} elseif ($branch -ne $canonicalBranch) {
  Add-Error "Branch esperada: $canonicalBranch / obtida: $branch"
}

# ────────────────────────────────────────────
# 6. Validar Working Tree
# ────────────────────────────────────────────
$status = git status --porcelain 2>$null
$hasChanges = $status -ne ""

# ────────────────────────────────────────────
# 7. Validar documentos obrigatorios
# ────────────────────────────────────────────
foreach ($file in $requiredFiles) {
  $fullPath = Join-Path $canonicalPath $file
  if (-not (Test-Path $fullPath)) {
    Add-Error "Documento obrigatorio ausente: $file"
  }
}

# ────────────────────────────────────────────
# 8. Verificar clones duplicados
# ────────────────────────────────────────────
foreach ($dup in $duplicatePaths) {
  if (Test-Path $dup) {
    Add-Warning "Clone adicional encontrado: $dup. Existe risco de abrir o projeto errado. Remova-o ou sincronize-o antes de continuar."
  }
}

# ────────────────────────────────────────────
# 9. Banner / Resultado
# ────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  LIO FELIZ"                                 -ForegroundColor Cyan
Write-Host "  Workspace Oficial"                         -ForegroundColor Cyan
Write-Host ""                                            -ForegroundColor Cyan
Write-Host "  $canonicalPath"                            -ForegroundColor White
Write-Host "  Branch: $branch"                           -ForegroundColor White
Write-Host "  HEAD:   $head"                             -ForegroundColor White
Write-Host "  Remote: $canonicalRemote"                  -ForegroundColor White
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

if ($allOk) {
  if ($hasChanges) {
    Write-Host ">>> Workspace OK (Working Tree suja) <<<" -ForegroundColor Yellow
    Write-Host "    Modified/untracked files detected:"   -ForegroundColor Yellow
    $status | ForEach-Object { Write-Host "    $_" }
  } else {
    Write-Host ">>> Workspace OK <<<" -ForegroundColor Green
  }
} else {
  Write-Host ">>> WORKSPACE BLOQUEADO <<<" -ForegroundColor Red
  Write-Host ""
  Write-Host "Motivos:" -ForegroundColor Red
  foreach ($err in $errors) {
    Write-Host "  [ERRO] $err" -ForegroundColor Red
  }
}

foreach ($warn in $warnings) {
  Write-Host "  [AVISO] $warn" -ForegroundColor Yellow
}

Write-Host ""

if (-not $allOk) {
  exit 1
}

exit 0
