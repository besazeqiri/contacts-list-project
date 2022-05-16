import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Address } from './address';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact/contacts';
import { Countries } from './countries';



@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contacts: Contact[] = [];
  contactId = 1;
  contact!: Contact;
  conId: any;
  adresId: any;
  address!: Address;
  addresses: Address[] = [];
  addresForm: FormGroup;
  addresForm2: FormArray;

  countries: Countries[] = [];
  country!: Countries;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.addresForm = this.fb.group({
      adresa: this.fb.array([])});
    this.addresForm2 = this.fb.array([]);
  }


  ngOnInit() {
    console.log(this.addresForm["controls"]["adresa"]);
    this.activatedRoute.paramMap.subscribe(params => {
      this.conId = params.get('id');
      console.log(this.conId);});
    this.getContacts();
    this.getContact();
    this.getAddressById();
    this.getCountries();
    this.getCountry();
  }

  getAddressById() {
    this.apiService.getAddressById(this.conId).subscribe(data => {
      this.addresses = data;
      for (var i = 0; i < this.addresses.length; i++) {
        if (this.adresa.controls.length <= i) {
          // console.log(this.adresa.controls.length);
          // console.log(i)
          this.addEmptyAdress();
        }
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('id')?.setValue(this.addresses[i].id);
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('contactId')?.setValue(this.addresses[i].contactId);
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('street1')?.setValue(this.addresses[i].street1);
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('street2')?.setValue(this.addresses[i].street2);
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('town')?.setValue(this.addresses[i].town);
        (this.addresForm.get('adresa') as FormGroup).controls[i].get('country')?.setValue(this.addresses[i].country);
      }
      console.log(this.addresses);
    });
  }

  get adresa(): FormArray {
    return this.addresForm.get("adresa") as FormArray
  }

  newAdress(): FormGroup {
    return this.fb.group({
      id: '',
      street1: '',
      street2: '',
      town: '',
      country: '',
      contactId: ''
    })
  }

  addAdress() {
    this.adresa.push(this.newAdress());
    console.log(this.adresa);
  }
  addEmptyAdress() {
    let address: Address = {
      id: 0,
      street1: "",
      street2: "",
      town: "",
      country: "",
      contactId: ""
    }

    if (!this.addresses) {
      this.addresses = [];
    }

    this.adresa.push(this.newAdress());
    //  this.addressForm.patchValue(this.model);
    console.log(this.adresa);

  }

  removeAdres(adreseId: number) {
    // this.adresa().removeAt(i);
    let adressToDelete = this.addresses.splice(adreseId, 1)[0];
    this.adresa.removeAt(adreseId);

    if (adressToDelete.id > 0) {
      this.apiService.deleteAdrese(adressToDelete.id).subscribe(data => {
        console.log(adressToDelete.id);
      });
    }
  }

  getContacts(){
    this.apiService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }


  getContact() {
    this.apiService.getContact(this.conId).subscribe(data => {
      this.contact = data;
      console.log(this.contact);
    });
  }

  getCountries() {
    this.apiService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  getCountry() {
    this.apiService.getCountry(this.conId).subscribe(data => {
      this.country = data;
      console.log(this.country);
    });
  }

  onSubmit() {
    console.log(this.addresForm.value);
  }

  saveUpdate() {

    for (var i = 0; i < this.adresa.controls.length; i++) {
      let adrese = this.adresa.controls[i].value;

      if (adrese.id === "") {
        this.addAdres2(i, adrese);
      }
      else {
        this.apiService.updateAddress(adrese, adrese.id).subscribe(data => {
        });
      }
    }
  }


  addAdres2(i: number, adrese: any) {
    this.apiService.addAddress(this.conId, adrese).subscribe(data => {
      this.adresa.controls[i].get('id')?.setValue(data.id);
      this.adresa.controls[i].get('contactId')?.setValue(data.contactId);
      console.log(data);
    });
  }
  
}
