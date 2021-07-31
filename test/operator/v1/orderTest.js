process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 operator order Tests';
const baseRoute = '/api/operator/v1/order';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let accessToken, idToken, addOrderOperator, operatorLogin;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        operatorLogin = appConfig.test.operatorLogin;
        addOrderOperator = appConfig.test.addOrderOperator;
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


    });

    describe('Check Post Apis', () => {

        it('check add order', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(addOrderOperator);
            res.should.have.status(200);
        });
        
    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
