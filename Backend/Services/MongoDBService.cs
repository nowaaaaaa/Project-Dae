using MongoExample.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoExample.Services;

public class MongoDBService
{
    private readonly IMongoCollection<SBOM> _SBOMCollection;
    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _SBOMCollection = database.GetCollection<SBOM>(mongoDBSettings.Value.CollectionName);
    }
    public async Task<List<SBOM>> GetAsync()
    {
        return await _SBOMCollection.Find(new BsonDocument()).ToListAsync();
    }
}