const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_Order";
let mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

module.exports = new (class HomeController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Order v1" });
  }

  async getOrdersByFilter(req, res) {
    try {
      req
        .checkParams("type", "please enter filter type")
        .notEmpty()
        .isIn(["family", "mobile", "address"]);
      req
        .checkParams("value", "please enter filter type")
        .notEmpty()
        .isString();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true };

      let orders = await this.model.Order.find(filter, {
        status: 1,
        createdAt: 1,
        address: 1,
        paid: 1,
      })
        .populate("customer", { family: 1, mobile: 1, _id: 0 })
        .populate("status", { name: 1, status: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

      if (req.params.type === "family") {
        orders = orders.filter((param) => {
          let re = new RegExp(req.params.value, "i");
          let find = param.customer.family.search(re);
          return find !== -1;
        });
      } else if (req.params.type === "mobile") {
        orders = orders.filter(
          (order) => order.customer.mobile === req.params.value
        );
      } else if (req.params.type === "address") {
        orders = orders.filter((param) => {
          let re = new RegExp(req.params.value, "i");
          let find = param.address.search(re);
          return find !== -1;
        });
      }

      //add در حال پرداخت status
      //get status id
      filter = { active: true, status: config.inPayOrdersStatus };
      let status = await this.model.OrderStatusBar.findOne(filter);

      let settings = await this.model.Settings.findOne(
        { active: true },
        "order.isPayNecessary"
      );
      orders = orders.map((order) => {
        if (
          settings.order.isPayNecessary &&
          order.paid === false &&
          order.status.status !== config.canceledOrder
        ) {
          order.status = { name: status.name, status: status.status };
        }
        return order;
      });

      return res.json({
        success: true,
        message: "سفارشات با موفقیت ارسال شد",
        data: orders,
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getOrders")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async getOrder(req, res) {
    try {
      req.checkParams("orderId", "please enter order Id").notEmpty().isString();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true, _id: req.params.orderId };

      let order = await this.model.Order.findOne(filter, {
        status: 1,
        createdAt: 1,
        address: 1,
        description: 1,
        deliveryCost: 1,
        products: 1,
        deliveryId: 1,
        paid: 1,
      })
        .populate({ path: "products._id", model: "Product", select: "name" })
        .populate("customer", { family: 1, mobile: 1, _id: 0 })
        .populate("status", { name: 1, status: 1, _id: 0 });

      filter = { userId: order.deliveryId };
      let delivery = await this.model.Location.findOne(filter, { userId: 0 })
        .sort({ createdAt: -1 })
        .limit(1);

      let deliveryLocation = { _id: "", lat: 0, lng: 0, date: "" };
      if (delivery) {
        deliveryLocation._id = delivery._id;
        deliveryLocation.lat = delivery.geo[1];
        deliveryLocation.lng = delivery.geo[0];
        deliveryLocation.date = delivery.saveDate;
      }

      //calculate dicounts
      let discounts = order.products.map(
        (product) => product.discount * product.quantity
      );
      discounts = discounts.reduce((a, b) => parseInt(a) + parseInt(b), 0);

      order.products = order.products.map((product) => {
        return {
          name: product._id.name,
          size: product.size,
          quantity: product.quantity,
          price: product.price - product.discount,
          discount: !!product.discount,
        };
      });

      let params = {
        id: order._id,
        customer: order.customer,
        products: order.products,
        createdAt: order.createdAt,
        address: order.address,
        status: order.status,
        deliveryCost: order.deliveryCost,
        deliveryId: order.deliveryId,
        paid: order.paid,
      };

      if (!params.deliveryId) params.deliveryId = "";
      if (!params.description) params.description = "";

      // caculate tax
      let tax = order.products.map(
        (product) => product.price * product.quantity * config.tax
      );
      tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0);

      let total = order.products.map(
        (product) => product.price * product.quantity
      );
      total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      //add tax
      // total += (order.deliveryCost + tax);
      total += order.deliveryCost;

      //add در حال پرداخت status
      //get status id
      filter = { active: true, status: config.inPayOrdersStatus };
      let status = await this.model.OrderStatusBar.findOne(filter);

      let settings = await this.model.Settings.findOne(
        { active: true },
        "order.isPayNecessary"
      );
      if (
        settings.order.isPayNecessary &&
        params.paid === false &&
        params.status.status !== config.canceledOrder
      ) {
        params.status = { name: status.name, status: status.status };
      }

      return res.json({
        success: true,
        message: "سفارشات با موفقیت ارسال شد",
        data: { order: params, deliveryLocation, tax, total, discounts },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getOrder")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async cancelOrder(req, res) {
    try {
      req.checkBody("orderId", "please set order id").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true, _id: req.body.orderId };
      let order = await this.model.Order.findOne(filter);

      if (!order)
        return res.json({
          success: false,
          message: "سفارش موجود نیست",
          data: { status: false },
        });

      //get status id
      filter = { active: true, status: config.canceledOrder };
      let status = await this.model.OrderStatusBar.findOne(filter, "_id");

      order.status = status;
      order.finishDate = new Date();
      await order.save();

      // recalculate product supply
      for (let index = 0; index < order.products.length; index++) {
        await this.model.Product.findOneAndUpdate(
          { _id: order.products[index]._id },
          { $inc: { supply: order.products[index].quantity } }
        );
      }

      if (order.paid) {
        // caculate total
        let total = order.products.map(
          (product) => (product.price - product.discount) * product.quantity
        );
        total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0);

        // caculate tax
        // let tax = order.products.map(product => (product.price - product.discount) * product.quantity * config.tax)
        // tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        //add tax
        // total += (order.deliveryCost + tax);
        total += order.deliveryCost;

        //make customerFinance collection
        let params = {
          orderId: req.body.orderId,
          customerId: req.decodedData.user_id,
          type: config.debit,
          cost: total,
        };
        await this.model.CustomerFinance.create(params);
      }

      res.json({
        success: true,
        message: "سفارش شما  لغو شد ",
        data: { status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("cancelOrder")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async getdeliveryLocation(req, res) {
    try {
      req.checkParams("orderId", "please set order id").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true, _id: req.params.orderId };
      let order = await this.model.Order.findOne(filter, "deliveryId").populate(
        "status"
      );

      if (!order)
        return res.json({
          success: true,
          message: "سفارش موجود نیست",
          data: { status: false },
        });

      if (!order.deliveryId)
        return res.json({
          success: true,
          message: `است ${order.status.name} سفارش شما در مرحله `,
          data: { status: false },
        });

      filter = { userId: order.deliveryId };
      let deliveryLocation = await this.model.Location.findOne(filter, {
        userId: 0,
      })
        .sort({ createdAt: -1 })
        .limit(1);

      res.json({
        success: true,
        message: "موقعیت پیک با موفقیت ارسال شد",
        data: { status: true, deliveryLocation },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getdeliveryLocation")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async addOrder(req, res) {
    try {
      req.checkBody("products", "please enter products").notEmpty();
      req
        .checkBody("products.*._id", "please enter product id")
        .notEmpty()
        .isMongoId();
      req
        .checkBody("products.*.quantity", "please enter product quantity")
        .notEmpty()
        .isInt({ min: 1 });
      req
        .checkBody("products.*.size", "please enter product size")
        .notEmpty()
        .isString();
      req.checkBody("family", "please enter family").notEmpty().isString();
      req.checkBody("mobile", "please enter mobile").notEmpty().isNumeric();
      req.checkBody("address", "please enter address").notEmpty().isString();
      req.checkBody("addressId", "please enter address id").notEmpty();
      req.checkBody("station", "please enter station").notEmpty().isNumeric();
      req
        .checkBody("description", "please enter description")
        .optional()
        .isString();

      if (this.showValidationErrors(req, res)) return;

      //merge duplicated product ids
      let userProducts = [];
      req.body.products.forEach(function (item) {
        var existing = userProducts.filter(function (v, i) {
          return v._id == item._id && v.size == item.size;
        });
        if (existing.length) {
          var existingIndex = userProducts.indexOf(existing[0]);
          userProducts[existingIndex].quantity += item.quantity;
        } else {
          userProducts.push(item);
        }
      });

      // recalculate product supply
      for (let index = 0; index < userProducts.length; index++) {
        let productSupply = await this.model.Product.findOne(
          { _id: userProducts[index]._id },
          "supply size"
        );
        let supply = productSupply.supply - userProducts[index].quantity;
        if (supply < 0)
          return res.json({
            success: true,
            message: "موجودی محصول کافی نیست",
            data: { status: false },
          });
        productSupply.supply = supply;
        await productSupply.save();

        //add price and discount
        userProducts[index].price = productSupply.size.find(
          (s) => s.name == userProducts[index].size
        ).price;
        userProducts[index].discount = productSupply.size.find(
          (s) => s.name == userProducts[index].size
        ).discount;
      }

      //get status id
      let filter = { active: true, name: config.activeOrders };
      let status = await this.model.OrderStatusBar.findOne(filter, "_id");

      let products = userProducts.map((product) => {
        return {
          _id: product._id,
          quantity: product.quantity,
          price: product.price,
          size: product.size,
          discount: product.discount,
        };
      });

      //find station
      filter = { code: req.body.station };
      let station = await this.model.Station.findOne(filter);
      if (!station)
        return res.json({
          success: true,
          message: "ایستگاه موجود نمی باشد",
          data: { status: false },
        });

      //find customer
      filter = { mobile: req.body.mobile };
      let update = {
        $addToSet: {
          $setOnInsert: {
            mobile: req.body.mobile,
            family: req.body.family, //family doesnt save
            locations: [{ address: req.body.address, station: station._id }],
          },
        },
      };
      if (req.body.addressId == 0) {
        update.$addToSet.locations = {
          address: req.body.address,
          station: station._id,
        };
      }
      let customer = await this.model.Customer.findOneAndUpdate(
        filter,
        update,
        { upsert: true, new: true }
      );

      // add order
      let params = {
        products: products,
        customer: customer._id,
        address: req.body.address,
        status: status._id,
        description: req.body.description || "",
        station: station.id,
      };

      let order = await this.model.Order.create(params);

      // add order to customer
      customer.family = req.body.family
      customer.order = order._id;
      await customer.save();

      res.json({
        success: true,
        message: "سفارش شما با موفقیت ثبت شد",
        data: { status: true },
      });

      //send smd
      let settings = await this.model.Settings.findOne({ active: true });
      if (settings.order.addOrderSms.status)
        this.sendSms(
          customer.mobile,
          settings.order.addOrderSms.text + "\n" + settings.companyName
        );
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("addOrder")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async editAddress(req, res) {
    try {
      req.checkBody("orderId", "please set order id").notEmpty();
      req.checkBody("adrs", "please set adrs").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true, _id: req.body.orderId };
      let order = await this.model.Order.findOne(filter);

      if (!order)
        return res.json({
          success: true,
          message: "سفارش موجود نیست",
          data: { status: false },
        });

      order.address = req.body.adrs;
      await order.save();

      res.json({
        success: true,
        message: "عملیات با موفقیت انجام شد",
        data: { status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("editAddress")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async getOrderProducts(req, res) {
    try {
      let filter = { active: true };

      let products = await this.model.Product.find(filter, {
        _id: 1,
        description: 1,
        name: 1,
        type: 1,
        size: 1,
      })
        .populate("type", { name: 1 })
        .lean();

      let types = await this.model.ProductTypes.find(filter, {
        name: 1,
      }).lean();

      return res.json({
        success: true,
        message: "محصولات سفارش با موفقیت ارسال شد",
        data: { products, types, status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getOrderProducts")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async sendMenuForCustomer(req, res) {
    try {
      req.checkBody("mobile", "please set customer mobile").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      res.json({
        success: true,
        message: "اس ام اس منو با موفقیت برای مشتری ارسال شد",
        data: { status: true },
      });

      let massage = ":لینک منو هپی پیتزا \n" + config.menuLink;

      this.sendSms(req.body.mobile, massage);
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("sendMenuForCustomer")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }
})();
