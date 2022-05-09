export class Seller {
    constructor(email, password, fullName, phone, address, idCardNumber, taxCode, frontIdCardImage, backIdCardImage, portrait) {
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.fullName = fullName;
        this.idCardNumber = idCardNumber;
        this.taxCode = taxCode;
        this.frontIdCardImage = frontIdCardImage;
        this.backIdCardImage = backIdCardImage;
        this.portrait = portrait;
    }
}