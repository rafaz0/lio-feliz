@echo off
SetLocal
Set LOVABLE_SANDBOX=1
Set DEV_SERVER__PROJECT_PATH=C:\Users\rafae\AppData\Local\Temp\opencode\lio-feliz
cd /d C:\Users\rafae\AppData\Local\Temp\opencode\lio-feliz
"C:\Program Files\nodejs\node.exe" "node_modules\vite/bin/vite.js" dev --port 4182 --host 127.0.0.1 > ".dev_run.log" 2>&1
