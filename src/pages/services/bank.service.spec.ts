import { TestBed, async, inject } from "@angular/core/testing";
import { HttpModule,
         Http, 
         Response,
         ResponseOptions,
         XHRBackend }                                from "@angular/http";
import { MockBackend }                               from "@angular/http/testing";
import { BankService }                               from "../services/bank.service";
import { Bank }                                      from "../../interfaces/bank";

describe('BankService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                BankService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    //ERRO no BANKSERVICE
    fit('should return an Observable<Bank[]>',
        inject([BankService, XHRBackend], (_bankService, mockBackend) => {
       
            console.log('rteres');
        
            const banksResponse: Bank[] = [
                { name: "bank", code: "159", db_id: 159 }
            ];
            
            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                  body: JSON.stringify(banksResponse)
                })));
            });

            _bankService.getBanks().subscribe(response => {
                console.log("awawawawaw");
                expect(response).toBeNull();
            });
        })
    );
    
    // describe('create()', () => {
    //     it('should return NULL',
    //     inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
    //             console.log("ert");
    //             const mockResponse = {
    //                 success: {
    //                     bank: 159,
    //                     message:'m'   
    //                 }
    //             };

    //             mockBackend.connections.subscribe((connection) => {
    //                 connection.mockRespond(new Response(new ResponseOptions({
    //                     body: JSON.stringify(mockResponse)
    //                 })));
    //             });

    //             let s: string;
    //             _bankService.create(s, s).subscribe(response => {
    //                 console.log(response);
    //                 expect(response).toBeNull();
    //             });
    //         })
    //     );
    // });

    // describe('delete()', () => {
    //     it('should return NULL',
    //         inject([BankService, XHRBackend], (_bankService, mockBackend) => {    
    //             const banks: Bank[] = [
    //                 {code: '22', name: 'NomeDoBanco2', db_id: 22},
    //                 {code: '33', name: 'NomeDoBanco3', db_id: 33},
    //             ]
    //             mockBackend.connections.subscribe((connection) => {
    //                 connection.mockRespond(new Response(new ResponseOptions ({
    //                     body: JSON.stringify(null)
    //                 })));
    //             });

    //             _bankService.delete(banks[0].db_id).subscribe( response => {
    //                 expect(response).toBeNull();
    //             });
    //         })
    //     )
    // });

    // describe('update()', () => {
    //     it('should return NULL',
    //         inject([BankService, XHRBackend], (_bankService, mockBackend) => {
    //             const bank: Bank = {
    //                 code: '22', name: 'NomeDoBanco2', db_id: 22
    //             };

    //             mockBackend.connections.subscribe((connection) => {
    //                 connection.mockRespond(new Response(new ResponseOptions ({
    //                     body: JSON.stringify(null)
    //                 })));
    //             });

    //             _bankService.update(bank).subscribe(response => {
    //                 expect(response).toBeNull();
    //             });
    //         })
    //     )
    // });
});