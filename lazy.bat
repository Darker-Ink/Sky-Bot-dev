@echo off && title lazy github push

git pull
choice /d y /t 2 > nul
git add .
choice /d y /t 2 > nul
git commit -m "commit from lazy.bat"
choice /d y /t 2 > nul
git push origin Master
choice /d y /t 2 > nul