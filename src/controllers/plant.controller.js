const sequelize = require('../config/database');
const Plant = require('../models/plant.model');
const axios = require('axios');
require('dotenv').config();

const getPlant = async (req, res) =>{
    try {
        const { token, name } = req.query;
        const decodificateName = decodeURIComponent(name);
        const plant = await Plant.findOne({
            where:{ name:  decodificateName }
        });

        if(!plant){
            const response = await axios.get(`https://plant.id/api/v3/kb/plants/:${token}-?details=common_names,description,taxonomy,image`, {
                headers: {
                    'Api-Key': process.env.API_KEY
                }
            });

            const data = await response.data;
            const newPlant = await Plant.create({
                name: data.name,
                taxonomy_class: data.taxonomy.class,
                genus: data.taxonomy.genus,
                taxonomy_order: data.taxonomy.order,
                family: data.taxonomy.family,
                phylum: data.taxonomy.phylum,
                kingdom: data.taxonomy.kingdom,
                description: data.description.value,
                image: data.image.value,
                access_token: token
            });

            return res.json(newPlant);
        }
        
        res.json(plant);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const getPlants = async (req, res) =>{
    try {
        const { keyword } = req.query;

        const response = await axios.get(`https://plant.id/api/v3/kb/plants/name_search?q=${keyword}&language=es&thumbnails=true&limit=20`, {
            headers: {
                'Api-Key': process.env.API_KEY
            }
        });

        const data = await response.data.entities;
        const filteredData = data.map((plant, i)=>({
            order: i + 1,
            name: plant.entity_name,
            img: plant.thumbnail,
            access_token: plant.access_token
        }));
        res.json(filteredData);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const postIdentification = async (req, res)=>{
    try {
        const { images, latitude, longitude, similar_images } = req.body;
        const response = await axios.post(`https://plant.id/api/v3/identification?details=description,common_names&language=es`, {
            images,
            latitude,
            longitude,
            similar_images
        }, {
            headers: {
                'Api-Key': process.env.API_KEY
            }
        });
        const data = response.data.result.classification.suggestions;
        res.json(data);
    } catch (error) {
        res.status(500).json({error : error.message});
    }    
}

const getFamilies = async (req, res) =>{
    try {
        const families = await sequelize.query('SELECT * FROM get_families();');
        res.json(families[0]);
    } catch (error) {
        res.status(500).json({error : error.message}); 
    }
}

module.exports = {
    getPlant,
    getPlants,
    postIdentification,
    getFamilies
}