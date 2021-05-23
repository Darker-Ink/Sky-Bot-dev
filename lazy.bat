@echo off && title lazy github push

git pull
choice /d y /t 1 > nul
git add .
choice /d y /t 1 > nul
git commit -m "commit from lazy.bat"
choice /d y /t 1 > nul
git push origin main