import { TestBed, async, ComponentFixture }                      from "@angular/core/testing";
import { DebugElement }                                          from "@angular/core";
import { FormsModule }                                           from "@angular/forms";
import { By }                                                    from "@angular/platform-browser";
import { NavParams, NavController, IonicModule, ViewController } from "ionic-angular";
import { Observable }                                            from "rxjs/Observable";
import { EditPage }                                              from "./edit.page";
import { BankService }                                           from "../services/bank.service";
import { Bank }                                                  from "../../interfaces/bank";

describe ('EditPage', () => {
    let comp: EditPage;
    let fixture: ComponentFixture<EditPage>;
    let de: DebugElement;
    
    let bank: Bank = {
        code: '111',
        name: 'MeuBanco',
        db_id: 111
    } 
    
    class NavParamsMock {
        static returnParam = null;
        public get(key): any {
            if (NavParamsMock.returnParam)
                return NavParamsMock.returnParam;
            return 'default';
        }
        static setParams(value) {
            NavParamsMock.returnParam = value;
        }
    }

    class ViewControllerMock {
        
        public readReady: any = {
            emit(): void {
    
            },
            subscribe(): any {
    
            }
        };
    
        public writeReady: any = {
            emit(): void {
    
            },
            subscribe(): any {
    
            }
        };
    
        public contentRef(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public didEnter(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public didLeave(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public onDidDismiss(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public onWillDismiss(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public willEnter(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public willLeave(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public willUnload(): any {
            return new Promise(function (resolve: Function): void {
                resolve();
            });
        }
    
        public dismiss(): any {
            return true;
        }
    
        public enableBack(): any {
            return true;
        }
    
        public getContent(): any {
            return true;
        }
    
        public hasNavbar(): any {
            return true;
        }
    
        public index(): any {
            return true;
        }
    
        public isFirst(): any {
            return true;
        }
    
        public isLast(): any {
            return true;
        }
    
        public pageRef(): any {
            return true;
        }
    
        public setBackButtonText(): any {
            return true;
        }
    
        public showBackButton(): any {
            return true;
        }
    
        public _setHeader(): any {
            return true;
        }
    
        public _setIONContent(): any {
            return true;
        }
    
        public _setIONContentRef(): any {
            return true;
        }
    
        public _setNavbar(): any {
            return true;
        }
    
        public _setContent(): any {
            return true;
        }
    
        public _setContentRef(): any {
            return true;
        }
    
        public _setFooter(): any {
            return true;
        }
        
    }
    
    class BankServiceMock {
        delete(): Observable<void> {
            return new Observable<void>(observer => {
                observer.next(null);
            });
        }

        update(): Observable<void> {
            return new Observable<void>(observer => {
                observer.next(null);
            });
        }
    }
    
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
                EditPage
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(EditPage)
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EditPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display name and code', () => {
        let deCode, deName: DebugElement;
        comp.bank = bank;
        fixture.detectChanges();

        deCode = fixture.debugElement.query(By.css('#bank-code'));
        deName = fixture.debugElement.query(By.css('#bank-name'));
        expect(deCode.attributes['ng-reflect-model']).toBe('111');
        expect(deName.attributes['ng-reflect-model']).toBe('MeuBanco');
    });
});







