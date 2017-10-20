import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { HttpModule,
         Http, 
         Response,
         ResponseOptions,
         XHRBackend }                               from "@angular/http";
import { MockBackend }                              from "@angular/http/testing";
import { LoginService }                             from "./login.service";

describe('BanksService', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                LoginService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));
    
    describe('login()', () => {
        it('should return an Observable<Boolean>',
            inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {
            
                const user = {
                    email: 'felipe@quickfast.com',
                    password: 'iquick7s@2017',
                }
            
                const mockResponse = {
                    success: {
                        success: [
                            {message:'m', token:'a.a.a'}   
                        ]
                    }
                };
                                
                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                _loginService.login(user.email, user.password).subscribe((response) => {
                    expect(response).toBeTruthy();
                });
            })
        );
    });
});