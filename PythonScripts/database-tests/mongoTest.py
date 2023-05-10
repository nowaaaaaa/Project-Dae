from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
import os
import sys
uri = "mongodb+srv://kieranvdheijden:Pass@mongo1.wlbtqtb.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
def syft(Image):
    Image = Image.lower()

    if (client.get_database('sbomTest').get_collection(f"deps").find_one({"name": Image})) != None:
        print("SBOM already exists in database")
        exit(1)

    os.system(f"syft {Image} -o cyclonedx-json > {Image}Deps.json")

    fileName = f"{Image}Deps.json"

    try:
        with open(fileName) as f:
            components = json.load(f)
    except FileNotFoundError:
        print(f"Error: file '{fileName}' not found")
        exit(1)
    except json.JSONDecodeError:
        print(f"Error: file '{fileName}' contains invalid JSON syntax")
        exit(1)

    foundComponents = []

    for c in components['components']:
        foundComponents.append({"name": c['name'], "version": c.get('version', '')})

    upload = {
        "name": Image,
        "dependencies": foundComponents
    }

    try:
        client.get_database('sbomTest').get_collection(f"deps").insert_one(upload)
        print("Successfully added to MongoDB")
    except Exception as e:
        print(e)
    os.remove(f"{Image}Deps.json")
    print("Successfully removed file")

#syft(input("Enter the name of the file: "))
if len(sys.argv) != 2:
    raise Exception("Error: give one argument (image name)")
syft(sys.argv[1])