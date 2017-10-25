import { ComponentFixture, TestBed, inject }          from '@angular/core/testing';
import { DebugElement }                               from '@angular/core';
import { HttpModule,
         Http,
         Response,
         ResponseOptions,
         XHRBackend }                                 from '@angular/http';
import { MockBackend, MockConnection }                from '@angular/http/testing';
import { LoginService }                               from './login.service';
import { ToastControllerMock }                        from '../mock/toastcontroller-mock';
import { ToastController }                            from 'ionic-angular';
import { ResponseType, Request, ResponseOptionsArgs } from '@angular/http';

class MockError extends Response implements Error {
   public name: any;
   public message: any;
}

describe('BankService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                LoginService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: ToastController, useCLass: ToastControllerMock },
            ],
        }).compileComponents();
    });

    describe('login()', () => {
        it('should return an Observable<Boolean>', inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {
                const user: any = {
                    email: 'felipe@quickfast.com',
                    password: 'iquick7s@2017',
                };

                const mockResponse: any = {
                    success: {
                        success: [
                            {message: 'm', token: 'a.a.a'},
                        ],
                    },
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse),
                    })));
                });

                _loginService.login(user.email, user.password).subscribe(response => {
                    expect(response).toBeTruthy();
                });
            }),
        );

        it('should return login() error', inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe((connection: MockConnection) => {
                let body: string = JSON.stringify({key: 'val'});
                let opts: ResponseOptionsArgs = {url: 'http://felipe.com', type: ResponseType.Error, status: 404, body: body, headers: null};
                let responseOpts: ResponseOptions = new ResponseOptions(opts);
                connection.mockError(new MockError(responseOpts));
            });

            _loginService.login('email', 'password').subscribe(
                response => {
                    console.log('success');
                },
                error => {
                    expect(error.status).toBe(404);
                });
        }));
    });
});
