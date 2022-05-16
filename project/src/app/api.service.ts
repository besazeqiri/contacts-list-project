import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs';
import { Contact } from './contact/contacts';
import { Address } from './contact-details/address';
import { Countries } from './contact-details/countries';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:3000/";
  private contacts = "contacts";
  private address = "addresses";
  private countries = "countries";


  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.SERVER_URL + this.contacts).pipe(
      tap(data => console.log(data)));
  }

  getContact(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(this.SERVER_URL + this.contacts + '/' + id).pipe();
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.SERVER_URL + this.contacts, contact).pipe(
      tap(data => console.log(data)));
  }

  getAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.SERVER_URL + this.address).pipe(
      tap(data => console.log(data)));
  }

  getAddressById(id: number) {
    return this.httpClient.get<Address[]>(this.SERVER_URL + this.contacts + '/' + id + '/' + this.address);
  }

  getCountries(): Observable<Countries[]> {
    return this.httpClient.get<Countries[]>(this.SERVER_URL + this.countries).pipe(
      tap(data => console.log(data)));
  }

  getCountry(id: number): Observable<Countries> {
    return this.httpClient.get<Countries>(this.SERVER_URL + this.countries + '/' + id).pipe();
  }

  deleteAdrese(id: number): Observable<Address[]> {
    console.log(id);
    return this.httpClient.delete<Address[]>(this.SERVER_URL + this.address + '/' + id).pipe();
  }


  addAddress(id: number, adresa: Address): Observable<Address> {
    return this.httpClient.post<Address>(this.SERVER_URL + this.contacts + '/' + id + '/' + this.address, adresa).pipe(
      tap(data => console.log(data)));
  }

  updateAddress(adresa: Address, id: number): Observable<Address[]> {
    return this.httpClient.put<Address[]>(this.SERVER_URL + this.address + '/' + id, adresa).pipe();
  }

}