from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

username = "burak"
password = "Jpw8Aq2GU2oAQaUI"
uri = f"mongodb+srv://{username}:{password}@mongo1.wlbtqtb.mongodb.net/?retryWrites=true&w=majority"

@app.route('/api/data')
def get_data():
    return {'message': 'Hello from Python!'}

@app.route('/api/databases')
def get_databases():
    # Connect to the MongoDB server
    client = MongoClient(uri)

    databases = client.list_database_names()

    return databases

@app.route('/api/<database>/collections')
def get_collections(database):
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client[database]

    collections = db.list_collection_names()

    return collections

@app.route('/api/<database>/<collection>/dependencies/<depName>/<vStart>/<vEnd>')
def get_dependencies(database, collection, depName, vStart, vEnd):
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client[database]

    collection = db[collection]

    foundDeps = []

    if ("." in vStart):
        vSplitS = vStart.split(".")
    else:
        vSplitS = False
    if ("." in vEnd):
        vSplitE = vEnd.split(".")
    else:
        vSplitE = False

    for image in collection.find():
        deps = image.get("dependencies")
        foundDeps.append({"dependencies": [], "name": image.get("name")})
        for dep in deps:
            if (depName in dep.get("name") or depName == "any"):
                result = {
                    "name": dep.get("name"),
                    "version": dep.get("version"),
                    "purl": dep.get("purl"),
                }
                foundDeps[-1]["dependencies"].append(result)


    return jsonify(foundDeps)

if __name__ == '__main__':
    app.run()