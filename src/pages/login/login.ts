import { Component }                       from '@angular/core';
import { NavController, LoadingController,
         Toast, Loading }                  from 'ionic-angular';
import { BankPage }                        from '../bank/bank';
import { LoginService }                    from '../../services/login.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public email: string;
    public password: string;

    constructor(
        public navCtrl: NavController,
        private _loginService: LoginService,
        public loadingCtrl: LoadingController,
    ) { }

    private ngOnInit(): void {
        if (localStorage.getItem('token') !== null) {
            this.loadPage();
        }
    }

    private login(): void {
        const loading: Loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });

        loading.present();
        this._loginService.login(this.email, this.password).subscribe(
            response => {
                if (response)
                    this.loadPage();
                loading.dismiss();
            },
            error => {
                loading.dismiss();
            });
    }

    private loadPage(): void {
        this.navCtrl.setRoot(BankPage);
    }
}
