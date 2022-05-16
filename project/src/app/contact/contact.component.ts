import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from './contacts';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  contactId = 1;
  addMe: string = "";
  contact!: Contact;


  constructor(private apiService: ApiService) { }
  getContacts() {
    this.apiService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  ngOnInit(): void {
    this.getContacts();
  }


  getContact() {
    this.apiService.getContact(this.contactId).subscribe(data => {
      this.contact = data;
    });
  }

  addContact() {
    let contact: Contact = {
      id: 0,
      first_name: this.addMe,
      last_name: "",
      avatar: "https://th.bing.com/th/id/OIP.NkVlMldT0rn1beTIQuXU_wAAAA?pid=ImgDet&rs=1",
    }
    this.apiService.addContact(contact).subscribe(data => {
      console.log(contact);
    });
    this.getContacts();
  }
}
