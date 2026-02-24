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
     
      Data.aggregate([
        { $match: { country: { $ne: '' }, intensity: { $gt: 0 } } },
        { $group: { _id: '$country', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { avgIntensity: -1 } },
        { $limit: 15 }
      ]),
      
     
      Data.aggregate([
        { $match: { topic: { $ne: '' }, relevance: { $gt: 0 } } },
        { $group: { _id: '$topic', avgRelevance: { $avg: '$relevance' }, count: { $sum: 1 } } },
        { $sort: { avgRelevance: -1 } },
        { $limit: 10 }
      ]),
      
     
      Data.aggregate([
        { $match: { region: { $ne: '' }, likelihood: { $gt: 0 } } },
        { $group: { _id: '$region', avgLikelihood: { $avg: '$likelihood' }, count: { $sum: 1 } } },
        { $sort: { avgLikelihood: -1 } }
      ]),
      
      
      Data.aggregate([
        { $match: { end_year: { $ne: '' }, intensity: { $gt: 0 } } },
        { $group: { _id: '$end_year', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 20 }
      ]),
      
     
      Data.aggregate([
        { $match: { city: { $ne: '' } } },
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
     
      Data.aggregate([
        { $match: { sector: { $ne: '' } } },
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
   
      Data.aggregate([
        { $match: { region: { $ne: '' } } },
        { $group: { _id: '$region', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
     
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
        stats: stats[0] || { totalRecords: 0, avgIntensity: 0, avgRelevance: 0, avgLikelihood: 0 }
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Filter data
const filterData = async (req, res) => {
  try {
    const { endYear, topic, sector, region, pestle, source, swot, country, city } = req.body;
    
    console.log('=== FILTER REQUEST ===');
    console.log('Request body:', req.body);
    
    
    const baseQuery = {};
    
    if (endYear && endYear !== '') baseQuery.end_year = endYear;
    if (topic && topic !== '') baseQuery.topic = topic;
    if (sector && sector !== '') baseQuery.sector = sector;
    if (region && region !== '') baseQuery.region = region;
    if (pestle && pestle !== '') baseQuery.pestle = pestle;
    if (source && source !== '') baseQuery.source = source;
    if (swot && swot !== '') baseQuery.swot = swot;
    if (country && country !== '') baseQuery.country = country;
    if (city && city !== '') baseQuery.city = city;

    console.log('Base query:', JSON.stringify(baseQuery, null, 2));
    
    
    const testCount = await Data.countDocuments(baseQuery);
    console.log('Documents matching base query:', testCount);
    
    
    const sampleDocs = await Data.find(baseQuery).limit(3);
    console.log('Sample documents:', JSON.stringify(sampleDocs, null, 2));

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
        { 
          $match: { 
            ...baseQuery,
            ...(country ? {} : { country: { $ne: '', $exists: true } }),
            intensity: { $gt: 0, $exists: true } 
          } 
        },
        { $group: { _id: '$country', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { avgIntensity: -1 } },
        { $limit: 15 }
      ]),
      
      
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(topic ? {} : { topic: { $ne: '', $exists: true } }),
            relevance: { $gt: 0, $exists: true } 
          } 
        },
        { $group: { _id: '$topic', avgRelevance: { $avg: '$relevance' }, count: { $sum: 1 } } },
        { $sort: { avgRelevance: -1 } },
        { $limit: 10 }
      ]),
      
      
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(region ? {} : { region: { $ne: '', $exists: true } }),
            likelihood: { $gt: 0, $exists: true } 
          } 
        },
        { $group: { _id: '$region', avgLikelihood: { $avg: '$likelihood' }, count: { $sum: 1 } } },
        { $sort: { avgLikelihood: -1 } }
      ]),
      
     
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(endYear ? {} : { end_year: { $ne: '', $exists: true } }),
            intensity: { $gt: 0, $exists: true } 
          } 
        },
        { $group: { _id: '$end_year', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 20 }
      ]),
      
      
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(city ? {} : { city: { $ne: '', $exists: true } })
          } 
        },
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
     
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(sector ? {} : { sector: { $ne: '', $exists: true } })
          } 
        },
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
    
      Data.aggregate([
        { 
          $match: { 
            ...baseQuery,
            ...(region ? {} : { region: { $ne: '', $exists: true } })
          } 
        },
        { $group: { _id: '$region', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      
      Data.aggregate([
        { $match: baseQuery },
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

    console.log('=== FILTER RESULTS ===');
    console.log('Stats:', stats[0]);
    console.log('Intensity by Country:', intensityByCountry.length, 'items');
    console.log('Relevance by Topic:', relevanceByTopic.length, 'items');
    console.log('Likelihood by Region:', likelihoodByRegion.length, 'items');
    console.log('Trends by Year:', trendsByYear.length, 'items');
    console.log('City Distribution:', cityDistribution.length, 'items');
    console.log('Sector Distribution:', sectorDistribution.length, 'items');
    console.log('Region Distribution:', regionDistribution.length, 'items');

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
        stats: stats[0] || { totalRecords: 0, avgIntensity: 0, avgRelevance: 0, avgLikelihood: 0 }
      }
    });
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllData,
  getFilterOptions,
  getDashboardData,
  filterData
};
