# Installation:

Make sure the Python packages 'pymongo', 'Flask' and 'Flask_Cors' are installed:

```python
pip install pymongo
pip install Flask
pip install Flask_Cors
```

To use the script that creates an SBOM and uploads it to MongoDB, make sure to install [Syft](https://github.com/anchore/syft) and [Docker](https://docs.docker.com/engine/install/).

# MongoDB Setup:

If needed, create an account [here](https://www.mongodb.com/cloud/atlas/register)

After creating an account, create a new cluster with a name of choice, within this cluster, create a new database with a name of choice and create two collections, one for your SBOMs and one for your filters.

After creating the cluster, click on 'Connect' and then 'Connect your application'. Copy the connection string and paste it in the 'server.py' file in the 'Server' folder. Replace the username and password to your own access account, found at cloud.mongodb.com/v2/yourMongoDBLink/security/database/users.

# Usage:

Run the following command in the main directory:

```python
python start.py
```

This will start the Python Server, the React Application and open your browser to the correct page.

Alternatively, if the command does not work accordingly you can use the following commands in two seperate terminals:

React Terminal:

```typescript
cd React
npm install
npm run dev
```

Python Terminal:

```python
cd Server
python server.py
```

To upload new SBOMs to the database, you can use a script located in the PythonScripts folder:

```
cd PythonScripts
```

To build a Docker image, use:

```
docker build . -t mongoscript
```

To build a container and run it, use:

```
docker run --rm mongoscript <image name>
```

To run the script directly, use:

```
pip install -r requirements.txt
py MongoScript.py <image name>
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
