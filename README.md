# Moody
## Initial Backend setup
1. Requires python 3.6+
2. Using a virtual environment is recommended (I think that pycharm does it for you). See https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/ to learn how to make your virtual enviorment and how to activate it.
3. Navigate to the backend folder
4. Run ```pip3 install -r requirements.txt``` in order to install the required libraries.

## Runnig the Backend server
To run the backend server run the following command ```uvicorn main:app --reload```

## Initial Frontend setup
Generally the node_modules folder (which contains all the packages for the project) is ignored in github because it contains a lot of packages, so you will have to install the packages locally. In order to do that, get Node.js (if you don't have it) for the npm (node package manager), then access the repo via the Command Prompt, and do "npm install". This will install all the packages. After that, do this other command "npm start".
