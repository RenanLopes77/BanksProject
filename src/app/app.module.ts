import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule }                               from '@angular/http';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';

import { MyApp }                                    from './app.component';
import { LoginPage }                                from '../pages/login/login';
import { BankPage }                                 from '../pages/bank/bank';
import { AddPage }                                  from '../pages/add/add.page';
import { EditPage }                                 from '../pages/edit/edit.page';
import { LoginService }                             from '../pages/services/login.service';
import { BankService }                              from '../pages/services/bank.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    BankPage,
    AddPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    BankPage,
    AddPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BankService,
    LoginService,
    // { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }