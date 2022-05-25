export class Seller {
  constructor(email, name, phone, password, idCardNumber, taxCode, address, frontIdCardImage, backIdCardImage, portrait) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.idCardNumber = idCardNumber;
    this.taxCode = taxCode;
    this.address = address;
    this.frontIdCardImage = frontIdCardImage;
    this.backIdCardImage = frontIdCardImage;
    this.portrait = portrait;
  }
}
