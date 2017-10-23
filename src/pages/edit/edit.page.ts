import { Component }        from "@angular/core";
import { 
         NavParams, 
         ViewController,
         NavController, 
         AlertController, Alert, 
         LoadingController,  
         ToastController 
       }                    from "ionic-angular";
import { BankService }      from "../services/bank.service";
import { Bank }             from "../../interfaces/bank";

@Component({
    selector: 'edit-page',
    templateUrl: 'edit.page.html'
})
export class EditPage {
    
    bank: Bank;

    loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

    constructor (
        private navParams: NavParams,
        private _bankService: BankService,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) { }

    ngOnInit() {
        this.bank = this.navParams.get('bank')
    }

    private delete(bank: Bank): void {
        this.loading.present();
        this._bankService.delete(bank.db_id).subscribe(
            response => {
                if (!response) {
                    this.errorToast();
                }
                this.loading.dismiss();
                this.viewCtrl.dismiss();
            },
            error => {
                // tratar error
            });
    }

    update(bank: Bank): void {
        this.loading.present();
        this._bankService.update(bank).subscribe((response) => {
            if(!response){
                this.errorToast();
            }
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

    errorToast() {
        const toast = this.toastCtrl.create({
            message: "Could not complete the operation.",
            duration: 2500,
            position: 'middle'
        });
        toast.present();
    }
}