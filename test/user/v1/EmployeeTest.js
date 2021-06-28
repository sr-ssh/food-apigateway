process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user employee Tests';
const baseRoute = '/api/user/v1/employee';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        employee = appConfig.test.employee;
        // axios.post(`http://localhost:4000/api/user/v1/login`, user)
        //     .then(function (response) {
        //         response = response.data;
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

        it('check get employees', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXIiLCJpYXQiOjE2MjQ4ODAwOTQsImV4cCI6MTY1MDgwMDA5NCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.UvCgHV8fwy8SIOZ6J4br6sd1ewRr8SafixKnCs7O-oo")
                .set('idToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkNzI4NjU1MTliMzExYzkwNWY5NTY2IiwidXNlcl9hY3RpdmUiOnRydWUsInVzZXJfZW1wbG95ZXIiOiI2MGQ3Mjg2NTUxOWIzMTFjOTA1Zjk1NjYiLCJpYXQiOjE2MjQ4ODAwOTQsImV4cCI6MTY0NjQ4MDA5NCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.IgWZj5UmYcWi5Fd8FCpS6JcTR18Yj5Wb03lWUwVU1Es")
                .send();
            res.should.have.status(200);
        });


    });

    describe('Check Post Apis', () => {

        it('check add employee', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(employee);
            res.should.have.status(200);
        });

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
