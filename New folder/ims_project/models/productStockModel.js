const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ProductStock = sequelize.define('product_stocks', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        itemId: {
            type: DataTypes.BIGINT(20),
        },
        outletId : {
            type : DataTypes.BIGINT(11),
        },
        stock : {
            type : DataTypes.STRING(100)
        },
        bufferStock : {
            type : DataTypes.STRING(100)
        },
        supplierName : {
            type : DataTypes.STRING(100)
        },
        mrp : {
            type : DataTypes.FLOAT(10,2)
        },
        salePrice : {
            type : DataTypes.FLOAT(10,2)
        },
        taxPercentage : {
            type : DataTypes.FLOAT(10,2)
        },
        itemReferenceCode : {
            type : DataTypes.STRING(100)
        },
        Cat1 : {
            type : DataTypes.STRING(255)
        },
        Cat2 : {
            type : DataTypes.STRING(255)
        },
        Cat3 : {
            type : DataTypes.STRING(255)
        },
        Cat4 : {
            type : DataTypes.STRING(255)
        },
        Cat5 : {
            type : DataTypes.STRING(255)
        },
        Cat6 : {
            type : DataTypes.STRING(255)
        },
        Cat7 : {
            type : DataTypes.STRING(255)
        },
        Cat8 : {
            type : DataTypes.STRING(255)
        },
        Cat9 : {
            type : DataTypes.STRING(255)
        },
        Cat10 : {
            type : DataTypes.STRING(255)
        },
        itemTimeStamp : {
            type : DataTypes.STRING(255)
        },
        appliesOnline : {
            type : DataTypes.INTEGER(11)
        },
        itemEANcode : {
            type : DataTypes.STRING(250)
        },
        hsnCode : {
            type : DataTypes.STRING(100)
        },
        packing : {
            type : DataTypes.STRING(255)
        },
        freeQty : {
            type : DataTypes.INTEGER
        },
        purchasePrice : {
            type : DataTypes.STRING(150)
        },
        discountType : {
            type : DataTypes.STRING(150)
        },
        discount : {
            type : DataTypes.FLOAT(10,2)
        },
        others : {
            type : DataTypes.TEXT,
            
        },
        recommended : {
            type : DataTypes.STRING(20)
        },
        variantName : {
            type : DataTypes.STRING(255)
        },
        shelf : {
            type : DataTypes.STRING(255)
        },
        specialPrice : {
            type : DataTypes.STRING(150)
        },
        costPriceWithoutTax : {
            type : DataTypes.STRING(150)
        },
        originalPrice : {
            type : DataTypes.STRING(150)
        },
        minSaleQuantity : {
            type : DataTypes.STRING(150)
        },
        pack : {
            type : DataTypes.STRING(150)
        },
        flatOffer : {
            type : DataTypes.STRING(150)
        },
        aliasCode : {
            type : DataTypes.STRING(150)
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

    return ProductStock
}
































