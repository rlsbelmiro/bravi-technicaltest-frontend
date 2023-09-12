import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Response } from '../models/response.model';
import { SERVER_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  
  CONTROLLER_NAME = 'contact'
  constructor(private http: HttpClient) 
  { }

  public async getContacts(personId: string) : Promise<Contact[]> {
    var persons: Contact[] = [];
    var result = await this.http.get<Response<Contact[]>>(`${SERVER_URL}/person/${personId}/contacts`).toPromise();
    return result?.content;
  }

  public async save(obj: Contact) : Promise<Contact> {
    var result = null;
    if(obj.id)
      result = await this.http.put<Response<Contact>>(`${SERVER_URL}/${this.CONTROLLER_NAME}/${obj.id}`, obj).toPromise();
    else
      result = await this.http.post<Response<Contact>>(`${SERVER_URL}/${this.CONTROLLER_NAME}`, obj).toPromise();

    return result?.content;
  }

  public async delete(personId: string) : Promise<boolean> {
    var result = await this.http.delete<Response<any>>(`${SERVER_URL}/${this.CONTROLLER_NAME}/${personId}`).toPromise();
    return result?.statusCode == '200';
  }
}
