
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Product';


module.exports = new class ProductController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Product v1" });
    }

    async addProduct(req, res) {
        try {
            req.checkBody('name', 'please enter product name').notEmpty().isString();
            req.checkBody('typeId', 'please enter product type id').notEmpty().isMongoId();
            req.checkBody('img', 'please enter product image').notEmpty().isString();
            req.checkBody('supply', 'please enter supply').notEmpty().isFloat({min: 0});
            req.checkBody('price', 'please enter price').notEmpty().isFloat({min: 0});
            req.checkBody('discount', 'please enter discount').notEmpty().isFloat({min: 0});
            req.checkBody('description', 'please enter description').optional().isString();
            if (this.showValidationErrors(req, res)) return;

            let productType = await this.model.ProductTypes.findOne({_id: req.body.typeId})
            if(!productType)
                return res.json({ success : true, message : 'نوع وارد شده موجود نیست', data: { status: false }})
            
            let params = {
                name: req.body.name,
                type: req.body.typeId,
                supply: req.body.supply,
                size: {name: "medium", price: req.body.price, discount: req.body.discount},
                img: req.body.img,
                description: req.body.description
            }

            let filter = { name: params.name }
            let product = await this.model.Product.findOne(filter)

            if(product)
                return res.json({ success : true, message : 'محصولی با این نام موجود است', data: { status: false }})
                
            await this.model.Product.create(params)

            res.json({ success : true, message : 'محصول شما با موفقیت ثبت شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addProduct')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getProducts(req, res) {
        try {
            let filter = { user: req.decodedData.user_employer }
            let products = await this.model.Product.find(filter).populate('type', {_id: 1, name: 1}).sort({createdAt: -1});
            res.json({ success : true, message : 'محصولات با موفقیت ارسال شد', data: products})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getProducts')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async editProduct(req, res) {
        try {
            req.checkBody('_id', 'please enter product id').notEmpty();
            req.checkBody('active', 'please enter activity status').notEmpty().isBoolean();
            req.checkBody('name', 'please enter name').notEmpty().isString();
            req.checkBody('typeId', 'please enter type id').notEmpty().isString();
            req.checkBody('img', 'please enter img').notEmpty().isString();
            req.checkBody('price', 'please enter price').notEmpty().isFloat({min: 0});
            req.checkBody('discount', 'please enter disocunt').notEmpty().isFloat({min: 0});
            req.checkBody('supply', 'please enter supply').notEmpty().isFloat({min: 0});
            req.checkBody('description', 'please enter description').optional().isString();
            if (this.showValidationErrors(req, res)) return;


            let productType = await this.model.ProductTypes.findOne({_id: req.body.typeId})
            if(!productType)
                return res.json({ success : true, message : 'نوع وارد شده موجود نیست', data: { status: false }})
            
            let params = {
                active: req.body.active,
                name: req.body.name,
                type: req.body.typeId,
                size: {name: "medium", price: req.body.price, discount: req.body.discount},
                img: req.body.img,
                description: req.body.description,
                supply: req.body.supply
            }

            let filter = { _id: req.body._id }
            let product = await this.model.Product.findOneAndUpdate(filter, params)

            if(!product)
                return res.json({ success : false, message : 'محصول وارد شده، موجود نیست'})
                

            res.json({ success : true, message : 'محصول شما با موفقیت ویرایش شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editProduct')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getProductTypes(req, res) {
        try {
            let filter = { active: true }
            let productTypes = await this.model.ProductTypes.find(filter, { name: 1, status: 1 });


            res.json({ success : true, message : 'محصولات با موفقیت ارسال شد', data: productTypes })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getProductTypes')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async addProductType(req, res) {
        try {
            req.checkBody('name', 'please enter product type name').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { name: req.body.name }
            let productType = await this.model.ProductTypes.findOne(filter)

            if(productType)
                return res.json({ success : true, message : 'این نوع محصول موجود است', data: { status: false }})
                
            await this.model.ProductTypes.create(filter)

            res.json({ success : true, message : 'نوع محصول با موفقیت ثبت شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addProductType')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}


