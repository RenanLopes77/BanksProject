import { Component }                                 from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BankService }                               from '../services/bank.service';
import { AddPage }                                   from '../add/add.page';
import { EditPage }                                  from '../edit/edit.page';
import { LoginPage }                                 from '../login/login';
import { Bank }                                      from '../../interfaces/bank';
import { Observable }                                from 'rxjs/Observable';
import { Subject }                                   from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'page-bank',
    templateUrl: 'bank.html'
})
export class BankPage {
    bankName: String;
    bankCode: string;
    inputSearch: string;
    banks: Bank[];

    searchTerm: string;
    items: string[] = [];

    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private _bankService: BankService,
    ) { }

    ngOnInit(): void {
        this.getBanks();
    }
    
    getBanks(): void {
        this._bankService.getBanks().subscribe( banks => {
                this.banks = banks;
        });
    }
      
    filterBanks(ev: any) {
        
        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.banks = this.banks.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.getBanks();
        }
    }

    presentAddModal() {
        let modal = this.modalCtrl.create(AddPage);
        modal.onDidDismiss(response => {
            this.getBanks();
        });
        modal.present();
    }

    presentEditModal(bank: Bank) {
        let modal = this.modalCtrl.create(EditPage, { bank: bank });
        modal.onDidDismiss(response => {
            this.getBanks();
        });
        modal.present();
    }

    exit(): void {
        this.navCtrl.setRoot(LoginPage);
        localStorage.clear();
    }
}