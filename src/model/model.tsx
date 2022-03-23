export class Aluno{
  
    constructor() {
}
   
   // constructor(id?: number, id_aluno?: string, matricula?: string, semestre?: string, estilo?: string, nota?: string) {
  //   this.id = id;
  //   this.id_aluno = id_aluno;
  //   this.matricula = matricula;
  //   this.semestre = semestre;
  //   this.estilo = estilo;
  //   this.nota = nota;
  // }
   public id: number;
   public id_aluno: string;
   public matricula: string;    
   public semestre: string; 
   public estilo: string;   
   public nota: string;    
   
   toString() {
     return this.id+''+this.id_aluno+''+this.matricula+''+this.semestre+''+this.estilo+''+this.nota;
   }
 }