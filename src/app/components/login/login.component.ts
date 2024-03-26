import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  filter,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup!: FormGroup;
  formSubmit$ = new Subject<boolean | null>();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      id: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
    this.formSubmit$
      .pipe(
        debounceTime(500),
        tap(() => this.loginFormGroup.markAsDirty()),
        switchMap(() =>
          this.loginFormGroup.statusChanges.pipe(
            startWith(this.loginFormGroup.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccesFull) => this.submitForm());
  }

  submitForm() {
    const requestBody = this.loginFormGroup.getRawValue();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post('http://localhost:9999/api/login', requestBody, { headers })
      .subscribe((response: any) => {
        if ('user' in response) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home'], {
            queryParams: {
              // id: response.user.id,
            },
          });
        }
      });
  }

  bufferToBinaryString(buffer: { type: string; data: number[] }): string {
    const uint8Array = new Uint8Array(buffer.data);
    let binaryString = '';

    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }

    return binaryString;
  }
}
