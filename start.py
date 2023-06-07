import os
import webbrowser

#open child directory React
os.chdir('React')
#run npm install if needed
os.system('npm install')

os.system('start cmd /k py server.py /min')

webbrowser.open('http://localhost:5173')
os.system('npm run dev')