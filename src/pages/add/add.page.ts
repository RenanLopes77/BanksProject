import { Component }                        from '@angular/core';
import { NavParams, ViewController,
         NavController, LoadingController,
         Loading,
         ToastController,
         Toast }                            from 'ionic-angular';
import { Bank }                             from '../../interfaces/bank';
import { BankService }                      from '../../services/bank.service';

@Component({
    selector: 'edit-component',
    templateUrl: './add.page.html',
})
export class AddPage {

    public bankName: string = '';
    public bankCode: string = '';

    private loading: Loading = this.loadingCtrl.create({
        content: 'Please wait...',
    });

    constructor(
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
    ) { }

    private add(bankName: string, bankCode: string): void {
        if (bankName === '' || bankCode === '')
            this.incompleteData();
        else {
            this.loading.present();
            this._bankService.create(bankName, bankCode).subscribe(
                response => {
                    this.close();
                },
                error => {
                    this.close();
                });
        }
    }

    private close(): void {
        this.loading.dismiss();
        this.viewCtrl.dismiss();
    }

    private incompleteData(): void {
        const toast: Toast = this.toastCtrl.create({
            message: 'There are blank fields',
            duration: 2000,
            position: 'middle',
        });
        toast.present();
    }
}
