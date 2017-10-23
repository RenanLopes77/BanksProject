import { Component }                     from '@angular/core';
import { ModalController, NavController,
         NavParams, ToastController,
         Modal }                         from 'ionic-angular';
import { AddPage }                       from '../add/add.page';
import { EditPage }                      from '../edit/edit.page';
import { LoginPage }                     from '../login/login';
import { BankService }                   from '../../services/bank.service';
import { Bank }                          from '../../interfaces/bank';
import { Observable }                    from 'rxjs/Observable';
import { Subject }                       from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'page-bank',
    templateUrl: 'bank.html',
})
export class BankPage {
    public bankName: String;
    public bankCode: string;
    private inputSearch: string;
    public banks: Bank[];

    private searchTerm: string;
    private items: string[] = [];

    constructor(
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private navParams: NavParams,
        private _bankService: BankService,
        private toastCtrl: ToastController,
    ) { }

    private ngOnInit(): void {
        this.getBanks();
    }

    private getBanks(): void {
        this._bankService.getBanks().subscribe( banks => {
                this.banks = banks;
        });
    }

    private filterBanks(ev: any): void {
        let val: any = ev.target.value;

        if (val && val.trim() !== '') {
            this.banks = this.banks.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
            this.getBanks();
        }
    }

    private presentAddModal(): void {
        let modal: Modal = this.modalCtrl.create(AddPage);
        modal.onDidDismiss(response => {
            this.getBanks();
        });
        modal.present();
    }

    private presentEditModal(bank: Bank): void {
        let modal: Modal = this.modalCtrl.create(EditPage, { bank: bank });
        modal.onDidDismiss(response => {
            this.getBanks();
        });
        modal.present();
    }

    private exit(): void {
        this.navCtrl.setRoot(LoginPage);
        localStorage.clear();
    }
}
