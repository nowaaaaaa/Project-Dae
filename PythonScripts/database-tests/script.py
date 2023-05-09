from pymongo import MongoClient
import json

def main():
    username = "burak"
    password = "Jpw8Aq2GU2oAQaUI"
    uri = f"mongodb+srv://{username}:{password}@mongo1.wlbtqtb.mongodb.net/?retryWrites=true&w=majority"

    # Connect to the MongoDB server
    client = MongoClient(uri)

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Select the database and GridFS collection
        databases = client.list_database_names()
        db = client["SBOMs"]

        collections = db.list_collection_names()
        
        for collection in collections:
            for dependency in db[collection].find():
                print(f"{collection}: {dependency.get('name')}=={dependency.get('version')}")
    except Exception as e:
        print(e)

    # Close the connection
    client.close()

if __name__ == "__main__":
    main()