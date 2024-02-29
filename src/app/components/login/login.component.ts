import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {

  }

  submit() {
    const requestBody = this.loginFormGroup.getRawValue();
    this.http.post('http://localhost:9999/api/login', requestBody).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(32)]),],
      password: ['', Validators.compose([Validators.required])],
    })
  }
}
