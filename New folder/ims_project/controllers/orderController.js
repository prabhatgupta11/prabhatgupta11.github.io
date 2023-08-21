const db = require("../models")
const Order = db.order;
const OrderItems = db.orderItems


// create billing

const createOrderBill = async (req, res) => {
    console.log(123123123)
    try {
        const { customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount,
            products
        } = req.body;
        console.log(req.body)

        // Create an order with customer details
        const order = await Order.create({
            customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount,
        });

        // Create order items for each product
        const orderItems = products.map(product => ({
            orderPK: order.orderId,
            outletId: product.outletId,
            storeName: product.storeName,
            itemId: product.itemId,
            itemName: product.itemName,
            quantity: product.quantity,
            salePrice: product.price,
            discountPercentage: product.discount,
            itemAmount: product.itemAmount

        }));
        console.log(orderItems)

        // Bulk create order items
        await OrderItems.bulkCreate(orderItems);
        req.flash('message', 'Order Bill added sucessfully');
        // return res.redirect('/order')
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}




module.exports = {
    createOrderBill
}