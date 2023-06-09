from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# username = "burak"
# password = "Jpw8Aq2GU2oAQaUI"
# uri = f"mongodb+srv://{username}:{password}@mongo1.wlbtqtb.mongodb.net/?retryWrites=true&w=majority"

# @app.route('/api/data')
# def get_data():
#     return {'message': 'Hello from Python!'}

# @app.route('/api/databases')
# def get_databases():
#     # Connect to the MongoDB server
#     client = MongoClient(uri)

#     databases = client.list_database_names()

#     return databases

# @app.route('/api/<database>/collections')
# def get_collections(database):
#     # Connect to the MongoDB server
#     client = MongoClient(uri)

#     db = client[database]

#     collections = db.list_collection_names()

#     return collections

# @app.route('/api/<database>/<collection>/dependencies/<depName>/<vStart>/<vEnd>')
# def get_dependencies(database, collection, depName, vStart, vEnd):
#     # Connect to the MongoDB server
#     client = MongoClient(uri)

#     db = client[database]

#     collection = db[collection]

#     foundDeps = []

#     if ("." in vStart):
#         vSplitS = vStart.split(".")
#     else:
#         vSplitS = False
#     if ("." in vEnd):
#         vSplitE = vEnd.split(".")
#     else:
#         vSplitE = False

#     for image in collection.find():
#         deps = image.get("dependencies")
#         foundDeps.append({"dependencies": [], "name": image.get("name")})
#         for dep in deps:
#             if (dep.get("name") == depName or depName == "any"):
#                 if ("." in dep.get("version")):
#                     vSplitD = dep.get("version").split(".")
#                     if ("." not in vStart and vEnd == "any" and int(vStart) <= int(vSplitD[0])):
#                         output = {
#                             "name": dep.get("name"),
#                             "version": dep.get("version"),
#                             "purl": dep.get('purl')
#                         }
#                         foundDeps[-1]["dependencies"].append(output)
#                     elif ("." not in vEnd and vStart == "any" and int(vEnd) >= int(vSplitD[0])):
#                         output = {
#                             "name": dep.get("name"),
#                             "version": dep.get("version"),
#                             "purl": dep.get('purl')
#                         }
#                         foundDeps[-1]["dependencies"].append(output)
#                     elif (vSplitS is not False and vSplitE is not False):
#                         if (int(vSplitS[0]) <= int(vSplitD[0]) <= int(vSplitE[0])):
#                             if (len(vSplitS) > 1 and len(vSplitD) > 1 and int(vSplitS[1]) <= int(vSplitD[1]) <= int(vSplitE[1])):
#                                 if (len(vSplitS) > 2 and len(vSplitD) > 2 and int(vSplitS[2]) <= int(vSplitD[2]) <= int(vSplitE[2])):
#                                     if (len(vSplitS) > 3 and len(vSplitD) > 3 and int(vSplitS[3]) <= int(vSplitD[3]) <= int(vSplitE[3])):
#                                         output = {
#                                             "name": dep.get("name"),
#                                             "version": dep.get("version"),
#                                             "purl": dep.get('purl')
#                                         }
#                                         foundDeps[-1]["dependencies"].append(output)
#                             elif (len(vSplitS) == 1 and len(vSplitD) == 1):
#                                 output = {
#                                     "name": dep.get("name"),
#                                     "version": dep.get("version"),
#                                     "purl": dep.get('purl')
#                                 }
#                                 foundDeps[-1]["dependencies"].append(output)
#                 elif ((vStart <= dep.get("version") <= vEnd) and (vStart != "any" and vEnd != "any")):
#                     output = {
#                         "name": dep.get("name"),
#                         "version": dep.get("version"),
#                         "purl": dep.get('purl')
#                     }
#                     foundDeps[-1]["dependencies"].append(output)
#                 elif (vStart == "any" and vEnd == "any"):
#                     output = {
#                         "name": dep.get('name'),
#                         "version": dep.get('version'),
#                         "purl": dep.get('purl')
#                     }
#                     foundDeps[-1]["dependencies"].append(output)
#                 elif (vStart == "any" and (dep.get("version") <= vEnd)):
#                     output = {
#                         "name": dep.get('name'),
#                         "version": dep.get('version'),
#                         "purl": dep.get('purl')
#                     }
#                     foundDeps[-1]["dependencies"].append(output)
#                 elif (vEnd == "any" and (dep.get("version") >= vStart)):
#                     output = {
#                         "name": dep.get('name'),
#                         "version": dep.get('version'),
#                         "purl": dep.get('purl')
#                     }
#                     foundDeps[-1]["dependencies"].append(output)


#     return jsonify(foundDeps)

# NIET CALLEN ZONDER GETALLEN IN START OF END
def compareVersions(version, start, end):
    less = False
    more = False
    version = splitVersion(version)
    if (start == "any"):
        more = True
    else:
        start = splitVersion(start)
    if (end == "any"):
        less = True
    else:
        end = splitVersion(end)
    if (version == []):
        return False
    for i in range(len(version)):
        if not more and ((i == len(version)-1 and len(version) < len(start) and version[i] == start[i]) or int(start[i]) > int(version[i])):
            return False
        if not less and ((i == len(end)-1 and len(end) < len(version) and version[i] == end[i]) or int(end[i]) < int(version[i])):
            return False
        if not more and (int(version[i]) > int(start[i]) or (version[i] == start[i] and len(version) > len(start) and i == len(start)-1)):
            more = True
        if not less and (int(version[i]) < int(end[i]) or (version[i] == end[i] and len(version) < len(end) and i == len(version)-1)):
            less = True
        if (more and less):
            return True
    return True

def splitVersion(version):
    res = []
    tempres = ""
    for i in version:
        if (i.isdigit()):
            tempres += i
        elif tempres != "":
            res.append(tempres)
            tempres = ""
    if tempres != "":
        res.append(tempres)
    return res

# while True:
#     print(compareVersions(input(": "), input(": "), input(": ")))



# if __name__ == '__main__':
#     app.run()