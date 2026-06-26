@echo off
chcp 65001 >nul
title Vertex 3D Muze

echo.
echo  ====================================
echo    Vertex 3D Interaktif Muze
echo  ====================================
echo.

:: Node.js kontrol
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadi!
    echo https://nodejs.org adresinden Node.js indirip kurun.
    pause
    exit /b 1
)

:: Dependencies kontrol
if not exist "node_modules\" (
    echo [*] Bagimliliklar yukleniyor...
    call npm install
    echo.
)

:: Vite dev server baslat
echo [*] Vite dev server baslatiliyor...
echo [*] Mobil test: agdaki IP adresinizle baglanabilirsiniz
echo.
echo   >>> http://localhost:5173/muze.html <<<
echo.
call npx vite --host 0.0.0.0 --port 5173

pause
