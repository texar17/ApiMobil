import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoriaModel } from '../service/models/categoria_models';
import { IDietaModel } from '../service/models/dieta_models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  constructor(private http : HttpClient, private route: ActivatedRoute, private router: Router){};

  categorias : any ;
  dietas : any ;
  planDietarios: IDietaModel[]  = [];
  selectCategoria : any ;
  estaturaUser : any ;
  pesoUser : any ;
  imcResult: String = '';
  imc: number = 0.0;

   ngOnInit(){ 
    this.estaturaUser = this.route.snapshot.queryParams['estatura']; 
    this.pesoUser = this.route.snapshot.queryParams['peso'];
    
    this.getCategoria(); 
   }


  

  getCategoria():void {
    this.http.get<[ICategoriaModel]>('http://localhost:3001/Categorias')
    .subscribe((res: ICategoriaModel[] ) =>{
      this.categorias = res; 
      this.calculateImc(); 
      for (let index = 0; index < this.categorias.length; index++) {
        const categoria = this.categorias[index];
        if(categoria.estado == this.imcResult){ 
          this.selectCategoria = categoria; 
        }
      }
      this.getDieta(); 
    });
  };

getDieta():void {
    this.http.get<[IDietaModel]>( 'http://localhost:3002/Dieta' )
    .subscribe(( res: IDietaModel[] ) =>{
      this.dietas = res;
      for (let index = 0; index < this.dietas.length; index++) {
        const dieta = this.dietas[index];
        if(dieta.categoria == this.selectCategoria.codigo){
          this.planDietarios.push(dieta); 
        }
      }
    });
  };


  //Calculo del IMC
  calculateImc(){
    const alturaCm = this.estaturaUser / 100;
    this.imc = this.pesoUser / Math.pow(alturaCm,2);
    if(this.imc < 18.5){
      this.imcResult = 'Peso bajo';
    
    }else if(this.imc > 18.5 && this.imc <= 24.9){
      this.imcResult = 'Ideal';
    
    }else if(this.imc > 25.0 && this.imc <= 29.9){
      this.imcResult = 'Sobre Peso';
      
    }else if(this.imc > 29.9 && this.imc <= 34.9){
      this.imcResult = 'Obesidad';
      
    }else if(this.imc > 35 && this.imc <= 39.9){
      this.imcResult = 'Obesidad Severa';
      
    }else{
      this.imcResult= 'Obesidad Morbida';
    }
    
    
  }

  //Metodo para regresar a la pantalla anterior
  getBack(){
    this.router.navigate(['/service']);

  }

}
