/* eslint-disable import/prefer-default-export */
export class Seller {
  constructor(
    email,
    password,
    fullName,
    phone,
    idCardNumber,
    taxCode,
    address,
    frontIdCardImage,
    backIdCardImage,
    portrait,
    isVerified,
  ) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.phone = phone;
    this.idCardNumber = idCardNumber;
    this.taxCode = taxCode;
    this.address = address;
    this.frontIdCardImage = frontIdCardImage;
    this.backIdCardImage = backIdCardImage;
    this.portrait = portrait;
    this.isVerified = isVerified;
  }
}
