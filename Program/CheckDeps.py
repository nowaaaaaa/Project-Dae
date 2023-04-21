import json

file = input("Enter the name of the file: ")

try:
    with open(f'{file}.json') as f:
        components = json.load(f)
except FileNotFoundError:
    print(f"Error: file '{file}.json' not found")
    exit(1)
except json.JSONDecodeError:
    print(f"Error: file '{file}.json' contains invalid JSON syntax")
    exit(1)

foundComponents = []

for c in components['components']:
    foundComponents.append({"name": c['name'], "version": c.get('version', '')})

output_file = f"foundDeps/{file}Deps.json"
try:
    with open(output_file, "x") as f:
        json.dump(foundComponents, f, indent=2)
except FileExistsError:
    print(f"Error: output file '{output_file}' already exists")
    exit(1)

print(f"Output written to file '{output_file}'")