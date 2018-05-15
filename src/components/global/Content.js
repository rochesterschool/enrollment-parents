import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/// Material UI

//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import LoadingSpinner from './LoadSpinner';

//////// Assets
import './css/Content.css';

class Content extends Component {
//////// Controller
  constructor(){
    super();

    this.handleGetTotals           = this.handleGetTotals.bind(this);
    this.handleGetTotalToPay       = this.handleGetTotalToPay.bind(this);
    this.handleClickSearchStudent  = this.handleClickSearchStudent.bind(this);
    this.handleOnChange            = this.handleOnChange.bind(this);
    this.handleOnChangeServices    = this.handleOnChangeServices.bind(this);
    this.handleChangeTotalServices = this.handleChangeTotalServices.bind(this);
    this.handleUpdateStateSeguro   = this.handleUpdateStateSeguro.bind(this);

    this.state = {
        count: 0,
        resultState: 0,
        objectId: '',
        createdAt: '',
        updatedAt: '',
        codigo: '',
        nombres: '',
        apellidos: '',
        tarifa_plena: 0,
        tarifa_reducida_7_5: 0,
        tarifa_reducida_15: 0,
        descuento_exalumno: 0,
        descuento_2do_hno: 0,
        descuento_3er_hno: 0,
        empleado: 0,
        santa_barbara: 0,
        convenio: 0,
        total_descuentos: 0,
        grado: '',
        student_code: '',
        // Servicios de matrículas
        seguro_accidentes: 55000,
        anuario_impreso: 110000,
        anuario_digital: 46000,
        anuario_combo: 156000,
        anuario_seleccionado: 110000,
        asopadres: 190000,
        club: 375000,
        total_servicios: 0,
        // Total a pagar state
        total_pagar: 0,
        // Loading state
        loading: false, // will be true when ajax request is running     
    }
  }

  componentDidMount(){
    this.setState({
      
    });
  }

