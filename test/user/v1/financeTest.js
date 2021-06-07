process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user finance Tests';
const baseRoute = '/api/user/v1/finance';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user, accessToken, idToken, Bill;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        Bill = appConfig.test.Bill;
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

        it('check get finance summary', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/summary`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get bills', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/Bill`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

        it('check add bill', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/Bill`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(Bill);
            res.should.have.status(200);
        });

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
