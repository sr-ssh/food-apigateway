process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 kitchen order Tests';
const baseRoute = '/api/kitchen/v1/order';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let cook, accessToken, idToken, editOrderStatus;
const axios = require('axios').default;

chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        cook = appConfig.test.cook;
        editOrderStatus = appConfig.test.editOrderStatus;
        axios.post(`http://localhost:4000/api/kitchen/v1/login`, cook)
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

        it('check get active order', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/active`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get finished orders', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/finished`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get in service orders', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/inservice`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });


    });

    describe('Check Put Apis', () => {

        it('check ready order', async () => {
            const res = await chai
                .request(server)
                .put(`${baseRoute}/ready`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(editOrderStatus);
            res.should.have.status(200);
        });
    
    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
