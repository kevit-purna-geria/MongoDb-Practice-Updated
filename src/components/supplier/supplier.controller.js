import User from '../user/user.model'
import Supplier from './supplier.model'

class supplierController{
    async supplierSignUp(req, res){
        const token = req.token
    const user = await Users.findOne({'token' : token})
    const name = req.body.name
    const supplier = new Supplier({
        name : name,
        userId : user._id
    })
    
    const userPopulate = await User.find().populate('supplier', 'name');
    // console.log(userPopulate);
    await supplier.save()
    res.status(400).send(supplier)
    }

    async viewSupplier(req, res){
        try {
            const token = req.token
            const user = await User.findOne({'token' : token})
            
            // await req.user.populate('Supplier')
            const supplier = await Supplier.find({'userId' : user._id})
            res.send({supplier})
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async viewSuppliersProducts(req, res){
        try {
            const suppliers = await Supplier.find().populate('products');
            res.json(suppliers);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch suppliers' });
          }
    }
}

module.exports = supplierController