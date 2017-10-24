<<<<<<< HEAD
import { Component }                        from '@angular/core';
import { NavParams, ViewController,
         NavController, LoadingController,
         Loading }                          from 'ionic-angular';
import { Bank }                             from '../../interfaces/bank';
import { BankService }                      from '../../services/bank.service';

@Component({
    selector: 'edit-component',
    templateUrl: './add.page.html',
})
export class AddPage {

    public bankName: string;
    public bankCode: string;

    private loading: Loading = this.loadingCtrl.create({
        content: 'Please wait...',
    });

    constructor(
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
    ) { }

    private add(bankName: string, bankCode: string): void {
        this.loading.present();
        bankName = bankName.trim();
        bankCode = bankCode.trim();
        this._bankService.create(bankName, bankCode).subscribe((response) => {
            this.loading.dismiss();
            this.close();
        });
    }

    private close(): void {
        this.viewCtrl.dismiss();
    }
}
=======
import { Component }                        from '@angular/core';
import { NavParams, ViewController,
         NavController, LoadingController,
         Loading }                          from 'ionic-angular';
import { Bank }                             from '../../interfaces/bank';
import { BankService }                      from '../../services/bank.service';

@Component({
    selector: 'edit-component',
    templateUrl: './add.page.html',
})
export class AddPage {

    public bankName: string;
    public bankCode: string;

    private loading: Loading = this.loadingCtrl.create({
        content: 'Please wait...',
    });

    constructor(
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
    ) { }

    private add(bankName: string, bankCode: string): void {
        this.loading.present();
        bankName = bankName.trim();
        bankCode = bankCode.trim();
        this._bankService.create(bankName, bankCode).subscribe((response) => {
            this.loading.dismiss();
            this.viewCtrl.dismiss();
        });
    }

    private close(): void {
        this.viewCtrl.dismiss();
    }
}
>>>>>>> b996b01e1d349b2328638060209450aa90898445
