import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/share/models/user.model';
import { NotifierService } from 'src/app/share/services/notify/notifier.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {
  @Input() user!: UserModel;
  isDisabled: boolean = true;
  profileForm: any;
  url: string = '';
  file: any;
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('user', this.user);
    this.profileForm = this.initForm();
  }

  updateProfile(event: any): void {
    const data = {
      form: this.profileForm.value,
      avatar: this.file
    }
    this.modal.close(data);
  }
  initForm(): FormGroup {
    return new FormGroup({
      fullname: new FormControl(this.user.fullname, [Validators.required]),
      username: new FormControl(this.user?.account?.username, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user?.phone, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]),
      about: new FormControl(this.user?.about, [Validators.required]),
      yearOfBirth: new FormControl(this.user?.yearOrBirth, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(4), Validators.minLength(4)]),
    });
  }
  uploadAvatar(event: any): void {
    this.file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('e', e.result);
      this.url = e.target.result; 
      console.log('url', this.url);
    }
    reader.readAsDataURL(this.file);
  }

  isControlValid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(formGroup: FormGroup, validation: any, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(formGroup: FormGroup, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
