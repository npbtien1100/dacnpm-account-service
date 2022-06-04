/* eslint-disable no-undef */
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

import { createAdmin } from "../AdminFactory";

chai.use(chaiHttp);

describe("Validate admin", () => {
  it("it should correct when validates admin", () => {
    const res = createAdmin({
      fullName: "Nguyen Van A",
      email: "vana@gmail.com",
      password: "123456",
      phone: "0123456789",
      address: "TPHCM",
    });

    expect(res).to.deep.equal({
      info: {
        fullName: "Nguyen Van A",
        email: "vana@gmail.com",
        password: "123456",
        phone: "0123456789",
        address: "TPHCM",
      },
      errMessage: "",
    });
  });
});
