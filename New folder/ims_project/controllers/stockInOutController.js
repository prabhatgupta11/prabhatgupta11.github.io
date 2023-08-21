const db = require("../models")
const StockInOut = db.stockInOut
const ProductStock = db.productStock


const stockInOut = async (req, res) => {
    console.log(req.body.type)
    try {

        const product = await ProductStock.findOne({ where: { itemId: req.body.itemId } })

        if (!product) {
            return res.status(500).send({
                success: false,
                message: "Product is not found in Product Stock"
            })
        }

        const store = await ProductStock.findOne({ where: { outletId: req.body.outletId } })


        if (!store) {
            return res.status(500).send({
                success: false,
                message: "Store is not found in Product Stock"
            })
        }
        const qty = parseInt(req.body.qty)

        const productStock = await ProductStock.findOne({ where: { itemid: req.body.itemId, outletId: req.body.outletId } })

        if (req.body.type == 'in') {

            const addproductStock = await ProductStock.update({ stock: productStock.stock + qty }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })

        } else if (req.body.type == 'out') {

            const removeProductStock = await ProductStock.update({ stock: productStock.stock - qty }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })

        }

        const info = {
            itemId: req.body.itemId,
            outletId: req.body.outletId,
            type: req.body.type,
            qty: req.body.qty,
            remarks: req.body.remarks,
            approve_b: req.body.approve_b,
            approve_by: req.body.approve_by,
            approve_date: approve_date
        }

        const stockInOut = await StockInOut.create(info)
        req.flash('message', 'Stock updated sucessfully');
        return res.redirect('/productDetailsList')

    }

    catch (err) {
        console.log(err.message)
        res.status(500).send({
            success: false,
            message: "something went wrong",
        })
        console.log(err)
    }

}


// Stock In/Out Approval Listing

const stockInOutApprovalList = async function (req, res) {
    console.log(123)
    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

    let whereClause = {};

    if (approvalStatus === 'pending') {
        whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
        whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
        whereClause = { approve_b: "rejected" };
    }

    const stockInOut = await StockInOut.findAll({ where: whereClause });

    res.render('approval/stockInOutApprovalList', { title: 'Express', message: req.flash('message'), stockInOut });
}

const updateStockInOutApprovalStatus = async (req, res) => {
    console.log(456)
    const { action, selectedItemIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
        console.log(selectedItemIds)
        selectedItemIds.forEach(async itemId => {
            try {
                // Find the category by ID using Sequelize
                const stockInOut = await StockInOut.findByPk(itemId);
                console.log(stockInOut.approve_b)
                console.log(action)
                if (stockInOut) {
                    // Update the approval status of the category
                    await StockInOut.update({ approve_b: action }, { where: { itemId: itemId } });
                }
            } catch (error) {
                console.error('Error updating category:', error);
            }
        });
    }
}





module.exports = {
    stockInOut,
    stockInOutApprovalList,
    updateStockInOutApprovalStatus
}