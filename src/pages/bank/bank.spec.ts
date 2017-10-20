import { TestBed, async, ComponentFixture }      from "@angular/core/testing";
import { DebugElement }                          from "@angular/core";
import { FormsModule }                           from "@angular/forms";
import { By }                                    from "@angular/platform-browser";
import { NavParams, NavController, IonicModule } from "ionic-angular";
import { Observable }                            from "rxjs/Observable";
import { BankPage }                              from "./bank";
import { BankService }                           from "../services/bank.service";
import { Bank }                                  from "../../interfaces/bank";

describe('BankPage', () => {
    let comp: BankPage;
    let fixture: ComponentFixture<BankPage>;
    let de: DebugElement;
    let el: HTMLElement;

    let banks: Bank[] = [
        {
            code: '111',
            name: 'MeuBanco',
            db_id: 111
        }
    ]  
    
    let bank: Bank = 
        {
            code: '111',
            name: 'MeuBanco',
            db_id: 111
        }

    class NavParamsMock {
        static returnParam = null;
        public get(key): any {
            if(NavParamsMock.returnParam){
                return NavParamsMock.returnParam;
            }
            return 'default';
        }
        static setParams(value){
            NavParamsMock.returnParam = value;
        }
    }

    class BankServiceMock {
        getBanks(): Observable<Bank[]>{
            return new Observable<Bank[]>( observer => {
                observer.next(banks);
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: BankService, useClass: BankServiceMock },
                { provide: NavParams,   useClass: NavParamsMock },
                NavController,
            ],
            declarations: [
                BankPage
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(BankPage)
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BankPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display the bank code and name', () => {
        de = fixture.debugElement.query(By.css('ion-list')).nativeElement.innerText
        expect(de).toContain('111');
        expect(de).toContain('MeuBanco');
    });
});

