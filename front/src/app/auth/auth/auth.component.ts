import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  errorMessage: Message[];
  showErrorMessage = false;
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.errorMessage = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Falha ao tentar logar.',
      },
    ];
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle().catch((e) => {
      this.showErrorMessage = true;
      this.messageError();
    });
  }

  private messageError() {
    setTimeout(() => (this.showErrorMessage = false), 2000);
  }
}
