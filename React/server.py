from flask import Flask
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

@app.route('/api/<database>/<collection>/dependencies')
def get_dependencies(database, collection):
    # Connect to the MongoDB server
    client = MongoClient(uri)

    db = client[database]

    collection = db[collection]

    dependencies = {}

    for dependency in collection.find():
        dependencies[dependency.get('name')] = dependency.get('version')

    return dependencies

if __name__ == '__main__':
    app.run()