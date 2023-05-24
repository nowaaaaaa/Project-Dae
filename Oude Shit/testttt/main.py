import os
import shutil
import uuid
import json

rootFolderPath = os.getcwd()
outputFolderName = "syft_packages"
outputFolderPath = os.path.join(rootFolderPath, outputFolderName)
syftFormat = "cyclonedx-json"
    # json: Use this to get as much information out of Syft as possible!
    # text: A row-oriented, human-and-machine-friendly output.
    # cyclonedx-xml: A XML report conforming to the CycloneDX 1.4 specification.
    # cyclonedx-json: A JSON report conforming to the CycloneDX 1.4 specification.
    # spdx-tag-value: A tag-value formatted report conforming to the SPDX 2.3 specification.
    # spdx-tag-value@2.2: A tag-value formatted report conforming to the SPDX 2.2 specification.
    # spdx-json: A JSON report conforming to the SPDX 2.3 JSON Schema.
    # spdx-json@2.2: A JSON report conforming to the SPDX 2.2 JSON Schema.
    # github: A JSON report conforming to GitHub's dependency snapshot format.
    # table: A columnar summary (default).
    # template: Lets the user specify the output format. See "Using templates" below.

# Deletes the directory if it already exists and creates a new empty directory to store the syft packages in
if os.path.exists("syft_packages"):
    shutil.rmtree("syft_packages")
os.mkdir("syft_packages")

# Run syft on the current directory
os.system(f"syft packages dir:{rootFolderPath} -o {syftFormat} --file {outputFolderPath}/syft_packages.json")

# Loop through the files in the current directory
fileList = os.listdir()
for fileName in fileList:
    # Check if the file is a zip file
    if fileName.endswith(".zip"):
        # Run syft on the zip file
        filePath = os.path.join(rootFolderPath, fileName)
        syftCommand = f"syft packages file:{filePath} -o {syftFormat} --file {outputFolderPath}/{uuid.uuid4()}.json"
        os.system(syftCommand)

# Load the main json file
jsonFile = os.path.join(outputFolderPath, outputFolderName + ".json")
with open(jsonFile) as f:
    mainData = json.load(f)
packages = [component["name"] for component in mainData["components"]]

# Combining all the sboms into one json file
# Loop through the sboms in the output folder
sboms = os.listdir(outputFolderPath)
for sbom in sboms:
    # If the sbom is not the main json file
    if sbom != outputFolderName + ".json":
        sbomPath = os.path.join(outputFolderPath, sbom)
        with open(sbomPath) as f:
            sbomData = json.load(f)
        components = sbomData["components"]
        # Loop through the components in the sbom
        for component in components:
            name = component["name"]
            # Check if the component is already in the main json file
            if (name not in packages):
                mainData["components"].append(component)
                packages.append(name)
                json.dump(mainData, open(jsonFile, "w"), indent = 2)


# How to add a new component to the json file
# data["components"].append(data["components"][0])
# json.dump(data, open("syft_packages\\test.json", "w"), indent = 2)

# How to remove the last component from the json file
# data["components"].pop()
# json.dump(data, open("syft_packages\\test.json", "w"), indent = 2)