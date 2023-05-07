from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
uri = "mongodb+srv://kieranvdheijden:Pass@mongo1.wlbtqtb.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection

sbom = input("Enter the name of the SBOM file: ")

file = open(sbom + ".json", "r")

try:
    client.get_database('SBOMs').create_collection(sbom)
    client.get_database('SBOMs').get_collection(sbom).insert_many(json.load(file))
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)