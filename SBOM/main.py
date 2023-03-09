#python -m pip install pysimplegui
import PySimpleGUI as sg

layout = [[sg.Text("We gaan SBOMbarderen.")], [sg.Button("OK DOE DAN")]]

window = sg.Window(title="SBOMGUI", layout=layout, margins=(600, 300))

while True:
    event, values = window.read()
    if event == "OK DOE DAN" or event == sg.WIN_CLOSED:
        break

window.close()