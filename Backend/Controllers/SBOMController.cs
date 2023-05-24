using System;
using Microsoft.AspNetCore.Mvc;
using MongoExample.Models;
using MongoExample.Services;

namespace MongoExample.Controllers;

[Controller]
[Route("api/[controller]")]
public class SBOMController : Controller
{
    private readonly MongoDBService _mongoDBService;

    public SBOMController(MongoDBService mongoDBService)
    {
        _mongoDBService = mongoDBService;
    }
    [HttpGet]
    public async Task<List<SBOM>> Get()
    {
        return await _mongoDBService.GetAsync();
    }
}