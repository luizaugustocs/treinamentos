import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    signupForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private fb: FormBuilder, private auth: AuthProvider, public toastController: ToastController) {
        this.signupForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.email = this.signupForm.controls['email'];
        this.password = this.signupForm.controls['password'];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    submit(): void {
        if (this.signupForm.valid) {
            var credentials = ({email: this.email.value, password: this.password.value});
            this.auth.registerUser(credentials)
                .catch(error => {
                    this.error = error;

                    this.toastController.create({
                        message: error['message'],
                        duration: 5000,
                        showCloseButton: true
                    }).present();

                });
        }
    }

}
