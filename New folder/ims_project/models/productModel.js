const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('products', {
        itemId: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        externalitemId: {
            type: DataTypes.BIGINT(20),
            default:-1
        },
        itemName : {
            type : DataTypes.STRING(255),
        },
        shortName : {
            type : DataTypes.STRING(255)
        },
        length : {
            type : DataTypes.STRING(150)
        },
        breadth : {
            type : DataTypes.STRING(150)
        },
        height : {
            type : DataTypes.STRING(150)
        },
        weight : {
            type : DataTypes.STRING(150)
        },
        width : {
            type : DataTypes.STRING(150)
        },
        box : {
            type : DataTypes.STRING(255)
        },
        rack : {
            type : DataTypes.STRING(250)
        },
        foodType : {
            type : DataTypes.STRING(250)
        },
        taxId : {
            type : DataTypes.STRING(255)
        },
        imageUrl : {
            type : DataTypes.TEXT
        },
        decimalsAllowed : {
            type : DataTypes.STRING(250)
        },
        status : {
            type : DataTypes.STRING(100)
        },
        itemProductTaxType : {
            type : DataTypes.STRING(255)
        },
        fulfilmentMode : {
            type : DataTypes.STRING(255)
        },
        isReturnable : {
            type : DataTypes.STRING(50)
        },
        isCancellable : {
            type : DataTypes.STRING(50)
        },
        returnPeriod : {
            type : DataTypes.STRING(50)
        },
        description : {
            type : DataTypes.TEXT
        },
        detailedDescription : {
            type : DataTypes.TEXT
        },
        weightGrams : {
            type : DataTypes.STRING(255)
        },
        appliesOnline : {
            type : DataTypes.STRING(255)
        },
        itemProductType : {
            type : DataTypes.STRING(255)
        },
        itemTaxType : {
            type : DataTypes.STRING(50)
        },
        iBarU : {
            type : DataTypes.STRING(255)
        },
        manufacturerId : {
            type: DataTypes.BIGINT(20),  
        },
        pageN : {
            type : DataTypes.INTEGER(11)
        },
        isDeleted : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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

    return Product
}
