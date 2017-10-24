import { DebugElement }                            from '@angular/core';
import { ComponentFixture }                        from '@angular/core/testing';
import { async }                                   from '@angular/core/testing';
import { TestBed }                                 from '@angular/core/testing';
import { FormsModule }                             from '@angular/forms';
import { By }                                      from '@angular/platform-browser';
import { NavParams, ViewController, NavController,
         IonicModule, LoadingController }          from 'ionic-angular';
import { AddPage }                                 from './add.page';
import { BankService }                             from '../../services/bank.service';
import { BankServiceMock }                         from '../../mock/bankservice-mock';
import { NavParamsMock }                           from '../../mock/navparams-mock';
import { ViewControllerMock }                      from '../../mock/viewcontroller-mock';
import { LoadingControllerMock }                   from '../../mock/loadingcontroller-mock';

describe('AddPage', () => {
    let comp: AddPage;
    let fixture: ComponentFixture<AddPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: BankService, useClass: BankServiceMock },
                { provide: NavParams, useCLass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock },
                { provide: LoadingController, useClass: LoadingControllerMock },
                NavController,
            ],
            declarations: [
                AddPage,
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(AddPage),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display name and code', () => {
        comp.bankCode = '1';
        fixture.detectChanges();
        let deCode: DebugElement;
        deCode = fixture.debugElement.query(By.css('#bank-code'));
        expect(deCode.attributes['ng-reflect-model']).toBe('1');
    });

    it('should call close()', () => {
    });
});
