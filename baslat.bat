@echo off
title Vertex 3D Muze

echo.
echo  ====================================
echo    Vertex 3D Interaktif Muze
echo  ====================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadi!
    echo https://nodejs.org adresinden Node.js indirip kurun.
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [*] Bagimliliklar yukleniyor...
    call npm install
    if %errorlevel% neq 0 (
        echo [HATA] npm install basarisiz!
        pause
        exit /b
    )
    echo.
)

echo [*] Vite dev server baslatiliyor...
echo.
echo     >>> http://localhost:5173/muze.html <<<
echo.
echo Mobil test icin agdaki IP adresini kullanin.
echo Cikmak icin CTRL+C yapin.
echo.

call npx vite --host 0.0.0.0 --port 5173
pause
