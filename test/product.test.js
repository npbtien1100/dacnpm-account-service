import { expect } from "chai";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../src/server";
const should = chai.should();

chai.use(chaiHttp);

describe("product route", () => {
  before((done) => {
    done();
  });
  it("it should correct when get all product ", (done) => {
    chai
      .request(app)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("totalCount").eql(20);
        done();
      });
  });
  it("it should correct when get product by id", (done) => {
    chai
      .request(app)
      .get("/api/products/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data").have.property("id").eql(1);
        done();
      });
  });

  it("it should correct when insert product", (done) => {
    chai
      .request(app)
      .post("/api/products")
      .send({
        name: "test",
        price: 100,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("data").have.property("name").eql("test");
        done();
      });
  });

  it("it should correct when update product", (done) => {
    chai
      .request(app)
      .put("/api/products/1")
      .send({
        name: "test",
        price: 100,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data").have.property("name").eql("test");
        done();
      });
  });

  it("it should correct when delete product", (done) => {
    chai
      .request(app)
      .delete("/api/products/1")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data").eql(1);
        done();
      });
  });

  it("it should correct when hard delete product", (done) => {
    chai
      .request(app)
      .delete("/api/products/hard/1")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data").eql(1);
        done();
      });
  });

  after((done) => {
    done();
  });
});
