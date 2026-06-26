@echo off
title Vertex 3D Muze
cd /d "%~dp0"
echo. > baslat_log.txt
echo ==================================== >> baslat_log.txt
echo Vertex 3D Interaktif Muze >> baslat_log.txt
echo ==================================== >> baslat_log.txt
echo. >> baslat_log.txt

echo [*] Node.js kontrol ediliyor... >> baslat_log.txt
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadi! >> baslat_log.txt
    echo https://nodejs.org adresinden Node.js indirip kurun. >> baslat_log.txt
    pause
    exit /b
)
echo [OK] Node.js bulundu >> baslat_log.txt

echo [*] node_modules kontrol ediliyor... >> baslat_log.txt
if not exist "node_modules" (
    echo [*] npm install calistiriliyor... >> baslat_log.txt
    call npm install >> baslat_log.txt 2>&1
    if %errorlevel% neq 0 (
        echo [HATA] npm install basarisiz! >> baslat_log.txt
        pause
        exit /b
    )
    echo [OK] npm install tamam >> baslat_log.txt
) else (
    echo [OK] node_modules mevcut >> baslat_log.txt
)

echo [*] Vite baslatiliyor... >> baslat_log.txt
echo http://localhost:5173/muze.html >> baslat_log.txt
start http://localhost:5173/muze.html
call npx vite --host 0.0.0.0 --port 5173
pause
