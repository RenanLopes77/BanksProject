import { TestBed, async, ComponentFixture }      from '@angular/core/testing';
import { DebugElement }                          from '@angular/core';
import { FormsModule }                           from '@angular/forms';
import { By }                                    from '@angular/platform-browser';
import { NavParams, NavController, IonicModule } from 'ionic-angular';
import { Observable }                            from 'rxjs/Observable';
import { BankPage }                              from './bank';
import { Bank }                                  from '../../interfaces/bank';
import { NavParamsMock }                         from '../../mock/navparams-mock';
import { BankServiceMock }                       from '../../mock/bankservice-mock';
import { BankService }                           from '../../services/bank.service';
import { LoginPage } from '../login/login';

describe('BankPage', () => {
    let comp: BankPage;
    let fixture: ComponentFixture<BankPage>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: BankService, useClass: BankServiceMock },
                { provide: NavParams,   useClass: NavParamsMock },
                NavController,
            ],
            declarations: [
                BankPage,
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(BankPage),
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BankPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display the bank code and name', () => {
        de = fixture.debugElement.query(By.css('ion-list')).nativeElement.innerText;
        expect(de).toContain('111');
        expect(de).toContain('MeuBanco');
    });

    it('should clean the localStorage', () => {
        comp.exit();
        expect(localStorage.length).toBe(0);
    });
});
