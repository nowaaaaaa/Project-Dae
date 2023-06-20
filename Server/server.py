from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import versionCompare as vc

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

    for image in collection.find():
        deps = image.get("dependencies")
        foundDeps.append({"dependencies": [], "name": image.get("name")})
        for dep in deps:
            if (depName in dep.get("name") or depName == "any"):
                if (vc.compareVersions(dep.get("version"), vStart, vEnd)):
                    result = {
                        "name": dep.get("name"),
                        "version": dep.get("version"),
                        "purl": dep.get("purl"),
                    }
                    foundDeps[-1]["dependencies"].append(result)


    return jsonify(foundDeps)

@app.route('/api/sbomTest/filters/getNames')
def get_names():
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client["sbomTest"]

    collection = db["filters"]

    names = []

    for image in collection.find():
        names.append(image.get("name"))

    return jsonify(names)

@app.route('/api/sbomTest/filters/postFilter', methods=['POST'])
def post_filter():
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client["sbomTest"]

    collection = db["filters"]

    name = request.json.get("name")

    collection.insert_one({
        "name": name,
        "filter": []
    })

    return jsonify({"message": "Post Successful"})

@app.route('/api/sbomTest/filters/getFilter/<name>')
def get_filter(name):
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client["sbomTest"]

    collection = db["filters"]

    filter = collection.find_one({"name": name})

    values = []

    for val in filter["filter"]:
        values.append(val)

    # val = {
    #     "name": filter["filter"]["name"],
    #     "versions": filter["filter"]["versions"],
    # }

    return jsonify(values[0])

@app.route('/api/sbomTest/filters/patchFilter', methods=['POST'])
def patch_filter():
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client["sbomTest"]

    collection = db["filters"]

    data = request.get_json()

    name = data.get("name")
    filter = data.get("versions")
    filter = [x for x in filter if x["name"] != ""]

    # Remove empty entries
    for dependency in filter:
        dependency["versions"]["versions"] = [x for x in dependency["versions"]["versions"] if x != ""]
        dependency["versions"]["ranges"] = [x for x in dependency["versions"]["ranges"] if x[0] != "" and x[1] != ""]

    collection.update_one(
        {
            "name": name
        },
        {
            "$set": {
                "filter": [
                    filter
                ]
            }
        }
    )

    return jsonify({"message": "Patch Successful"})

@app.route('/api/sbomTest/useFilter/<name>')
def use_filter(name):
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client["sbomTest"]

    filters_collection = db["filters"]
    images_collection = db["deps"]

    selected_filter = filters_collection.find_one({"name": name})["filter"][0]

    found_dependencies = []

    for dependency in selected_filter:
        if (dependency["name"] == ""):
            continue
        matches = images_collection.aggregate([
            {
                "$match": {
                    "dependencies.name": dependency["name"]
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "name": 1,
                    "dependencies": {
                        "$filter": {
                            "input": "$dependencies",
                            "as": "dep",
                            "cond": {"$eq": ["$$dep.name", dependency["name"]]}
                        }
                    }
                }
            }
        ])
        
        for match in matches:
            for dep in found_dependencies:
                if (dep["name"] == match["name"]):
                    dep["dependencies"].append(match["dependencies"][0])
                    break
            else:
                found_dependencies.append(match)

    output = []

    for image in found_dependencies:
        for dependency in image["dependencies"]:
            for filter in selected_filter:
                if (dependency["name"] == filter["name"]):
                    if (len(filter["versions"]["versions"]) == 0 and len(filter["versions"]["ranges"]) == 0):
                        if (image not in output):
                            output.append(image)
                    else:
                        if (dependency["version"] in filter["versions"]["versions"]):
                            if (image not in output):
                                output.append(image)
                        else:
                            for range in filter["versions"]["ranges"]:
                                if (vc.compareVersions(dependency["version"], range[0], range[1])):
                                    if (image not in output):
                                        output.append(image)

    #Code om de dependencies te filteren op versie met specifieke versies in filter.versions.versions (=String[]) en ranges in filter.versions.ranges (=String[String, String][])

    return jsonify(output)

if __name__ == '__main__':
    app.run()