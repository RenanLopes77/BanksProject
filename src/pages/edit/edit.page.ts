import { Component }                          from '@angular/core';
import { NavParams, ViewController,
         AlertController, Alert,
         LoadingController, ToastController,
         Loading }                            from 'ionic-angular';
import { Bank }                               from '../../interfaces/bank';
import { BankService }                        from '../../services/bank.service';

@Component({
    selector: 'edit-page',
    templateUrl: 'edit.page.html',
})
export class EditPage {
    public bank: Bank;

    private loading: Loading = this.loadingCtrl.create({
        content: 'Please wait...',
    });

    constructor (
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
    ) { }

    private ngOnInit(): void {
        this.bank = this.navParams.get('bank');
    }

    private delete(bank: Bank): void {
        this.loading.present();
        this._bankService.delete(bank.db_id).subscribe(
            response => {
                this.loading.dismiss();
                this.viewCtrl.dismiss();
            });
    }

    private update(bank: Bank): void {
        this.loading.present();
        this._bankService.update(bank).subscribe(() => {
            this.loading.dismiss();
            this.viewCtrl.dismiss();
        });
    }

    private close(): void {
        this.viewCtrl.dismiss();
    }

    private deleteConfirm(): void {
        const alert: Alert = this.alertCtrl.create({
            title: 'Delete Confirm',
            message: 'Are you sure you want to delete this bank?',
            buttons: [
                {text: 'Cancel'},
                {text : 'Delete', handler: () => this.delete(this.bank)},
            ],
        });
        alert.present();
    }
}
