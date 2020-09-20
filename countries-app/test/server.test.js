const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();
//module.exports = server.listen(3000);
chai.use(chaiHttp);

it("Capital should be Washington, D.C.", (done) => {
       chai.request('http://localhost:3000')
            .post("/")
            .send({code: "IN"})
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", res.body);
            })
    done()
})
