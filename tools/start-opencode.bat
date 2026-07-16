@echo off
REM ========================================
REM LIO FELIZ — Inicializacao Oficial (CMD)
REM ========================================
REM Executa o Workspace Guard (PowerShell) e,
REM se aprovado, abre o OpenCode.
REM Ajuste OPCODE_CMD abaixo se necessario.
REM ========================================

setlocal enabledelayedexpansion

set CANONICAL_PATH=H:\Lio Feliz
set OPCODE_CMD=opencode.cmd
set GUARD_SCRIPT=%CANONICAL_PATH%\tools\workspace-check.ps1

where %OPCODE_CMD% >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [AVISO] OpenCode nao encontrado no PATH.
    echo Tente usar tools\start-opencode.ps1 ou instale globalmente.
    echo.
    pause
    exit /b 1
)

echo ========================================
echo  LIO FELIZ — Inicializacao Oficial
echo ========================================
echo.

REM 1. Executar Workspace Guard
echo [1/2] Executando Workspace Guard ...
powershell -ExecutionPolicy Bypass -File "%GUARD_SCRIPT%"
if %ERRORLEVEL% neq 0 (
    echo [BLOQUEADO] Workspace Guard falhou. Nenhuma operacao pode prosseguir.
    pause
    exit /b 1
)
echo   Workspace Guard: APROVADO
echo.

REM 2. Abrir OpenCode
echo [2/2] Abrindo OpenCode ...
echo.

%OPCODE_CMD%
