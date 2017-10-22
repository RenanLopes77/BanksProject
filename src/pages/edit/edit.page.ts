import { Component }        from "@angular/core";
import { 
         NavParams, 
         ViewController,
         NavController, 
         AlertController, 
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
    
    delete(bank: Bank): void {
        this.loading.present();
        this._bankService.delete(bank.db_id).subscribe((response) => {
            if(!response){
                this.errorToast();
            }
            this.loading.dismiss();
            this.navCtrl.pop();
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


    deleteConfirm() {
        const alert = this.alertCtrl.create({
            title: 'Delete Confirm',
            message: 'Are you sure you want to delete this bank?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => { }
                },
                {
                    text: 'Delete',
                    handler: () => {
                    this.delete(this.bank);
                    }
                }
            ]
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