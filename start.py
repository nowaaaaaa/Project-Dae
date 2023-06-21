import os
import webbrowser

# start python server
os.system('start cmd /k python Server/server.py /min')

# open child directory React
os.chdir('React')

# run npm install if needed
os.system('npm install')

# run react app
webbrowser.open('http://localhost:5173')
os.system('npm run dev')