import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPascienteModel } from './models/pasciente.models';
import { Router } from '@angular/router';
// import { IServiceModels } from './models/service.models';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  user : any ;
  pascientes : IPascienteModel[] = [] ;
  
  constructor(private http : HttpClient, private router: Router){};

  ngOnInit(){  
   this.getPasciente(); 
  }

  


  getPasciente():void {
    this.http.get<IPascienteModel[]>('http://localhost:3000/Pacientes' )
    .subscribe(( res: IPascienteModel[] ) =>{
    this.pascientes = res;
    });
  };


  navigatorDetail(estatura : number, peso:number):void{ 
    const querys = {estatura : estatura, peso : peso}; 
    this.router.navigate(['/detailUser'], {queryParams: querys }); 
  }

}




