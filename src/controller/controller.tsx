import { Aluno } from '../model/model'
import {Conexao} from '../banco/conect'

const table = "aluno"
const db=Conexao.getConnection()

export default class alunoTabela {
     static addData(param: Aluno){
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} ( id_aluno, matricula, estilo, semestre, nota) 
                values (?,?,?,?,?)`, 
                [param.id_aluno, param.matricula, param.estilo, param.semestre, param.nota], 
                (_, { insertId, rows }) => {
                    console.log("semestre insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


     static updateByObjeto(param: Aluno) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set id_aluno = ? ,matricula = ?, semestre = ?, estilo = ?, nota = ?,  where id = ?;`, [param.id ,param.id_aluno, param.matricula, param.estilo, param.semestre, param.nota], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

      static findAll() {        
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}