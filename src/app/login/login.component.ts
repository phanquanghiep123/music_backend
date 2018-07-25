import { Component, OnInit, Input } from '@angular/core';
import { Auth } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../models/login';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ],
})
export class LoginComponent implements OnInit {
  returnUrl = '/';
  loginForm: Login;
  isSubmit = 0;
  constructor(
    private authService: AuthService,
    private auth: Auth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private app: AppComponent
  ) {

  }
  OnSubmit(formData) {
    this.isSubmit = 1;
    if (formData.form.status != 'VALID') return false;
    this.app.loading = true;
    this.authService.login(this.loginForm).pipe(first()).subscribe(
      data => {
        if (data.status === 'success') {
          this.auth.set(data.response);
          this.router.navigate([this.returnUrl]);
        } else {
          this.loginForm.error = data.messege;      
        }
        this.app.loading = false;
      },
      error => {
        this.loginForm.error = "An error occurred please try again";
        this.app.loading = false;
      }
    );
    return false;
  }
  ngOnInit() {
    this.loginForm = new Login();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    setTimeout(() => {
      this.app.loading = false;
    }, 200);
  }
  ngOnDestroy(): void {
    this.app.loading = true;
    window.scrollTo(0, 0);
  }
}
