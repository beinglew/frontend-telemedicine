import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Address } from "./Address";
import { AddressService } from "./address.service";
@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{
    
    addressState = new BehaviorSubject<Address>(null);
    address$ = this.addressState.asObservable().subscribe();

    addresses!: Address[];
    addresss!: Address;
    message: any;
    constructor(private addressService: AddressService) {}

    ngOnInit(): void {
        this.addressService.getAddresses().subscribe((data: Address[]) => {
            console.log(data);
            this.addresses = data;
        });
    }

    public save(form: NgForm){
        const response =  this.addressService.saveAddress(form.value as Address).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }

    public delete(id: number){
        this.addressService.deleteAddress(id).subscribe((data) => this.message = data);
        window.location.reload();
    }

    public update(form: NgForm, a: Address){
        const response = this.addressService.updateAddress(form.value as Address, a.id).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }
}