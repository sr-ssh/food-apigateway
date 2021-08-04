process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 customer charge Tests';
const baseRoute = '/api/customer/v1/charge';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let accessToken, idToken, customer ;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        customer = appConfig.test.customer;
        axios.post(`http://localhost:4000/api/customer/v1/login`, customer)
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

        it('check get cherge', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
