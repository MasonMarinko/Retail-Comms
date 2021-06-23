const jwt =require("jsonwebtoken")

class AuthService {

  constructor() {
    this.secret = "asdlfkjhsdlkfjhasdkfjhaslriku"
  }

  isTokenExpired(token) {
    try {
      const decoded = this.decodeToken(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  decodeToken(token) {
    const decoded = jwt.verify(token, this.secret);
    return decoded
  }

  createUserToken(userDocument) {
    const payload = {
      id: userDocument.id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      department: userDocument.department,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    }
    return jwt.sign(payload, this.secret)
  }
}

module.exports = new AuthService();