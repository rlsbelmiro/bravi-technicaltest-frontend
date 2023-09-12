import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contacts: Contact[] = [];
  @Input() personId: string = '';
  showForm: boolean = false;
  type: number = 0;
  text: string = '';
  contactId: string = '';
  constructor(
    private contactService: ContactService
  ){

  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.contacts = await this.contactService.getContacts(this.personId);
  }

  newContact(){
    this.contactId = '';
    this.text = '';
    this.type = 0;
    this.showForm = true;
  }

  cancel(){
    this.contactId = '';
    this.text = '';
    this.type = 0;
    this.showForm = false;
  }

  async save() {
    if(this.type == 0) {
      alert('Informe o tipo');
      return;
    }
    if(!this.text) {
      alert('Informe o contato');
      return;
    }
    var contact: Contact = {
      id: this.contactId,
      personId: this.personId,
      text: this.text,
      type: this.type
    };
    var newContact = await this.contactService.save(contact);
    if(!this.contactId) {
      if(!this.contacts)
        this.contacts = [];

      this.contacts.push(newContact);
    }
    else {
      var contactExist = this.contacts.filter(c => c.id == this.contactId)[0];
      contactExist.text = this.text;
      contact.type = this.type;
    }
    this.cancel();
  }

  async delete(contactId: string) {
    var contactDelete = this.contacts.filter(p => p.id == contactId);
    if(contactDelete.length > 0) {
      var result = await this.contactService.delete(contactId);
      if(result) {
        var index = this.contacts.findIndex(p => p.id == contactId);
        this.contacts.splice(index,1);
      }
    }
  }
}
