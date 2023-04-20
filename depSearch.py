import subprocess

def depSearch():
    deps = []
    with open('requirements.txt', 'r') as f:
        for line in f:
            deps.append(line.strip())
    with open('depSearch.txt', 'w') as f:
        for dep in deps:
            print('Searching for dependencies of ' + dep)
            cmd = ['pipdeptree', '-p', dep]
            subprocess.run(cmd, stdout=f)
         
if __name__ == "__main__":
    depSearch()
