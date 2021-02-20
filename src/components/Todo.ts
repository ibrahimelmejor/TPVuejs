import { etat } from './enum';
export default class Todo {
    key: number = 0;
    title: string = "";
    etat: etat;
    edit: boolean = false;
 
    constructor(key: number, title: string, etat: etat, edit: boolean) 
    {
      this.key = key;
      this.title = title;
      this.etat = etat;
      this.edit = edit;
    }
    getTitle()
    {
      return this.title;
    }
    getEtat()
    {
      return this.etat;
    }   
}