process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 cook home Tests';
const baseRoute = '/api/cook/v1';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user,appInfo, accessToken, idToken, cook;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        appInfo = appConfig.test.appInfo;
        cook = appConfig.test.cook;
        axios.post(`http://localhost:4000/api/cook/v1/login`, cook)
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

        it('check app info', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/app/info`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(appInfo);
            res.should.have.status(200);
        });

        it('check verification code', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/verificationcode`)
                .send(cook);
            res.should.have.status(200);
        });

        it('check login', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/login`)
                .send(cook);
            res.should.have.status(200);
        });

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
