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

    professorat;
    profileId: string;
    classId: string;
    imatge: string;
    img_url: string;
    botoVisible: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.profileId= this.activatedRoute.snapshot.paramMap.get('id_prof');
    this.classId= this.activatedRoute.snapshot.paramMap.get('id_class');

    //this.getImage();

    this.http.get<any>('https://9k037tr2vi.execute-api.eu-west-3.amazonaws.com/default/get-professor?idgauss='+ this.profileId).subscribe(res=> {
      this.professorat=res[0];
      if(res[2]!=-1){
        this.professorat.consultes= res[2];
        this.botoVisible=true;
      } else {
        this.professorat.consultes=["Envia correu per acordar hora de consulta"];
        this.botoVisible=false;
      }
    })
    
  }


  getImage(){
    let info_noms= ["ESTEVE PALLARES SEGARRA", "ANTONIO BARBA MARTI", "JOSE PARADELLS ASPAS", "ANA M. CALVERAS AUGE", "RAMON BRAGOS BARDIA", "JOAN SARDA FARRE", "EVA MARIA VIDAL LOPEZ", "JOSEP RAFAEL PEGUEROLES VALLES"];
    let info_url=["https://futur.upc.edu/imatges/items/180413_esteve.jpg", "/assets/mockdata/"+this.professorat.img+".png", "https://www.fib.upc.edu/sites/fib/files/styles/large/public/josep-paradells-i2cat.jpg?itok=P5GnPS2G", "https://pbs.twimg.com/profile_images/557176820672372736/pt5TISV5_400x400.jpeg", "https://bcn-seer.upc.edu/en/shared/images/cv/ramon-bragos.png", "https://i1.rgstatic.net/ii/profile.image/278423097364485-1443392647316_Q512/Joan-Sarda-2.jpg", "https://bcn-seer.upc.edu/en/shared/images/cv/eva-vidal.png/@@images/67fc4206-6b72-42f9-9c04-5a239677b984.png", "https://www.upc.edu/es/sala-de-prensa/noticias/josep-pegueroles-nuevo-director-de-la-escuela-de-telecomunicacion-de-barcelona/@@images/imatge "];
    for(let i=0; i< info_noms.length; i++){
      if(info_noms[i]==this.professorat.nom_prof){
          this.img_url=info_url[i];     
      }
    }
  }



}
