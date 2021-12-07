process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user charge Tests';
const baseRoute = '/api/user/v1/charge';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let accessToken, idToken, user ;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection established ');
        user = appConfig.test.user;
        axios.post(`http://127.0.0.1:4000/api/user/v1/login`, user)
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

        it('check get charge', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .set('Authorization', user.accessToken)
                .set('idToken', user.idToken)
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
