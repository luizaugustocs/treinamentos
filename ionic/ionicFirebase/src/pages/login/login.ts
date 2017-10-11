import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {AuthProvider} from "../../providers/auth/auth";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    registerPage = RegisterPage;
    resetPasswordPage = ResetPasswordPage;
    loginForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private authProvider: AuthProvider,
                private formBuilder: FormBuilder, private toastController: ToastController) {
        this.loginForm = this.formBuilder.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }

    login() {
        if (this.loginForm.valid) {
            this.authProvider.loginWithEmail({email: this.email.value, password: this.password.value})
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

    loginWithGoogle() {
        this.authProvider.loginWithGoogle()
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
