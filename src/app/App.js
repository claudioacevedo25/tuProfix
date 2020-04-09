import React, { Component } from 'react'
import '../../node_modules/aos/dist/aos'; 
import AOS from 'aos'; 
// import 'materialize-css/dist/css/materialize.min.css'
// import 'materialize-css/dist/js/materialize'
import M from 'materialize-css'
import {Button,Icon} from 'react-materialize'


class App extends Component {

        constructor(props, context) { 
          super(props, context); 
          
          AOS.init(); 
          this.state = {
              nombre:'',
              apellido:'',
              dni: '',
              telefono: '',
              email: '',
              descripcion: '',
              profesionales: [],
              zonas:[],
              especialidades:[],
              selectedZone:'',
              selectedEspeciality:"",
              _id:''
          }

          this.handleChange = this.handleChange.bind(this);
          this.addProfessional = this.addProfessional.bind(this);
         
          this.ref = React.createRef();

          
        } 

        addProfessional(e){
            fetch('/professional', {
                method:'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then( res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Te has registrado correctamente'})
                this.setState({nombre:'', apellido:'',dni:'', telefono:'',email:'',descripcion:''})
            })

            .catch( err => console.log(err));
            this.getProfesionales();
            e.preventDefault();
        }


        

        componentDidMount(){
           
            this.getProfesionales();
            this.getZonas();
            this.getEspecialidades();
            $(document).ready(function() {
                $('input#input_text, textarea#textarea2').characterCounter();
              });

              $(document).ready(function(){
                $('.fixed-action-btn').floatingActionButton();
              });
            
        
        }

       
        componentWillReceiveProps (){ 
          AOS.refresh(); 
        } 

        getZonas(){
            fetch('/professional/zona')
            .then( res => res.json())
            .then(data => {
                this.setState({zonas:data.zonas});

            })
        }

        getEspecialidades(){
            fetch('/professional/especialidad')
            .then( res => res.json())
            .then(data => {
                this.setState({especialidades:data.especialidad});
               
            })
        }

        getProfesionales(){
            fetch('/professional')
            .then( res => res.json())
            .then(data => {
                this.setState({profesionales:data.profesionales});
                console.log(data.profesionales[0].zona.detalle)
               
            })
        }



        handleChange(e){
            const {name, value} = e.target;
            this.setState({
                [name]: value
            })
        }

        

    render(){
        return(
            <div className="scrollspy contenedor" id="start">
                   <div className="fixed-action-btn">
                        <a className="btn-floating btn-large red">
                            <i className="large material-icons">mode_edit</i>
                        </a>
                        <ul>
                            <li><a className="btn-floating red" href="#!"><i className="fab fa-instagram"></i></a></li>
                            <li><a className="btn-floating blue" href="#!"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a className="btn-floating ligth-blue" href="#!"><i className="fab fa-twitter"></i></a></li>
                            <li><a className="btn-floating green" href="#!"><i className="fab fa-whatsapp"></i></a></li>
                        </ul>
                    </div>

                <main className="center-align">

                
                   
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <h1>BIENVENIDOS A PROFIX</h1>
                            </div>
                            <div className="col s6"><a href="#formOfer" className="waves-effect waves-light  hoverable yellow accent-2" id="font">Quiero ofrecer mis servicios</a></div>
                            <div className="col s6 "><a href="#services" className="waves-effect waves-light  hoverable light-green accent-3" id="font">Necesito contratar un servicio</a></div>
                        </div>
                    </div>
                </main>




        <div id="formOfer" className="scrollspy center-align ">
            <div className="row container" data-aos="zoom-in-up">
                <h2 className="">Ingresa a la base de datos</h2>
                <form  onSubmit={this.addProfessional} className="col s12 card">
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input onChange={this.handleChange} id="first_name" type="text" className="validate" name='nombre' required/>
                            <label  htmlFor="first_name">Nombre</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} id="last_name" type="text" className="validate" name='apellido' required/>
                            <label  htmlFor="last_name">Apellido</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input onChange={this.handleChange} id="dni" type="number" className="validate" name='dni' required/>
                            <label  htmlFor="first_name">Dni</label>
                            <span className="helper-text" data-error="Ingrese solo numeros" data-success="OK"></span>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input onChange={this.handleChange} id="phone" type="number" className="validate" name='telefono' required/>
                            <label htmlFor="last_name">Telefono</label>
                            <span className="helper-text" data-error="Ingrese solo numeros" data-success="OK"></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">contact_mail</i>
                            <input onChange={this.handleChange} id="email" type="email" className="validate" name='email' required/>
                            <label  htmlFor="email">Email</label>
                            <span className="helper-text" data-error="Formato incorrecto" data-success="OK"></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                        <i className="material-icons prefix"></i>           
                        <select className='browser-default' defaultValue={'DEFAULT'} onChange={(e) =>this.setState({selectedZone: e.target.value})}>
                        <option value= "DEFAULT" disabled >Elegi la zona de trabajo</option>
                            {
                                this.state.zonas.map( zona => <option value={zona._id} key={zona._id}>{zona.detalle}</option>)
                            }
                        </select>
                        </div>
                    </div> 


                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix"></i>
                            <select  className='browser-default' defaultValue={'DEFAULT'} onChange={(e) => this.setState({selectedEspeciality: e.target.value})}>
                            <option value="DEFAULT" disabled selected>Elegi tu categoria</option>
                                {
                                    this.state.especialidades.map( espec => <option  value={espec._id} key={espec._id}>{espec.detalle}</option>)
                                }
                            </select>
                        
                        </div>
                    </div>


                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">speaker_notes</i>
                            <textarea onChange={this.handleChange} id="textarea2" className="materialize-textarea" data-length="120" name='descripcion' required></textarea>
                            <label htmlFor="textarea2">Escribi una breve descripcion de ti como profesional</label>
                        </div>
                    </div>
                    <div className="row center-align ">
                        <input type="submit" value="Enviar" className="waves-effect waves-light btn-large  purple lighten-1"/>
                    </div>
               </form>
            </div>

        </div>




                <section className="scrollspy" id="services">
                    <div className=" center-align">
                      <h2 data-aos="fade-right">Elegi tu Servicio</h2>
                          <div className="row" data-aos="fade-left">
                          <div className="card col s4 hoverable">
                                    
                          <div className="card-image waves-effect waves-block waves-light">
                            <img src="img/yo.jpg"  className="activator"/>
                          </div>
                                    
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Plomeria<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Plomeria<i className="material-icons right">close</i></span>
                                        <p>Alquiler del mejor servicio de humo del todo el pais. Humo en polvo, humo liquido, humo en estado gaseoso...elegi el que quieras.Tengo todo para vos ;)</p>
                                    </div>
                           </div>
                           <div className="card col s4 hoverable">
                                    
                                    <div className="card-image waves-effect waves-block waves-light">
                                      <img src="img/yo.jpg"  className="activator"/>
                                    </div>
                                              
                                              <div className="card-content">
                                                  <span className="card-title activator grey-text text-darken-4">Electricidad<i className="material-icons right">more_vert</i></span>
                                              </div>
                                              <div className="card-reveal">
                                                  <span className="card-title grey-text text-darken-4">Electricidad<i className="material-icons right">close</i></span>
                                                  <p>Alquiler del mejor servicio de humo del todo el pais. Humo en polvo, humo liquido, humo en estado gaseoso...elegi el que quieras.Tengo todo para vos ;)</p>
                                              </div>
                                     </div>
                                     <div className="card col s4 hoverable">
                                    
                                    <div className="card-image waves-effect waves-block waves-light">
                                      <img src="img/yo.jpg"  className="activator"/>
                                    </div>
                                              
                                              <div className="card-content">
                                                  <span className="card-title activator grey-text text-darken-4">Gasista<i className="material-icons right">more_vert</i></span>
                                              </div>
                                              <div className="card-reveal">
                                                  <span className="card-title grey-text text-darken-4">Gasista<i className="material-icons right">close</i></span>
                                                  <p>Alquiler del mejor servicio de humo del todo el pais. Humo en polvo, humo liquido, humo en estado gaseoso...elegi el que quieras.Tengo todo para vos ;)</p>
                                              </div>
                                     </div>
                          </div>
                    </div>  
                </section>




                <section>
            <div className="container center-align">
                <h2 data-aos="fade-right">Disponibles</h2>
                <table data-aos="fade-left" className="highlight z-depth-4">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Descripcion</th>
                            <th>Zona</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            this.state.profesionales.map( profesional => {
                                return (
                                    <tr key={profesional._id}>
                                        <td>{profesional.nombre}</td>
                                        <td>{profesional.apellido}</td>
                                        <td>{profesional.email}</td>
                                        <td>{profesional.descripcion}</td>
                                        <td>{profesional.zona.detalle}</td>
                                        <td>{profesional.especialidad.detalle}</td>
                                    </tr>
                                )
                            } )
                        }
                      
                    </tbody>
                </table>
            </div>
        </section>

                



        <footer className="page-footer black">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Footer Content</h5>
                        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="#!"><i className="fab fa-instagram">Instagram</i></a></li>
                            <li><a className="grey-text text-lighten-3" href="#!"><i className="fab fa-facebook-f"></i>Facebook</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!"><i className="fab fa-twitter"></i>Twitter</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!"><i className="fab fa-whatsapp"></i>WhatsApp</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2020 Copyright Claudio Max

                    <a className="right grey-text text-lighten-4 right" href="#start">Volver al inicio</a>

                </div>
            </div>
        </footer>


 </div>
        )
    }
}

export default App;