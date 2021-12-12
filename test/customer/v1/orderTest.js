process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 customer order Tests';
const baseRoute = '/api/customer/v1/order';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user, accessToken, idToken, customerOrder, customerGetOrder, customerCancelOrder ;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        customer = appConfig.test.customer;
        customerOrder = appConfig.test.customerOrder;
        customerGetOrder = appConfig.test.customerGetOrder;
        customerCancelOrder = appConfig.test.customerCancelOrder;
        // axios.post(`http://localhost:4000/api/customer/v1/login`, customer)
        //     .then(function (response) {
        //         response = response.data;
        //         console.log(response.message)
        //         if (response.success) {
        //             idToken = response.data.idToken
        //             accessToken = response.data.accessToken
        //         } else {
        //             console.log("errorrrrrrrrrr: no token provided ");
        //         }
        //         setTimeout(() => {
        //             console.log('Okay, lets begin!');
        //             done();
        //         }, 1000);
        //     })
        //     .catch((error) => {
        //         console.log("error", error);
        //     });
        done()
    })


    describe('Check get Apis', () => {

        it('check get order products', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/product`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });


        it('check get order products types', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/product/type`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get orders', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get order', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/${encodeURI(customerGetOrder.orderId)}`)
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

        it('check get order factor', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/factor/${encodeURI(customerGetOrder.orderId)}`)
                .send();
            res.should.have.status(200);
        });


    });

    describe('Check Post Apis', () => {

        it('check add order', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(customerOrder);
            res.should.have.status(200);
        });
        
    });

    describe('Check Delete Apis', () => {

        it('check cancel order', async () => {
            const res = await chai
                .request(server)
                .delete(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(customerCancelOrder);
            res.should.have.status(200);
        });
        
    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
