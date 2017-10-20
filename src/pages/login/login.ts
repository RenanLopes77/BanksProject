import { Component }                                         from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { BankPage }                                          from '../bank/bank';
import { LoginService }                                      from '../services/login.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    email: string;
    password: string;

    constructor(
        public navCtrl: NavController, 
        private _loginService: LoginService,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController
    ) { }

    ngOnInit(): void {
        if(localStorage.getItem('token') != null){
            this.loadPage(); 
        }
    }

    login(): void {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this._loginService.login(this.email, this.password).subscribe(response => {
            if(response){
                this.loadPage(); 
            }
            if(!response){
                this.presentToast();
            }
            loading.dismiss();
        }); 
    }

    loadPage(): void {
        this.navCtrl.setRoot(BankPage);
    }
    
    presentToast() {
        const toast = this.toastCtrl.create({
            message: 'Login Error: Email or Password is incorrect',
            duration: 1700,
            position: 'middle'
        });
        toast.present();
    }
}
