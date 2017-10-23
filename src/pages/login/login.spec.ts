import { DebugElement }                     from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule }                      from '@angular/forms';
import { By }                               from '@angular/platform-browser';
import { NavController, IonicModule }       from 'ionic-angular';
import { LoginPage }                        from './login';
import { LoginService }                     from '../../services/login.service';
import { Observable }                       from 'rxjs/Observable';

describe('LoginPage', () => {

    let comp: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    const email: string = 'e';
    const password: string = 'p';

    class LoginServiceMock {
        private login(email: string, password: string): Observable<Boolean> {
            return new Observable<Boolean> (observer => {
                if (email === 'e' && password === 'p') {
                    observer.next(true);
                } else {
                    observer.next(false);
                }
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: LoginService, useClass: LoginServiceMock },
                NavController,
            ],
            declarations: [
                LoginPage,
            ],
            imports: [
                FormsModule,
                IonicModule.forRoot(LoginPage),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should confirm the email and password', () => {
        let deEmail: DebugElement;
        let dePassword: DebugElement;
        comp.email = email;
        comp.password = password;

        fixture.detectChanges();
        deEmail = fixture.debugElement.query(By.css('#email'));
        dePassword = fixture.debugElement.query(By.css('#password'));
        expect(deEmail.attributes['ng-reflect-model']).toBe('e');
        expect(dePassword.attributes['ng-reflect-model']).toBe('p');
    });
});
