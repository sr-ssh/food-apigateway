process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 delivery order Tests';
const baseRoute = '/api/delivery/v1/order';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let accessToken, idToken, deliveryMan, deliveryAcceptOrder;
const axios = require('axios').default;

chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        deliveryMan = appConfig.test.deliveryMan;
        deliveryAcceptOrder = appConfig.test.deliveryAcceptOrder;
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

        it('check get pending orders', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/pending`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get accepted orders', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/accepted`)
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
            resshould.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

        it('check accept order', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(deliveryAcceptOrder);
            res.should.have.status(200);
        });

        it('check finish order', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/finish`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(deliveryAcceptOrder);
            res.should.have.status(200);
        });
    
    });

    describe('Check Put Apis', () => {

        
    
    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
