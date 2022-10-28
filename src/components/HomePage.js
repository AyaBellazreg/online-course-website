import React, { useEffect } from 'react'
import MenuBar from './MenuBar';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../css/homePage.css'
import { Container } from 'react-bootstrap';
import '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import aboutImg from '../img/left-image.png'
import heroImg from '../img/slider-icon.png'
import accesCours  from '../img/accesCours.png'
import mapsIcon  from '../img/maps-icon.png'
import emailIcon  from '../img/email-icon.png'
import EmailUs from './EmaiUs'
import '../css/emailUs.css'
import MyMapComponent from './MyMapComponent'


function HomePage() {
    const { currentUser, logout } = useAuth();
    return (
        <div>
           <MenuBar/>
           <header>
               <Container>
                    <div className="hero">
                        <div className="box">
                            <h1 className="main-title">School is for everyone!</h1>
                                <p>orem ipsum dolor, sit amet consectetur adipisicing elit Nisi quisquam harum nulla vitae ad.</p>
                                <Link to="/courses" className="btn btn-main">Go To Courses</Link>
                        </div>

                         <div className="box">
                             <img src={heroImg} alt="Study Online"/>
                        </div>  
                    </div>
               </Container>
           </header>

         

           <section className="showcase" id="showcase">
               <Container>
                 <div className="boxes">
                     <div className="box">
                         <div className="circle-icon">
                            <img src={accesCours} />
                         </div>
                         <h4>Access Courses</h4>
                         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quisquam harum nulla vitae ad voluptatem facere enim delectus consequuntur exercitationem</p>
                         <Link to="/courses" className="btn btn-more">Courses</Link>
                     </div>

                     <div className="box">
                         <div className="circle-icon">
                            <img src={emailIcon} />
                         </div>
                         <h4>Email Us</h4>
                         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quisquam harum nulla vitae ad voluptatem facere enim delectus consequuntur exercitationem</p>
                         <Link to="/courses" className="btn btn-more">Contact Us</Link>
                     </div>

                     <div className="box">
                         <div className="circle-icon">
                            <img src={mapsIcon} />
                         </div>
                         <h4>Find Us</h4>
                         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quisquam harum nulla vitae ad voluptatem facere enim delectus consequuntur exercitationem</p>
                         <Link to="/courses" className="btn btn-more">Go to maps</Link>
                     </div>
                 </div>
               </Container>
           </section>

           <section id="contact" className="contact">
               
               <Container>

               <h2>Contact Us</h2>
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="email-us">
                                <EmailUs />
                        </div>
                    </div>
                </div>    
               </Container>
           </section>

           <footer>
               Made By Eya and Ilyes &#169; All right Reserved
           </footer>
        </div>
    )
}

export default HomePage
