import os
import webbrowser

os.system('start cmd /k py Server/server.py /min')
#open child directory React
os.chdir('React')
#run npm install if needed
os.system('npm install')

webbrowser.open('http://localhost:5173')
os.system('npm run dev')