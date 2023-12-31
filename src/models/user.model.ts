export class Credentials {
  constructor(_username: string, _email: string, _password: string) {
    this.username = _username;
    this.email = _email;
    this.password = _password;
  };
  username: string;
  email: string;
  password: string;
  [key: string]: string | Function | Error;
};
export class User extends Credentials {
  errors: Error = new Error();
  invalid(): boolean {
    if (!this.errors.username.invalid
        && !this.errors.email.invalid
        && !this.errors.password.invalid) return false;
    return true;
  }
  validateUsername(): void {
    this.standartValidate('username');
  };
  validateEmail(): void {
    this.emailValidate('email');
  };
  validatePassword(): void {
    this.standartValidate('password');
  };
  private standartValidate(src: string) {
    this.errors[src].doDirty();
    this.errors[src].doRequired(true);
    this.errors[src].doValid();
    if (this[src].length === 0) {
      this.errors[src].doRequired(false);
      this.errors[src].doInvalid();
      return;
    }
  };
  private emailValidate(src: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.errors[src].doDirty();
    this.errors[src].doRequired(true);
    this.errors[src].doEmail(true);
    this.errors[src].doValid();
    if (this[src].length === 0) {
      this.errors[src].doRequired(false);
      this.errors[src].doInvalid();
    }
    if(!emailRegex.test(this[src].toString())) {
      this.errors[src].doEmail(false);
      this.errors[src].doInvalid();
      return;
    }
  }
};
class Error {
  [key: string]: Validators;
  username: Validators = new Validators();
  email: EmailValidators = new EmailValidators();
  password: Validators = new Validators();
};
class Validators {
  private _invalid: boolean = true;
  private _dirty: boolean = false;
  private _required: boolean = false;
  private _errors: Errors = new Errors();
  get invalid(): boolean {
    return this._invalid;
  };
  get dirty(): boolean {
    return this._dirty;
  };
  get required(): boolean {
    return this._required;
  };
  get errors(): Errors {
    return this._errors;
  }
  doDirty() : void {
    this._dirty = true;
  }
  doRequired(val: boolean) : void {
    this._required = val;
  }
  doValid() : void {
    this._invalid = false;
  }
  doInvalid() : void {
    this._invalid = true;
  }
  doEmail(val: boolean) {}
};
class EmailValidators extends Validators {
  private _email: boolean = false;
  get email(): boolean {
    return this._email;
  }
  override doEmail(val: boolean) : void {
    this._email = val;
  }
};
class Errors {
  required: string = "value is required *";
  invalid: string = "value is invalid *";
  email: string = "email is invalid *";
}