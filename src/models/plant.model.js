const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plant = sequelize.define('Plant', {
    id_plant: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxonomy_class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxonomy_order: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phylum: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kingdom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token:{
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: 'plant',
        timestamps: false
    }
);

module.exports = Plant;