process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 customer location Tests';
const baseRoute = '/api/customer/v1/location';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user, accessToken, idToken, addLocation, deleteLocation ;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        customer = appConfig.test.customer;
        addLocation = appConfig.test.addLocation;
        deleteLocation = appConfig.test.deleteLocation;
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

        it('check get locations', async () => {
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

        it('check add location', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(addLocation);
            res.should.have.status(200);
        });
        
    });

    describe('Check Delete Apis', () => {

        it('check delete location', async () => {
            const res = await chai
                .request(server)
                .delete(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(deleteLocation);
            res.should.have.status(200);
        });
        
    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
