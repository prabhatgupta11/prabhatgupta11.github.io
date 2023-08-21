const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const Manufacturer = sequelize.define('manufacturer_master', {
        manufacturerId: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        shortDescription : {
            type : DataTypes.TEXT,
          
        },
        longDescription : {
            type : DataTypes.TEXT,
            
        },
        approve_b : {
            type : DataTypes.STRING,
        },
        approve_by : {
            type : DataTypes.STRING,
        },
        approve_date : {
            type : DataTypes.DATE,
        }
    
    })

    return Manufacturer
}