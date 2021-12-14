const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_Station";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = new (class StationController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Station v1" });
  }

  async getStations(req, res) {
    try {

      let data = await this.model.Station.find({}, 'active code description latitude longitudes dimeter')

      return res.json({ success: true, message: "عملیات با موفقیت انجام شد", data })

    }
    catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method('getStations')
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async addStations(req, res) {
    try {

      req.checkBody('description', 'please enter description').notEmpty();
      req.checkBody('latitude', 'please enter latitude').notEmpty();
      req.checkBody('longitudes', 'please enter longitudes').notEmpty();
      req.checkBody('code', 'please enter code').notEmpty();
      req.checkBody('dimeter', 'please enter dimeter').notEmpty();
      if (this.showValidationErrors(req, res)) return;


      let params = {
        description: req.body.description,
        latitude: req.body.latitude,
        longitudes: req.body.longitudes,
        code: req.body.code,
        dimeter: req.body.dimeter,
      }
      await this.model.Station.create(params)

      return res.json({ success: true, message: "عملیات با موفقیت انجام شد", data: { status: true } })

    }
    catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method('addStations')
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async editStations(req, res) {
    try {

      req.checkBody('_id', 'please enter _id').notEmpty();
      req.checkBody('description', 'please enter description').notEmpty();
      req.checkBody('active', 'please enter active').notEmpty();
      req.checkBody('latitude', 'please enter latitude').notEmpty();
      req.checkBody('longitudes', 'please enter longitudes').notEmpty();
      req.checkBody('code', 'please enter code').notEmpty();
      req.checkBody('dimeter', 'please enter dimeter').notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let filter = { _id: req.body._id }

      await this.model.Station.update(filter, {
        description: req.body.description
        , active: req.body.active
        , latitude: req.body.latitude
        , longitudes: req.body.longitudes
        , code: req.body.code
        , dimeter: req.body.dimeter
      })

      return res.json({ success: true, message: "ایستگاه با موفقیت ویرایش شد", data: { status: true } })

    }
    catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method('editStations')
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

})();
