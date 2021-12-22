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
      let data = await this.model.Station.find(
        {},
        "active code description location dimeter"
      );

      return res.json({
        success: true,
        message: "عملیات با موفقیت انجام شد",
        data,
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getStations")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async getStation(req, res) {
    try {

      req.checkParams("code", "please enter code").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let data = await this.model.Station.findOne(
        {code: req.params.code},
        "code description location dimeter"
      );

      return res.json({
        success: true,
        message: "عملیات با موفقیت انجام شد",
        data,
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getStations")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async addStations(req, res) {
    try {
      req.checkBody("description", "please enter description").notEmpty();
      req.checkBody("latitude", "please enter latitude").notEmpty();
      req.checkBody("longitudes", "please enter longitudes").notEmpty();
      req.checkBody("code", "please enter code").notEmpty();
      req.checkBody("dimeter", "please enter dimeter").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let params = {
        description: req.body.description,
        location: [req.body.longitudes, req.body.latitude],
        code: req.body.code,
        dimeter: req.body.dimeter,
      };
      await this.model.Station.create(params);

      return res.json({
        success: true,
        message: "عملیات با موفقیت انجام شد",
        data: { status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("addStations")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async editStations(req, res) {
    try {
      req.checkBody("description", "please enter description").notEmpty();
      req.checkBody("latitude", "please enter latitude").notEmpty();
      req.checkBody("longitudes", "please enter longitudes").notEmpty();
      req.checkBody("code", "please enter code").notEmpty();
      req.checkBody("dimeter", "please enter dimeter").notEmpty();
      if (this.showValidationErrors(req, res)) return;

      let filter = { code: req.body.code };

      await this.model.Station.update(filter, {
        description: req.body.description,
        location: [req.body.longitudes, req.body.latitude],
        dimeter: req.body.dimeter,
      });

      return res.json({
        success: true,
        message: "ایستگاه با موفقیت ویرایش شد",
        data: { status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("editStations")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }
})();
