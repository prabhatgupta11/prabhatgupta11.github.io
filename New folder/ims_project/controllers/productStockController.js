const db = require ("../models")
const Product = db.products
const ProductStock = db.productStock

// Add Product into ProductStock

const addProductStock = async (req, res) => {
    try {
        const addedProduct = await Product.findOne({ where: { id: req.body.itemId } })
      
        if (!addedProduct) {
            return res.status(200).json({
                status: false,
                message: 'Product Not Found'
            })
        }

        const info = {
            itemId: req.body.itemId,
            outletId: req.body.outletId,
            stock: req.body.stock,
            bufferStock: req.body.bufferStock,
            supplierName: req.body.supplierName,
            mrp: req.body.mrp,
            salePrice: req.body.salePrice,
            taxPercentage: req.body.taxPercentage,
            itemReferenceCode: req.body.itemReferenceCode,
            Cat1: req.body.Cat1,
            Cat2: req.body.cat2,
            Cat3: req.body.cat3,
            Cat4: req.body.cat4,
            Cat5: req.body.cat5,
            Cat6: req.body.cat6,
            Cat7: req.body.cat7,
            Cat8: req.body.cat8,
            Cat9: req.body.Cat9,
            Cat10: req.body.Cat10,
            itemTimeStamp: req.body.itemTimeStamp,
            appliesOnline: req.body.appliesOnline,
            itemEANcode: req.body.itemEANcode,
            hsnCode: req.body.hsnCode,
            packing: req.body.packing,
            freeQty: req.body.freeQty,
            purchasePrice: req.body.purchasePrice,
            discountType: req.body.discountType,
            discount: req.body.discount,
            others: req.body.others,
            recommended: req.body.recommended,
            variantName: req.body.variantName,
            shelf: req.body.shelf,
            specialPrice: req.body.specialPrice,
            costPriceWithoutTax: req.body.costPriceWithoutTax,
            originalPrice: req.body.originalPrice,
            minSaleQuantity: req.body.minSaleQuantity,
            pack: req.body.pack,
            flatOffer: req.body.flatOffer,
            aliasCode: req.body.aliasCode,
            approve_b:req.body.approve_b,
            approve_by:req.body.approve_by,
            approve_date:approve_date
        }
        const productStock = await ProductStock.create(info)
        return res.status(200).send({
            message: "product added sucessfully",
            productStock
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}


module.exports = {
    addProductStock
}