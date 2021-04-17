import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import profData from '../../assets/mockdata/prof.json';

@Component({
  selector: 'app-professorat',
  templateUrl: './professorat.page.html',
  styleUrls: ['./professorat.page.scss'],
})
export class ProfessoratPage implements OnInit {

    professorat= profData;
    //profileId: string;

  constructor(
    /*private activatedRoute: ActivatedRoute,
    private http: HttpClient*/
  ) { }

  ngOnInit() {
    /*
    this.profileId= this.activatedRoute.snapshot.paramMap.get('id')
    this.http.get('https://rickandmortyapi.com/api/character/'+ this.profileId).subscribe(res=> {
      this.character=res
    })
    */
  }

}
