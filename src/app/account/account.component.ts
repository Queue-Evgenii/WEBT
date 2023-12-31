import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Credentials } from 'src/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("token")) {
      this.toAccount();
    }
  }

  hasAccount = true;
  user: User = new User('', '', '');
  error: string = '';

  submitForm() : void {
    if (this.hasAccount) {
      this.authorization(this.user);
      return;
    }
    if (this.user.invalid()) return;
    const user: Credentials = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password
    }
    this.registration(user);
  };
  registration(data: Credentials) {
    this.http.post('http://localhost/phpdb/webt/api/registration', data)
      .subscribe(res => {
        if (res) {
          localStorage.setItem('token', JSON.stringify(Object.values(res)));
          this.toAccount();
        }
      });
  };
  authorization(data: Credentials) {
    this.http.post('http://localhost/phpdb/webt/api/authorization', {
      email: data["email"],
      password: data["password"],
    })
      .subscribe(res => {
        if (res) {
          const token = Object.assign(res).data.token.value;
          localStorage.setItem('token', JSON.stringify(token));
          this.toAccount();
        }
      },
      err => {
        this.error = Object.assign(err.error)?.message;
      });
  };
  toAccount() {
    this.router.navigate(['me']);
  };
}