  handleClickSearchStudent(){
    
    let axiosConfig = {
      headers: {
          'X-Parse-Application-Id': 'U8jcs4wAuoOvBeCUCy4tAQTApcfUjiGmso98wM9h',
          'X-Parse-Master-Key': 'vN7hMK7QknCPf2xeazTaILtaskHFAveqnh6NDwi6',
          'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    axios.get('https://parseapi.back4app.com/classes/Enrollment?where={"CODIGO":"' + this.state.student_code + '"}', axiosConfig)
      .then(res => {
        console.log("Full object:");
        console.log(res.data);
        console.log("Node object:");
        console.log(res.data.results);
        console.log("Item object:");
        let item = res.data.results[0];
        
        // jsonLenght gets the number of objects in the response
        let jsonLenght = Object.keys(res.data.results).length;
        console.log("Response size:" + jsonLenght);
        console.log(item);
        
        if(jsonLenght > 0){
            //Setting Parse Data to states
            this.setState({
                objectId:            item.objectId, 
                createdAt:           item.createdAt,
                updatedAt:           item.updatedAt,
                codigo:              item.CODIGO,
                nombres:             item.NOMBRES,
                apellidos:           item.APELLIDOS,
                tarifa_plena:        Number(item.TARIFA_PLENA),
                tarifa_reducida_7_5: Number(item.TARIFA_REDUCIDA_7_5),
                tarifa_reducida_15:  Number(item.TARIFA_REDUCIDA_15),
                descuento_2do_hno:   Number(item.DESCUENTO_2HNO),
                descuento_3er_hno:   Number(item.DESCUENTO_3HNO),
                empleado:            Number(item.EMPLEADO),
                santa_barbara:       Number(item.SANTA_BARBARA),
                convenio:            Number(item.CONVENIO),
                grado:               item.GRADO
            });
            this.handleGetTotals();
        }else{
          alert("Upps!, No existen resultados para el código ingresado.");  
        }
      }
    )
  }

  handleOnChange(e){
    if(e.target.id === 'student_code_input'){
      this.setState({
        student_code: String(e.target.value)
      }, () => {
        console.log("=> code: " + this.state.student_code)
      });
    }
  }

  handleOnChangeServices(e){
     if(e.target.id === 'seguro-accidentes'){  
        console.log(" ///// All values: *" + Number(e.target.value) + ", " + this.state.anuario_seleccionado + ", " + this.state.asopadres + ", "+ this.state.club); 
        this.handleGetTotalToPay(Number(e.target.value), this.state.anuario_seleccionado, this.state.asopadres, this.state.club)
        this.handleUpdateStateSeguro(Number(e.target.value));
     }
     if(e.target.id === 'anuario'){
        this.setState({
          anuario_seleccionado: Number(e.target.value)
        }, () => {
          //console.log(" ///// Anuario value: " + this.state.anuario_seleccionado)
          console.log(" ///// All values: " + this.state.seguro_accidentes + ", *" + this.state.anuario_seleccionado + ", " + this.state.asopadres + ", "+ this.state.club); 
          this.handleGetTotalToPay(this.state.seguro_accidentes, this.state.anuario_seleccionado, this.state.asopadres, this.state.club)
        })      
     }
     if(e.target.id === 'asopadres'){
        console.log(" ///// All values: " + this.state.seguro_accidentes + ", " + this.state.anuario_seleccionado + ", *" + Number(e.target.value) + ", "+ this.state.club); 
        this.handleGetTotalToPay(this.state.seguro_accidentes, this.state.anuario_seleccionado, Number(e.target.value), this.state.club)
     }
     if(e.target.id === 'afiliacion-club'){
        //console.log(" ///// Club value: " + e.target.value)
        console.log(" ///// All values: " + this.state.seguro_accidentes + ", " + this.state.anuario_seleccionado + ", " + this.state.asopadres + ", *"+ this.state.club); 
        
     }
  }

  handleGetTotals(){
    this.setState({
        // Sumamos las tarifas y restamos los descuentos
       total_descuentos:  Number((this.state.tarifa_plena
                          + this.state.tarifa_reducida_7_5
                          + this.state.tarifa_reducida_15)
                          - this.state.descuento_2do_hno
                          - this.state.descuento_3er_hno
                          - this.state.empleado
                          - this.state.santa_barbara
                          - this.state.convenio),
       // Sumamos el total de servicios seleccionados
       total_servicios: Number( this.state.seguro_accidentes + 
                                this.state.anuario_impreso +
                                this.state.asopadres +
                                this.state.club )
    });

    console.log("===> Total for discounts: " + this.state.total_descuentos );
    console.log("===> Total for services: " + this.state.total_servicios );
    // Calling the method for totalize
    this.handleGetTotalToPay();
  }

  handleGetTotalToPay(seguro_value, anuario_value, aso_value, club_value){
    
    var total_services = Number(seguro_value + anuario_value + aso_value + club_value);
    console.log(" ########### Total services : " + total_services );

  }

  handleChangeTotalServices(){

    this.setState({
      total_servicios : Number( this.state.seguro_accidentes +
                                this.state.anuario_seleccionado +
                                this.state.asopadres +
                                this.state.club )
    });
    console.log(" ///// Total Services: " + this.state.total_servicios)
    //this.handleGetTotalToPay();
  }

  handleUpdateStateSeguro(inDatum){
    this.setState({
        seguro_accidentes: Number(inDatum)
    });
    console.log("Dev:// Value updated: " + this.state.seguro_accidentes)
  }



  /////////////////////////////////
  //////// Rendering UI ///////////
  /////////////////////////////////
  render() {
    return (
      <div className="bg-light">
        <main role="main"  className="container">
          <div className="shadow-sm p-3 mb-5 bg-white rounded">
          <div className="starter-template">
            
            <p id="help-text" className="lead">Liquidador de Matrícula - Rochester 2018-2019<br /> 
                                               Ingrese el código del estudiante</p>

            <div className="row">
              <div className="col-sm"> 
              </div>
              <div className="col-sm">
                <div className="input-group input-group-lg mb-3">
                  <input
                      id="student_code_input"
                      onChange={this.handleOnChange}
                      type="text" 
                      className="form-control" 
                      placeholder="Ej. 15001"
                      aria-label="Recipient's username" 
                      aria-describedby="basic-addon2"
                      maxLength="5"></input>
                  <div className="input-group-append">
                    <button 
                      className="btn btn-primary" 
                      onClick={this.handleClickSearchStudent}
                      type="button">Buscar</button>
                  </div>
                </div>
              </div>
              <div className="col-sm">
              </div>
            </div>
            
            </div>
            <p>Código: {this.state.student_code}</p> 
            <hr />

            <div className="shadow-sm p-3 mb-5 bg-white rounded">
            
              <div className="row">
              
                <div className="col-md-8">
                  <h4 className="d-flex justify-content-between mb-3" >Información del Estudiante</h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">Código</label>
                      <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.codigo} required="" readOnly="readonly"></input>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">Grado</label>
                      <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.grado} required="" readOnly="readonly"></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">Nombres</label>
                      <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.nombres} required="" readOnly="readonly"></input>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Apellidos</label>
                      <input type="text" className="form-control" id="lastName" placeholder="" value={this.state.apellidos} required="" readOnly="readonly"></input>
                    </div>
                  </div>

                  <hr />
                  {/*Tabla de descuentos y valores*/}
                  <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Conceptos</th>
                            <th scope="col">Valor ($)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Tarifa plena</td>
                            <td><NumberFormat value={this.state.tarifa_plena} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                          <tr>
                            <td>Tarifa reducida 7.5%</td>
                            <td><NumberFormat value={this.state.tarifa_reducida_7_5} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>
                          
                          <tr>
                            <td>Tarifa reducida 15%</td>
                            <td><NumberFormat value={this.state.tarifa_reducida_15} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                          <tr>
                            <td>Descuento ex-alumno</td>
                            <td>- <NumberFormat value={this.state.descuento_exalumno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>
                          
                          <tr>
                            <td>Descuento 2do hermano</td>
                            <td>- <NumberFormat value={this.state.descuento_2do_hno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>
                          
                          <tr>
                            <td>Descuento 3er hermano</td>
                            <td>- <NumberFormat value={this.state.descuento_3er_hno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                          <tr>
                            <td>Descuento padre empleado</td>
                            <td>- <NumberFormat value={this.state.empleado} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                          <tr>
                            <td>Descuento Santa Barbara</td>
                            <td>- <NumberFormat value={this.state.santa_barbara} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                          <tr>
                            <td>Descuento convenio</td>
                            <td>- <NumberFormat value={this.state.convenio} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                          </tr>

                        </tbody>
                  </table>
                </div>

                <div className="col-md-4">
                  <div className="card my-4">
                      <div className="card-header bg-primary" >
                        <h5 id="card_title_color" className="mb-0 text-center">Selección de servicios</h5>
                      </div>
                      
                      <div className="card-body">
                          <p className="" >A continuación seleccione los servicios que desea adicionar:</p>
                          {/*Select Seguro Accidentes*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Seguro de accidentes</label>
                                <select className="custom-select d-block w-100" onChange={this.handleOnChangeServices} id="seguro-accidentes">
                                  <option value={this.state.seguro_accidentes} defaultValue="selected">Si - $55.000</option>
                                  <option value="0">No - 0$</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Anuario*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Anuario</label>
                                <select className="custom-select d-block w-100" onChange={this.handleOnChangeServices} id="anuario">
                                  <option value={this.state.anuario_impreso} defaultValue="selected">Impreso - $110.000</option>
                                  <option value={this.state.anuario_digital}>Digital - $46.000</option>
                                  <option value={this.state.anuario_combo}>Impreso + digital - $156.000</option>
                                  <option value="0">No - 0$</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Asopadres*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Asopadres</label>
                                <select className="custom-select d-block w-100" onChange={this.handleOnChangeServices} id="asopadres">
                                  <option value={this.state.asopadres} defaultValue="selected">Si - $190.000</option>
                                  <option value="0">No - 0$</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Afiliación Club Deportivo*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Afiliación Club Deportivo</label>
                                <select className="custom-select d-block w-100" onChange={this.handleOnChangeServices} id="afiliacion-club">
                                  <option value={this.state.club} defaultValue="selected">Si - $375.000</option>
                                  <option value="0">No - 0$</option>
                                </select>
                              </div>
                          </div>
                   
                      </div>

                      <div className="card-footer bg-success text-white">
                        <div className="row">
                          <div className="col-12">
                            <center><h5>Total Matrícula: </h5></center>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                              <center>
                                <h5>
                                  <NumberFormat value={this.state.total_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h5>
                              </center>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

              </div>
            </div>
           </div>
        </main>
       
       

      </div>
  
    );
  }
}

export default Content;