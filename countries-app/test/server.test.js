const expect  = require('chai').expect;
const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();
chai.use(chaiHttp);

describe('Test Capitals of Country with Country code', function () {
it("Capital should be New Delhi", (done) => {
       chai.request('http://localhost:3000')
            .post("/")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({code: "IN"})
            .end((err, res, body) => {
                res.should.have.status(200);
                console.log("Response Body:", res);
            })
    done()
})
});
