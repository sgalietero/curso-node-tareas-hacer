const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado={};
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto() {
        this.listadoArr.forEach( (tarea, idx) => {
            const pre = `${idx+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${pre} ${desc} :: ${estado}`)
        });
    }

    listarPendientesCompletadas(completadas = true){

//        this.listadoArr.filter((tarea, idx) => {
//            const {completadoEn} = tarea;
//            if(completadas && completadoEn){
//                return true;
//            } else if (!completadas && !completadoEn){
//                return true;
//            } else {
//                return false;
//            }
//        }).forEach((tarea, idx) => {
//            const pre = `${idx+1}`.green;
//            const {desc, completadoEn} = tarea;
//            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
//            console.log(`${pre} ${desc} :: ${estado}`)
//        });
        let contador = 0;
        this.listadoArr.forEach((tarea, idx) => {
            const pre = `${idx+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador +=1;
                    console.log(`${contador.toString().green} ${desc} :: ${completadoEn}`)
                }
            } else{
                if(!completadoEn){
                    contador +=1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`)
                }
            }
        });
    }

    toggleCompletadas(ids =[]) {
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }    

}

module.exports = Tareas;