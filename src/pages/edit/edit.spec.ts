import { TestBed, async, ComponentFixture }                      from '@angular/core/testing';
import { DebugElement }                                          from '@angular/core';
import { FormsModule }                                           from '@angular/forms';
import { By }                                                    from '@angular/platform-browser';
import { NavParams, NavController, IonicModule, ViewController } from 'ionic-angular';
import { Observable }                                            from 'rxjs/Observable';
import { EditPage }                                              from './edit.page';
import { BankService }                                           from '../../services/bank.service';
import { Bank }                                                  from '../../interfaces/bank';
import { ViewControllerMock }                                    from '../../mock/viewcontroller-mock';
import { NavParamsMock }                                         from '../../mock/navparams-mock';
import { BankServiceMock }                                       from '../../mock/bankservice-mock';

describe ('EditPage', () => {
    let comp: EditPage;
    let fixture: ComponentFixture<EditPage>;
    let de: DebugElement;

    let bank: Bank = {
        code: '111',
        name: 'MeuBanco',
        db_id: 111,
    };

    beforeEach(async(() => {
        NavParamsMock.setParams(null);
        TestBed.configureTestingModule({
            providers: [
                { provide: BankService, useClass: BankServiceMock },
                { provide: NavParams,   useClass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock },
                NavController,
            ],
            declarations: [
                EditPage,
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(EditPage),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display name and code', () => {
        let deCode: DebugElement;
        let deName: DebugElement;
        comp.bank = bank;
        fixture.detectChanges();

        deCode = fixture.debugElement.query(By.css('#bank-code'));
        deName = fixture.debugElement.query(By.css('#bank-name'));
        expect(deCode.attributes['ng-reflect-model']).toBe('111');
        expect(deName.attributes['ng-reflect-model']).toBe('MeuBanco');
    });

    it('should call close()', () => {
        
    });
});
