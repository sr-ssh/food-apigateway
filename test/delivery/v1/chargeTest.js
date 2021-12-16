process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 delivery charge Tests';
const baseRoute = '/api/delivery/v1/charge';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let accessToken, idToken, customer;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        deliveryMan = appConfig.test.deliveryMan;
        axios.post(`http://localhost:4000/api/delivery/v1/login`, deliveryMan)
            .then(function (response) {
                response = response.data;
                console.log(response.message)
                if (response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log("errorrrrrrrrrr: no token provided ");
                }
                setTimeout(() => {
                    console.log('Okay, lets begin!');
                    done();
                }, 1000);
            })
            .catch((error) => {
                console.log("error", error);
            });
    })


    describe('Check get Apis', () => {

        it('check get charge', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .set('Authorization', deliveryMan.accessToken)
                .set('idToken', deliveryMan.idToken)
                .send();
            res.wshould.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
