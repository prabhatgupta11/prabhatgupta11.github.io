const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        orderId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        // orderPK: {
        //     type: DataTypes.STRING(250),
        // },
        customerName : {
            type : DataTypes.STRING(250)
        },
        customerMobile : {
            type : DataTypes.STRING(250)
        },
        customerEmail : {
            type : DataTypes.STRING(250)
        },
        customerCity : {
            type : DataTypes.STRING(250)
        },
        customerState : {
            type : DataTypes.STRING(250)
        },
        customerPinCode : {
            type : DataTypes.STRING(250)
        },
        paymentMode : {
            type : DataTypes.STRING(250)
        },
        outletId : {
            type : DataTypes.STRING(250)
        },
        onlineReferenceNo: {
            type: DataTypes.STRING(250),
        },
        onlineChildReferenceNo : {
            type : DataTypes.STRING(250),
        },
        status : {
            type : DataTypes.STRING(250)
        },
        orderRemarks : {
            type : DataTypes.STRING(250)
        },
        Channel : {
            type : DataTypes.STRING(250)
        },
        totalQuantity : {
            type : DataTypes.STRING(250)
        },
        totalFreeQty : {
            type : DataTypes.STRING(250)
        },
        totalAmount : {
            type : DataTypes.STRING(255)
        },
        totalTaxAmount : {
            type : DataTypes.STRING(250)
        },
        totalDiscountAmount : {
            type : DataTypes.STRING(250)
        },
        orderDiscPerc : {
            type : DataTypes.STRING(250)
        },
        orderDiscAmt : {
            type : DataTypes.STRING(250)
        },
        courierPartner : {
            type : DataTypes.STRING(250)
        },
        shippingId : {
            type : DataTypes.STRING(250)
        },
        shippingName : {
            type : DataTypes.STRING(250)
        },
        shippingAddress1 : {
            type : DataTypes.TEXT
        },
        shippingAddress2 : {
            type : DataTypes.TEXT
        },
        shippingPlace : {
            type : DataTypes.STRING(250)
        },
        shippingState : {
            type : DataTypes.STRING(250)
        },
        shippingStateCode : {
            type : DataTypes.STRING(250)
        },
        shippingCountry : {
            type : DataTypes.STRING(250)
        },
        shippingPinCode : {
            type : DataTypes.STRING(250)
        },
        shippingPhone : {
            type : DataTypes.STRING(250)
        },
        shippingMobile : {
            type : DataTypes.STRING(250)
        },
        shippingEmail : {
            type : DataTypes.STRING(250)
        },
        shippingCharge : {
            type : DataTypes.STRING(250)
        },
        packingCharge : {
            type : DataTypes.STRING(250)
        },
        shippingMethod : {
            type : DataTypes.STRING(250)
        },
        ShipmentPointsUsed : {
            type : DataTypes.STRING(250)
        },
        shipmentItems : {
            type : DataTypes.STRING(250)
        },
        shipmentABN : {
            type : DataTypes.STRING(250)
        },
        shipmentWeight : {
            type : DataTypes.STRING(250)
        },
        latitude : {
            type : DataTypes.STRING(250)
        },
        longitude : {
            type : DataTypes.STRING(250)
        },
        customeLatitude : {
            type : DataTypes.STRING(250)
        },
        customeLongitude : {
            type : DataTypes.STRING(250)
        },
        discountCoupon: {
            type : DataTypes.STRING(250)
        },
        deliveryDate : {
            type : DataTypes.STRING(250)
        },
        locationId : {
            type : DataTypes.STRING(250)
        },
        userId : {
            type : DataTypes.STRING(250)
        },
        appUserName : {
            type : DataTypes.STRING(250)
        },
        customerCode : {
            type : DataTypes.STRING(250)
        },
        customerId : {
            type : DataTypes.STRING(250)
        },
       
        customerType : {
            type : DataTypes.STRING(250)
        },
        customerAddressLine1 : {
            type : DataTypes.TEXT
        },
        customerAddressLine2 : {
            type : DataTypes.TEXT
        },
        customerAddressLine3 : {
            type : DataTypes.TEXT
        },
        customerArea : {
            type : DataTypes.STRING(250)
        },
        customerCountry : {
            type : DataTypes.STRING(250)
        },
        customerPhone : {
            type : DataTypes.STRING(250)
        },
        ordTimestamp : {
            type : DataTypes.STRING(250)
        },
        isOfflineOrder : {
            type : DataTypes.STRING(250)
        },
        invoiceNo : {
            type : DataTypes.STRING(250)
        },
        deliveryBoy : {
            type : DataTypes.STRING(250)
        },
        deilveryBoyMobileNo : {
            type : DataTypes.STRING(250)
        },
        otherChargesTaxAmount : {
            type : DataTypes.STRING(250)
        },
        otherChargesTaxPercentage : {
            type : DataTypes.STRING(250)
        },
        otherChargesTaxInclusive : {
            type : DataTypes.STRING(250)
        },
        serviceTaxAmount : {
            type : DataTypes.STRING(250)
        },
    })

    return Order
}































