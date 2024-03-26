import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
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

const validateMatchedControlsValue = (
  firstControlName: string,
  secondControlName: string
) => {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [],
})
export class RegisterComponent implements OnInit {
  errorMessage!: string;
  formSubmit$ = new Subject<boolean | null>();
  hide = true;
  avatarUrl!: string;
  genders: any[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
    {
      value: 'Other',
      viewValue: 'Other',
    },
  ];
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  submitForm() {
    const value = this.registerForm.getRawValue();
    const requestBody = {
      ...value,
      role: 1,
      dob: this.datePipe.transform(
        this.registerForm.getRawValue().dob,
        'yyyy/MM/dd'
      ),
      image: this.avatarUrl,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post('http://localhost:9999/api/create-user', requestBody)
      .subscribe(
        (response: any) => {
          if (response.errorCode == 0) {
            this.router.navigate(['/auth/login']);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getUrl(e: any) {
    const file: File = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      this.avatarUrl = base64data as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        debounceTime(500),
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccesFull) => this.submitForm());
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        profileName: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        id: ['', Validators.compose([Validators.required])],
        dob: ['', Validators.compose([Validators.required])],
        // image: ['', Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      {
        validators: validateMatchedControlsValue('password', 'confirmPassword'),
      }
    );
  }
}
