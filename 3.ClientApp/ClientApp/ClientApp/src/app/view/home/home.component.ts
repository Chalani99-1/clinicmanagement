import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userspecmessages: any[] = [
    {name: 'chalani.v@polonnaruwa.lk', updated: new Date('5/30/24')},
    {name: 'dulshan.k@polonnaruwa.lk', updated: new Date('5/17/24')},
    {name: 'it@polonnaruwa.lk', updated: new Date('5/28/24')},
    {name: 'it@polonnaruwa.lk', updated: new Date('4/28/24')},
  ];

  generalmessages: any[] = [
    {name: 'hr@polonnaruwa.lk', updated: new Date('5/30/24')},
    {name: 'admin@polonnaruwa.lk', updated: new Date('5/17/24')},
    {name: 'it@polonnaruwa.lk', updated: new Date('5/28/24')},
    {name: 'it@polonnaruwa.lk', updated: new Date('4/28/24')}
  ];
}
