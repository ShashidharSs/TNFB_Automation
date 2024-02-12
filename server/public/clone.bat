@echo off
SETLOCAL

REM Set your GitHub repository URL
set "GITHUB_REPO_URL=https://github.com/ShashidharSs/myEducationBoard.git"

REM Set your local directory for cloning the repository
set "LOCAL_DIR=C:\CloneData"

REM Step 1: Change directory to the desired location
cd /D "%LOCAL_DIR%"@echo off
SETLOCAL
 
REM Set your GitHub repository URL
set "GITHUB_REPO_URL=https://github.com/ShashidharSs/myEducationBoard.git"
 
REM Set your local directory for cloning the repository
set "LOCAL_DIR=C:\CloneData"
 
REM Step 1: Change directory to the desired location
cd /D "%LOCAL_DIR%"
 
REM Step 2: Clone the GitHub repository
git clone "%GITHUB_REPO_URL%"
 
REM Check if the clone was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to clone repository.
    GOTO :END
)
 
REM End of batch file
:END
EXIT /B %ERRORLEVEL%

REM Step 2: Clone the GitHub repository
git clone "%GITHUB_REPO_URL%"

REM Check if the clone was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to clone repository.
    GOTO :END
)

REM End of batch file
:END
EXIT /B %ERRORLEVEL%
