process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user station Tests';
const baseRoute = '/api/user/v1/station';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let editAccount,getStation;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        getStation = appConfig.test.getStation;
        user = appConfig.test.user;
        editAccount = appConfig.test.editAccount;
        axios.post(`http://localhost:4000/api/user/v1/login`, user)
            .then(function (response) {
                response = response.data;
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

        it('check get station info', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/${getStation.code}`)
                .set('Authorization', user.accessToken)
                .set('idToken', user.idToken)
                .send();
            res.should.have.status(200);
        });

    });


    describe('Check put Apis', () => {

      

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
