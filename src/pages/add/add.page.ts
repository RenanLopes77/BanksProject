import { Component }                                                   from "@angular/core";
import { NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import { BankService }                                                 from "../services/bank.service";
import { Bank }                                                        from "../../interfaces/bank";

@Component({
    selector: 'edit-component',
    templateUrl: './add.page.html'
})
export class AddPage {
    
    bankName: string;
    bankCode: string;

    loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

    constructor( 
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController
    ) { }

    add(bankName: string, bankCode: string): void {
        this.loading.present();
        bankName = bankName.trim();
        bankCode = bankCode.trim();
        this._bankService.create(bankName, bankCode).subscribe(() => { 
            this.loading.dismiss();
            this.navCtrl.pop();
        });
    }

    close(): void {
        this.navCtrl.pop();
    }

    dismiss() {
        this.viewCtrl.dismiss(true);
    }
}