
import { Component, OnInit } from '@angular/core';
import profData from '../../assets/mockdata/prof.json';
import horConsultes from '../../assets/mockdata/horaris.json';
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


  professorat= profData;

  horarisConsulta= horConsultes;

  diaSeleccionat=""; //format  año-mes-diaThora 
  horaSeleccionada="";
  horesLliures=[]; // variable creada per a guardar les hores disponibles del dia que seleccionarem
  

  startTime="";
  endTime="";

  constructor(
    private http: HttpClient,
    public alertController: AlertController
  ) { 
  }

  ngOnInit() {
    this.diaSeleccionat=this.horarisConsulta.consultes[0][0];
    this.seleccio(this.diaSeleccionat);
    this.horaSeleccionada=this.horesLliures[0];
  }


  clicked(){
    console.log("Dia: "+this.diaSeleccionat);
    console.log("Hora: "+this.horaSeleccionada);

    let url= "http://"+this.host+":"+this.port+"/";

    let httpHeaders = new HttpHeaders({ 
     'Content-Type': 'application/json; charset=UTF-8', 
     'Accept': 'application/json'});
    let options = {headers: httpHeaders};  

    let data = { //data a passar a la api del calendari
      studentName: 'Jane Doe',
      studentEmail: 'talayaalba@gmail.com',
      teacherName: 'Saul Garcia Huertes',
      teacherEmail: 'alba.talaya@estudiantat.upc.edu',
      teacherSubject: 'PAE',
      meeting: {
        start: '2021-04-22T20:30:00',
        end: '2021-04-22T20:50:00',
      }
    };
    let body=JSON.stringify(data);

    /*this.http.post(url, body, { ...options, responseType: 'text' }).subscribe( //el response type avisa que la resposta que s'espera no és un json sinó un string
      (response: any) => {
        console.log(response)
        this.responseAlert(response)}, 
      (error: any) => {
        console.log(error)}
    );*/

     this.responseAlert("S'ha sol.licitat la consulta correctament, comprova el teu correu electrònic."); 
  }


  async responseAlert(response) {
    const alert = await this.alertController.create({
      message: response,
      buttons: ['OK'],
      cssClass: 'responseAlert'
    });

    await alert.present();
  }

  seleccio(dia){ // s'executa la funció quan es selecciona un dia
    this.horesLliures=[];
    for (let i=0; i< this.horarisConsulta.consultes.length; i++){ //itera entre tots els possibles dies de consulta
      for(let entry of this.horarisConsulta.consultes[i]){ //de cada dia de consulta, itera entre totes les hores
          if(this.horarisConsulta.consultes[i][0]==this.diaSeleccionat&&entry!=this.horarisConsulta.consultes[i][0]){ //si es el dia que toca i no es l'eelement 0 (dia)
              this.horesLliures.push(entry); //afegeix 
          }
          }
    }
    
    this.horaSeleccionada=this.horesLliures[0];
  }

 
}
