@echo off
REM ========================================
REM LIO FELIZ — Inicializacao Oficial (CMD)
REM ========================================
REM Ajuste OPCODE_CMD abaixo caso o executavel
REM esteja em outro local.
REM ========================================

setlocal enabledelayedexpansion

set CANONICAL_PATH=H:\lio feliz
set OPCODE_CMD=opencode.cmd

where %OPCODE_CMD% >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [AVISO] OpenCode nao encontrado no PATH.
    echo Tente usar tools\start-opencode.ps1 em vez deste script.
    echo.
    pause
    exit /b 1
)

echo ========================================
echo  LIO FELIZ — Inicializacao Oficial
echo ========================================
echo.

REM 1. Entrar no diretorio oficial
echo [1/7] Entrando em %CANONICAL_PATH% ...
cd /d "%CANONICAL_PATH%"
if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha ao acessar %CANONICAL_PATH%
    pause
    exit /b 1
)

REM 2. Validar git toplevel
echo [2/7] Validando git toplevel ...
for /f "delims=" %%i in ('git rev-parse --show-toplevel 2^>nul') do set TOPLEVEL=%%i
if "%TOPLEVEL%"=="" (
    echo [ERRO] Falha ao validar diretorio git.
    pause
    exit /b 1
)
REM Normalizar separadores para comparacao (git usa /, Windows usa \)
set TOPLEVEL_NORM=%TOPLEVEL:\=/%
set CANONICAL_NORM=%CANONICAL_PATH:\=/%
if /i not "%TOPLEVEL_NORM%"=="%CANONICAL_NORM%" (
    echo [ERRO] Git toplevel (%TOPLEVEL%) nao corresponde ao caminho canonico (%CANONICAL_PATH%^)
    pause
    exit /b 1
)
echo   OK: %TOPLEVEL%

REM 3. Validar remote
echo [3/7] Validando remote ...
for /f "delims=" %%i in ('git remote get-url origin 2^>nul') do set REMOTE=%%i
if "%REMOTE%"=="" (
    echo [ERRO] Remote nao configurado.
    pause
    exit /b 1
)
echo   OK: %REMOTE%

REM 4. Validar HEAD
echo [4/7] Obtendo HEAD ...
for /f "delims=" %%i in ('git rev-parse HEAD 2^>nul') do set HEAD=%%i
if "%HEAD%"=="" (
    echo [ERRO] Nao foi possivel obter HEAD.
    pause
    exit /b 1
)
echo   OK: %HEAD%

REM 5. Validar branch
echo [5/7] Validando branch ...
for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set BRANCH=%%i
echo   Branch: %BRANCH%

REM 6. Validar Working Tree
echo [6/7] Validando Working Tree ...
git status --porcelain >nul 2>nul
if %ERRORLEVEL% equ 0 (
    git status --porcelain | findstr /r /c:"." >nul
    if !ERRORLEVEL! equ 0 (
        echo   AVISO: Working Tree suja
        git status --short
    ) else (
        echo   OK: Working Tree limpa
    )
) else (
    echo   OK: Working Tree limpa
)

REM 7. Exibir resumo e abrir OpenCode
echo.
echo ========================================
echo  RESUMO DA SESSAO
echo ========================================
echo Workspace: %CANONICAL_PATH%
echo HEAD:      %HEAD%
echo Branch:    %BRANCH%
echo Remote:    %REMOTE%
echo.

echo [7/7] Abrindo OpenCode ...
echo.

%OPCODE_CMD%
