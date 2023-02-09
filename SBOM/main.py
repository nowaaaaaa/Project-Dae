import PySimpleGUI as sg

layout = [[sg.Text("Hello from PySimpleGUI")], [sg.Button("OK")]]

sg.Window(title="SBOMGUI", layout=layout, margins=(600, 300)).read()
