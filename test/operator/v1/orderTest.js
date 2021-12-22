process.env.NODE_ENV = "test";
let chai = require("chai");
let should = chai.should();
const sectionName = "V1 operator order Tests";
const baseRoute = "/api/operator/v1/order";
let chaiHttp = require("chai-http");
let server = require("../../../server");
let appConfig = require("config");
let accessToken,
  idToken,
  order,
  addOrderOperator,
  operatorLogin,
  getOrdersOperator,
  getOrderOperator,
  cancelOrderOperator,
  operatorGetOrderDeliveryLocation,
  sendMenu;
const axios = require("axios").default;

chai.use(chaiHttp);

describe(`${sectionName}`, () => {
  before((done) => {
    console.log("Waiting to ensure database connection stablished ");
    operatorLogin = appConfig.test.operatorLogin;
    addOrderOperator = appConfig.test.addOrderOperator;
    getOrdersOperator = appConfig.test.getOrdersOperator;
    getOrderOperator = appConfig.test.getOrderOperator;
    cancelOrderOperator = appConfig.test.cancelOrderOperator;
    operatorGetOrderDeliveryLocation =
      appConfig.test.operatorGetOrderDeliveryLocation;
    order = appConfig.test.order;
    sendMenu = appConfig.test.sendMenu;

    axios
      .post(`http://localhost:4000/api/operator/v1/login`, operatorLogin)
      .then(function (response) {
        response = response.data;
        console.log(response.message);
        if (response.success) {
          idToken = response.data.idToken;
          accessToken = response.data.accessToken;
        } else {
          console.log("errorrrrrrrrrr: no token provided ");
        }
        setTimeout(() => {
          console.log("Okay, lets begin!");
          done();
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  describe("Check get Apis", () => {
    it("check get orders with filter", async () => {
      const res = await chai
        .request(server)
        .get(
          `${baseRoute}/${encodeURI(getOrdersOperator.type)}/${encodeURI(
            getOrdersOperator.value
          )}`
        )
        .set("Authorization", operatorLogin.accessToken)
        .set("idToken", operatorLogin.idToken)
        .send();
      res.should.have.status(200);
    });

    it("check get order", async () => {
      const res = await chai
        .request(server)
        .get(`${baseRoute}/${encodeURI(getOrderOperator.orderId)}`)
        .set("Authorization", operatorLogin.accessToken)
        .set("idToken", operatorLogin.idToken)
        .send();
      res.should.have.status(200);
    });

    it("check get order delivery location", async () => {
      const res = await chai
        .request(server)
        .get(
          `${baseRoute}/delivery/${encodeURI(
            operatorGetOrderDeliveryLocation.orderId
          )}`
        )
        .set("Authorization", accessToken)
        .set("idToken", idToken)
        .send();
      res.should.have.status(200);
    });

    it("check get order products", async () => {
      const res = await chai
        .request(server)
        .get(`${baseRoute}/product`)
        .set("Authorization", operatorLogin.accessToken)
        .set("idToken", operatorLogin.idToken)
        .send();
      res.should.have.status(200);
    });
  });

  describe("Check Post Apis", () => {

    it("check add order", async () => {
      const res = await chai
        .request(server)
        .post(`${baseRoute}/`)
        .set("Authorization", operatorLogin.accessToken)
        .set("idToken", operatorLogin.idToken)
        .send(addOrderOperator);
      res.should.have.status(200);
    });

    it("check send menu", async () => {
      const res = await chai
        .request(server)
        .post(`${baseRoute}/menu`)
        .set("Authorization", operatorLogin.accessToken)
        .set("idToken", operatorLogin.idToken)
        .send(sendMenu);
      res.should.have.status(200);
    });
  });

  describe("Check Put Apis", () => {
    it("check cancel order", async () => {
      const res = await chai
        .request(server)
        .delete(`${baseRoute}/`)
        .set("Authorization", accessToken)
        .set("idToken", idToken)
        .send(cancelOrderOperator);
      res.should.have.status(200);
    });

    it("check editAddress", async () => {
      const res = await chai
        .request(server)
        .put(`${baseRoute}/editAddress`)
        .set("Authorization", accessToken)
        .set("idToken", idToken)
        .send(order);
      res.should.have.status(200);
    });
  });

  after(async () => {
    console.log(`Section ${sectionName} finished`);
  });
});
