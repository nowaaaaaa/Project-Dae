#python -m pip install pysimplegui
import PySimpleGUI as sg

layout = [[sg.Text("We gaan SBOMbarderen.")], [sg.Button("OK DOE DAN")]]

sg.Window(title="SBOMGUI", layout=layout, margins=(600, 300)).read()
