import { Component, OnInit } from '@angular/core';
import data from '../../assets/mockdata/get-matricula.json'; //quan sandbox ficar davant [........]

@Component({
  selector: 'app-assignatures',
  templateUrl: './assignatures.page.html',
  styleUrls: ['./assignatures.page.scss'],
})
export class AssignaturesPage implements OnInit {

  matricula= data;
  constructor() { }

  ngOnInit() {
    
  }
}
