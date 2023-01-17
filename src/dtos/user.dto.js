const _ = require("lodash");

class UserDTO {
  constructor(data) {
    this.data = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      roles: data.roles,
    };
    this.errors = [];
  }

  validate() {
    if (_.isEmpty(this.data.fullname)) {
      this.errors.push(["fullname", "cannot be empty"]);
    }
    if (_.isEmpty(this.data.email)) {
      this.errors.push(["email", "cannot be empty"]);
    }
    if (!_.includes(this.data.email, "@", 0)) {
      this.errors.push(["email", "an email must have an @ symbol"]);
    }
    if (_.isEmpty(this.data.password)) {
      this.errors.push(["password", "cannot be empty"]);
    }
    if (String(this.data.password).length < 8) {
      this.errors.push(["password", "cannot must be 8 characters or more"]);
    }

    return _.isEmpty(this.errors);
  }
}

module.exports = UserDTO;
