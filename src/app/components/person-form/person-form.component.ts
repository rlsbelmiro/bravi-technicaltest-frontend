import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  persons: Person[] = [];
  personName: string = '';
  personId: string = '';
  showForm: boolean = false;
  constructor(private personService: PersonService) {
    
  }

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.persons = await this.personService.getPersons();
  }

  async save() {
    if(!this.personName) {
      alert('Por favor, informe um nome');
      return;
    }
    var person: Person = {
      id: this.personId,
      name: this.personName
    };
    var newPerson = await this.personService.save(person);
    if(!this.personId) {
      if(!this.persons) 
        this.persons = [];
      
      this.persons.push(newPerson);
    }
    else {
      var personExist = this.persons.filter(p => p.id == this.personId)[0];
      personExist.name = this.personName;
    }
    this.cancel();
  }

  edit(personId: string){
    var personEdit = this.persons.filter(p => p.id == personId);
    if(personEdit.length > 0) {
      this.personName = personEdit[0].name;
      this.personId = personEdit[0].id;
      this.showForm = true;
    }
  }

  async delete(personId: string) {
    var personDelete = this.persons.filter(p => p.id == personId);
    if(personDelete.length > 0) {
      var result = await this.personService.delete(personId);
      if(result) {
        var index = this.persons.findIndex(p => p.id == personId);
        this.persons.splice(index,1);
      }
    }
  }

  cancel() {
    this.personId = '';
    this.personName = '';
    this.showForm = false;
  }

  newPerson() {
    this.personId = '';
    this.personName = '';
    this.showForm = true;
  }
}