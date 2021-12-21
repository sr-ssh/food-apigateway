process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 operator customer Tests';
const baseRoute = '/api/operator/v1/customer';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let getCustomerParams, operatorGetCustomer, idToken, accessToken;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        operatorGetCustomer = appConfig.test.operatorGetCustomer;
        operatorLogin = appConfig.test.operatorLogin;
        axios.post(`http://localhost:4000/api/operator/v1/login`, operatorLogin)
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

        it('check get customer by mobile', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/${encodeURI(operatorGetCustomer.mobile)}`)
                .set('Authorization', operatorLogin.accessToken)
                .set('idToken', operatorLogin.idToken)
                .send();
            res.should.have.status(200);
        });


    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
