# 336-Final-Project
back and front end

Restore Terminals vs extension -> change settings.json (to automatically start):

 /*CSC 336*/

        {
        "splitTerminals": [
            {
            "name": "frontend",
            "commands": ["cd .\\database-final-projectfrontend\\database_frontend\\","npm install", "npm start"],
            }
        ]
        },
        {
        "splitTerminals": [
            {
            "name": "backend",
            "commands": ["cd .\\databases-final-project\\   ", "pdm install", "pdm run serve.py"]
            }
        ]
        }
