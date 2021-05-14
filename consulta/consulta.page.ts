
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import profData from '../../assets/mockdata/prof.json';
//import consultes from '../../assets/mockdata/consultes.json';
import data from '../../assets/mockdata/get-student.json';
import matr from '../../assets/mockdata/get-matricula.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';



    

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  host= "192.168.56.1"; //"localhost"; //ara IP
  port= "3000"; 

  profileId: string;
  classId: string;
  student= data;
  matricula=matr;

  //professorat=profData.data[0];
  professorat;
  consultes;

  setmana=["Diumenge","Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
  mes=["de Gener", "de Febrer", "de Març", "d'Abril", "de Maig", "de Juny", "de Juliol", "d'Agost", "de Setembre", "d'Octubre", "de Novembre", "de Desembre"];

  horarisConsultaDates;

  diaSeleccionat=new Date(); 
  horaSeleccionada=new Date();
  
  diesLliures=[];  // variable creada per a guardar les hores disponibles del dia que seleccionarem
  horesLliures=[]; // variable creada per a guardar les hores disponibles del dia que seleccionarem
  

  startTime=new Date();
  endTime=new Date();
  meetingLength= 30; //30min

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) { 
  }

  ngOnInit() {
    this.profileId= this.activatedRoute.snapshot.paramMap.get('id_prof');
    this.classId= this.activatedRoute.snapshot.paramMap.get('id_class');


    this.http.get<any>('https://9k037tr2vi.execute-api.eu-west-3.amazonaws.com/default/get-professor?idgauss='+ this.profileId).subscribe(res=> {
      this.professorat=res[0];
      this.consultes=res[1];
      this.professorat.consultes= res[2];

      this.getHoraris();

      this.diesDisponibles();
      this.diaSeleccionat=this.diesLliures[0];
      this.horesDisponibles(this.diaSeleccionat);
      this.horaSeleccionada=this.horesLliures[0];


    })

  }


  clicked(){

    this.startTime= new Date(this.horaSeleccionada);
    this.endTime= new Date(this.startTime.getTime() + this.meetingLength*60000);

    let dia= this.setmana[this.startTime.getDay()]+", "+this.startTime.getDate()+" "+this.mes[this.startTime.getMonth()];
    let hora= ('0'+this.startTime.getHours()).slice(-2)+":"+('0'+this.startTime.getMinutes()).slice(-2);

    let url= "http://"+this.host+":"+this.port+"/";

    let httpHeaders = new HttpHeaders({ 
     'Content-Type': 'application/json; charset=UTF-8', 
     'Accept': 'application/json'});
    let options = {headers: httpHeaders};  

    let data = { //data a passar a la api del calendari
      studentName: this.student.firstName+" "+this.student.lastName,
      studentEmail: 'talayaalba@gmail.com', //this.student.email,
      teacherName: this.professorat.nom_prof, //tret de peticio amb id
      teacherEmail: 'alba.talaya@estudiantat.upc.edu', //this.professorat.email,    //tret de peticio amb id
      teacherSubject: this.getClass(),
      meeting: {
        start: this.startTime,
        end: this.endTime,
      }
    };

    let body=JSON.stringify(data);

    /*this.http.post(url, body, { ...options, responseType: 'text' }).subscribe( //el response type avisa que la resposta que s'espera no és un json sinó un string
      (response: any) => {
        console.log(response)
        //this.responseAlert(response)}, 
        this.responseAlert("S'ha sol·licitat consulta per al "+dia+" a les "+hora+". Comprova el teu correu electrònic.");}, 
      (error: any) => {
        console.log(error)}
    );*/
    
    
    this.responseAlert("S'ha sol·licitat consulta per al "+dia+" a les "+hora+". Comprova el teu correu electrònic.");
    this.getHoraris();
    }

    getHoraris(){//API
      this.horarisConsultaDates = this.consultes.map(dateString => new Date(dateString)); 
    }

  async responseAlert(response) {
    const alert = await this.alertController.create({
      message: response,
      buttons: ['OK'],
      cssClass: 'responseAlert'
    });
    await alert.present();
    
  }

  horesDisponibles(day){ //agrupa totes les hores disponibles del dia seleccionat
    let dia= new Date(day);
    this.horesLliures=[];
    for(let i=0; i<this.horarisConsultaDates.length; i++){
      if(this.horarisConsultaDates[i].getFullYear()== dia.getFullYear() && 
          this.horarisConsultaDates[i].getMonth()==dia.getMonth() &&
          this.horarisConsultaDates[i].getDate()==dia.getDate()){ // si es el mateix any/mes/dia
            this.horesLliures.push(this.horarisConsultaDates[i]);
          }
    }
    this.horaSeleccionada=this.horesLliures[0];
  }

  diesDisponibles(){ //es guarda a diesLliures tots els diferents dies que te disponibles, no imprimeix directament tots ja que sino sortirien repetits
    this.diesLliures=[];
    let diaEscollit=this.horarisConsultaDates[0];
    this.diesLliures.push(diaEscollit);
    for(let i=0; i<this.horarisConsultaDates.length; i++){
      if(!(this.horarisConsultaDates[i].getFullYear()== diaEscollit.getFullYear() && 
          this.horarisConsultaDates[i].getMonth()==diaEscollit.getMonth() &&
          this.horarisConsultaDates[i].getDate()==diaEscollit.getDate())){ // si es el mateix any/mes/dia
            diaEscollit=this.horarisConsultaDates[i];
            this.diesLliures.push(diaEscollit);
          }
    }
  }

 getClass(){
   for(let i=0; i<this.matricula.subjects.length; i++){
    if(this.matricula.subjects[i].codiUPC==this.classId){
        return this.matricula.subjects[i].shortName;
      }
   }
 }
}
