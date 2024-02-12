@echo off
SETLOCAL

set LOCAL_DIR=C:\CloneData\myEducationBoard\src\assets\js\

cd /d %LOCAL_DIR%

git add NewTestData.xlsx 
git commit -m "test_data_28 updated HTC"
git push -u origin master 

echo Changes pushed successfully.

