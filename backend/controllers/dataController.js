const Data = require('../models/Data');

// Get all data
const getAllData = async (req, res) => {
  try {
    const data = await Data.find({}).limit(1000);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get filter options
const getFilterOptions = async (req, res) => {
  try {
    const [endYears, topics, sectors, regions, pestles, sources, swots, countries, cities] = await Promise.all([
      Data.distinct('end_year').then(arr => arr.filter(v => v)),
      Data.distinct('topic').then(arr => arr.filter(v => v)),
      Data.distinct('sector').then(arr => arr.filter(v => v)),
      Data.distinct('region').then(arr => arr.filter(v => v)),
      Data.distinct('pestle').then(arr => arr.filter(v => v)),
      Data.distinct('source').then(arr => arr.filter(v => v)),
      Data.distinct('swot').then(arr => arr.filter(v => v)),
      Data.distinct('country').then(arr => arr.filter(v => v)),
      Data.distinct('city').then(arr => arr.filter(v => v))
    ]);

    res.json({
      success: true,
      filters: {
        endYears: endYears.sort(),
        topics: topics.sort(),
        sectors: sectors.sort(),
        regions: regions.sort(),
        pestles: pestles.sort(),
        sources: sources.sort(),
        swots: swots.sort(),
        countries: countries.sort(),
        cities: cities.sort()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard aggregated data
const getDashboardData = async (req, res) => {
  try {
    const [
      intensityByCountry,
      relevanceByTopic,
      likelihoodByRegion,
      trendsByYear,
      cityDistribution,
      sectorDistribution,
      regionDistribution,
      stats
    ] = await Promise.all([
      // Intensity by Country
      Data.aggregate([
        { $match: { country: { $ne: '' }, intensity: { $gt: 0 } } },
        { $group: { _id: '$country', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { avgIntensity: -1 } },
        { $limit: 15 }
      ]),
      
      // Relevance by Topic
      Data.aggregate([
        { $match: { topic: { $ne: '' }, relevance: { $gt: 0 } } },
        { $group: { _id: '$topic', avgRelevance: { $avg: '$relevance' }, count: { $sum: 1 } } },
        { $sort: { avgRelevance: -1 } },
        { $limit: 10 }
      ]),
      
      // Likelihood by Region
      Data.aggregate([
        { $match: { region: { $ne: '' }, likelihood: { $gt: 0 } } },
        { $group: { _id: '$region', avgLikelihood: { $avg: '$likelihood' }, count: { $sum: 1 } } },
        { $sort: { avgLikelihood: -1 } }
      ]),
      
      // Trends by Year
      Data.aggregate([
        { $match: { end_year: { $ne: '' }, intensity: { $gt: 0 } } },
        { $group: { _id: '$end_year', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 20 }
      ]),
      
      // City Distribution
      Data.aggregate([
        { $match: { city: { $ne: '' } } },
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
      // Sector Distribution
      Data.aggregate([
        { $match: { sector: { $ne: '' } } },
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // Region Distribution
      Data.aggregate([
        { $match: { region: { $ne: '' } } },
        { $group: { _id: '$region', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // Overall Stats
      Data.aggregate([
        {
          $group: {
            _id: null,
            totalRecords: { $sum: 1 },
            avgIntensity: { $avg: '$intensity' },
            avgRelevance: { $avg: '$relevance' },
            avgLikelihood: { $avg: '$likelihood' }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        intensityByCountry,
        relevanceByTopic,
        likelihoodByRegion,
        trendsByYear,
        cityDistribution,
        sectorDistribution,
        regionDistribution,
        stats: stats[0] || {}
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Filter data
// Filter data (FIXED VERSION)
const filterData = async (req, res) => {
  try {
    const {
      endYear,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city
    } = req.body;

    const query = {};

    // Use case-insensitive regex for strings
    if (endYear && endYear !== "All")
      query.end_year = Number(endYear);

    if (topic && topic !== "All")
      query.topic = { $regex: `^${topic.trim()}$`, $options: "i" };

    if (sector && sector !== "All")
      query.sector = { $regex: `^${sector.trim()}$`, $options: "i" };

    if (region && region !== "All")
      query.region = { $regex: `^${region.trim()}$`, $options: "i" };

    if (pestle && pestle !== "All")
      query.pestle = { $regex: `^${pestle.trim()}$`, $options: "i" };

    if (source && source !== "All")
      query.source = { $regex: `^${source.trim()}$`, $options: "i" };

    if (swot && swot !== "All")
      query.swot = { $regex: `^${swot.trim()}$`, $options: "i" };

    if (country && country !== "All")
      query.country = { $regex: `^${country.trim()}$`, $options: "i" };

    if (city && city !== "All")
      query.city = { $regex: `^${city.trim()}$`, $options: "i" };

    const [
      intensityByCountry,
      relevanceByTopic,
      likelihoodByRegion,
      trendsByYear,
      cityDistribution,
      sectorDistribution,
      regionDistribution,
      stats
    ] = await Promise.all([
      Data.aggregate([
        { $match: { ...query, country: { $ne: "" }, intensity: { $gt: 0 } } },
        { $group: { _id: "$country", avgIntensity: { $avg: "$intensity" }, count: { $sum: 1 } } },
        { $sort: { avgIntensity: -1 } },
        { $limit: 15 }
      ]),

      Data.aggregate([
        { $match: { ...query, topic: { $ne: "" }, relevance: { $gt: 0 } } },
        { $group: { _id: "$topic", avgRelevance: { $avg: "$relevance" }, count: { $sum: 1 } } },
        { $sort: { avgRelevance: -1 } },
        { $limit: 10 }
      ]),

      Data.aggregate([
        { $match: { ...query, region: { $ne: "" }, likelihood: { $gt: 0 } } },
        { $group: { _id: "$region", avgLikelihood: { $avg: "$likelihood" }, count: { $sum: 1 } } },
        { $sort: { avgLikelihood: -1 } }
      ]),

      Data.aggregate([
        { $match: { ...query, end_year: { $ne: "" }, intensity: { $gt: 0 } } },
        { $group: { _id: "$end_year", avgIntensity: { $avg: "$intensity" }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 20 }
      ]),

      Data.aggregate([
        { $match: { ...query, city: { $ne: "" } } },
        { $group: { _id: "$city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),

      Data.aggregate([
        { $match: { ...query, sector: { $ne: "" } } },
        { $group: { _id: "$sector", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      Data.aggregate([
        { $match: { ...query, region: { $ne: "" } } },
        { $group: { _id: "$region", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      Data.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalRecords: { $sum: 1 },
            avgIntensity: { $avg: "$intensity" },
            avgRelevance: { $avg: "$relevance" },
            avgLikelihood: { $avg: "$likelihood" }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        intensityByCountry,
        relevanceByTopic,
        likelihoodByRegion,
        trendsByYear,
        cityDistribution,
        sectorDistribution,
        regionDistribution,
        stats:
          stats[0] || {
            totalRecords: 0,
            avgIntensity: 0,
            avgRelevance: 0,
            avgLikelihood: 0
          }
      }
    });

  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};