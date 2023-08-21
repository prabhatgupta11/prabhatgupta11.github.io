const db = require("../models")
const Category = db.category;


const addCategory = async (req, res) => {

    try {

        let info = {
            categoryId,
            shortDescription,
            longDescription,
            approve_b,
            approve_by,
            approve_date

        } = req.body

        // if (approve_b == null){
        //     res.status(404).send({
        //         success : false,
        //         message : "you can not create category admin approval is required"
        //     })
        // }else if(approval_b == yes){
            const category = await Category.create(info)
            console.log(category)
        req.flash('message', 'Category added sucessfully');
        // }
        return res.redirect('/categoryList')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}

// Admin view for approving categories

const adminView = async (req,res) => {

    try {

        const pendingCategories = await Category.findAll(
            {
                where : { approve_b : null }
            }
        )
        return res.status(200).send({
            success : true ,
            pendingCategories
        })
    } catch(err){
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }
}

 // Admin approves a category

 const adminApprove = async (req, res) => {

    try {
        
      const categoryId = req.params.categoryId;
      console.log(123)
      console.log(categoryId)
      const category = await Category.update({ approve_b: 'yes' }, { where: { categoryId: categoryId } });
   
      res.status(200).send(category)
      //   res.redirect('/categories/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred.');
    }
  }

// Update Manufacturer Details

const updateCategory = async (req, res) => {
   
    try{
 
     const category = await Category.update(req.body, { where: { categoryId: req.params.id } })
 
     if (!category) {
         res.status(200).send({
             success: false,
             message: "Category Not Found"
         })
     }
 
     req.flash('message', 'Category Details updated sucessfully');
     return res.redirect('/categoryList')
 
    }catch (err) {
     console.log(err.message)
     res.status(500).send({
         success: false,
         message: "something went wrong"
     })
 }
     
     
 }

const categoryApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
    
    let whereClause = {};
    
    if (approvalStatus === 'pending') {
      whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
      whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
      whereClause = { approve_b: "rejected" };
    }
    
    const category = await Category.findAll({ where: whereClause });
    
    res.render('approval/categoryApprovalList', { title: 'Express', message: req.flash('message'),category });
}

const updateCategoryApprovalStatus =  async (req, res) => {

    const { action, selectedCategoryIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
      console.log(selectedCategoryIds)
      selectedCategoryIds.forEach(async categoryId => {
        try {
          // Find the category by ID using Sequelize
          const category = await Category.findByPk(categoryId);
          console.log(category.approve_b)
          console.log(action)
          if (category) {
            // Update the approval status of the category
            await Category.update({ approve_b : action }, { where : {categoryId : categoryId}});
          }
        } catch (error) {
          console.error('Error updating category:', error);
        }
      });
    }
    }

module.exports = {
    addCategory,
    adminView,
    adminApprove,
    updateCategory,
    categoryApprovalList,
    updateCategoryApprovalStatus
}