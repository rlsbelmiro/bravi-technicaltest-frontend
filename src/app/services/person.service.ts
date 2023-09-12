import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.model';
import { Response } from '../models/response.model';
import { SERVER_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  CONTROLLER_NAME = 'person'
  constructor(private http: HttpClient) 
  { }

  public async getPersons() : Promise<Person[]> {
    var persons: Person[] = [];
    var result = await this.http.get<Response<Person[]>>(`${SERVER_URL}/${this.CONTROLLER_NAME}`).toPromise();
    return result?.content;
  }

  public async save(obj: Person) : Promise<Person> {
    var result = null;
    if(obj.id)
      result = await this.http.put<Response<Person>>(`${SERVER_URL}/${this.CONTROLLER_NAME}/${obj.id}`, obj).toPromise();
    else
      result = await this.http.post<Response<Person>>(`${SERVER_URL}/${this.CONTROLLER_NAME}`, obj).toPromise();

    return result?.content;
  }

  public async delete(personId: string) : Promise<boolean> {
    var result = await this.http.delete<Response<any>>(`${SERVER_URL}/${this.CONTROLLER_NAME}/${personId}`).toPromise();
    return result?.statusCode == '200';
  }
}
