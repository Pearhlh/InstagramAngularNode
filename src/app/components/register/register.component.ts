import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {NativeDateAdapter} from '@angular/material/core';

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
  hide = true;
  PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  avatarUrl: string = "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg";
  registerForm!: FormGroup;
  genders: any[] = [
    {value: 'Male-1', viewValue: 'Male'},
    {value: 'Female-2', viewValue: 'Female'},
    {value: 'Other-3', viewValue: 'Other'},
  ];
  constructor(private fb: FormBuilder) {}
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
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        profilename: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        dob: ['', Validators.compose([Validators.required])],
        image: ['', Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        ],
      },
      {
        validators: validateMatchedControlsValue('password', 'confirmPassword'),
      }
    );
  }
}
