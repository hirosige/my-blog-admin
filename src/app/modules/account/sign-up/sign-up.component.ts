import { Component, OnInit } from '@angular/core';
import { Password } from '../../../models/password';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public account = new Password();

  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  submitSignUp(e: Event): void {
    e.preventDefault();
    if (this.account.password !== this.account.password_confirmation) {
      alert('パスワードが異なります。');
      return;
    }

    this.session.signup(this.account);
  }
}
