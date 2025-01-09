import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FaShoppingCart } from "react-icons/fa";
import { PostData } from '../utils/PostData';

function Home() {



    return (
        <div>
            <div className='home-banner'>
                We now sell and install raised gardens and groundwork surfaces
            </div>
            <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel" data-interval="5000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="assets/carousel/1garden2.jpg" className="d-block w-100" alt="carousel 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="assets/carousel/2stonesteps3.jpg" className="d-block w-100" alt="carousel 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="assets/carousel/3outsidedeck5.jpg" className="d-block w-100" alt="carousel 3" />
                    </div>
                    <div className="carousel-item">
                        <img src="assets/carousel/4wall1.jpg" className="d-block w-100" alt="carousel 4" />
                    </div>
                    <div className="carousel-item">
                        <img src="assets/carousel/5stonepatio4.jpg" className="d-block w-100" alt="carousel 5" />
                    </div>
                </div>
            </div>

            {/* Nav Bar */}
            <Header />

            {/* RELIABLE CONTRACTING */}
            <div className="container-fluid" style={{ padding: "0% 5%" }}>
                <div className="row">
                    <div className="col">
                        <div className="loader" id="loader" style={{ textAlign: "center" }}>
                            <img src="assets/images/digger1.png" alt="digger image" width="80%" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="textholder" id="text1">
                            <div className="ghead" style={{ padding: "0%" }}>RELIABLE CONTRACTING</div>
                            <div className="gtext" >Mark Gamble is known for digging in and getting the job done right and on time. Mark and his staff are dedicated to giving you the best value for your money when you decide to make a change for the better. They are proud to be a trusted part of the business community.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Image */}
            <div className="stripofscenes" id="strip">
                <div className="img-fluid">
                    <img src="assets/images/stripofscenes.jpg" width="100%" height="auto" alt="strip of scenes" />
                </div>
            </div>

            {/* DRAINAGE EXPERTS */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row" id="text2">
                    <div className="col" style={{ padding: "5% 0%" }}>
                        <div className="loader2" id="loaderwall">
                            <img src="assets/images/1master.gif" alt="digger working image" width="90%" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="textholder">
                            <div className="ghead " style={{ textAlign: "left" }}>
                                DRAINAGE EXPERTS
                            </div>
                            <div className="gtext mt-2" >
                                If you have standing water or experice flooding Mark is the man to call. He is a qualified expert that has the answer to your flooding problem
                            </div>
                            <div className="row p-0 mt-2">
                                <div className="gtext col-5 p-0 m-0">
                                    <ul>
                                        <li className="l1">Trenching</li>
                                        <li>Drainage</li>
                                        <li className="l1">Driveways &amp; Lanes</li>
                                        <li className="l1">Flood Zones</li>
                                    </ul>
                                </div>
                                <div className="col gtext">
                                    <ul>
                                        <li className="l1">Land Clearing</li>
                                        <li className="l1">Post Holes</li>
                                        <li className="l1">New Gardens &amp; Tree Planting</li>
                                    </ul>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <img src="assets/images/NDScertified.jpeg" style={{ width: "70%", textAlign: "center" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Black Separator */}
            <div className="blackbar" style={{ textAlign: "center" }}>
                <div id="line1">
                    Experts at helping you upgrade your property
                </div>
            </div>

            {/* EXPERT EXCAVATION  */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row" id="text2">
                    <div className="col">
                        <div className="textholder" >
                            <div className="ghead" style={{ paddingTop: "5%", textAlign: "left" }}>
                                EXPERT EXCAVATION
                            </div>
                            <div className="gtext">
                                Having the proper equipment to get into tight areas and move things around makes Mark the perfect choice for a wide range of projects:
                                <ul>
                                    <li className="l1">Driveways &amp; Decks</li>
                                    <li className="l1">Tree, Stump, Hedge Removal</li>
                                    <li className="l1">Land Clearing</li>
                                    <li className="l1">Post Holes</li>
                                    <li className="l1">New Gardens &amp; Tree Planting</li>
                                </ul>
                                Mark and his team can remove all of the excavated materials safely and effeciently with a minimum of disruption. All jobs are guaranteed and fully insured.
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{ padding: "5% 0%" }}>
                        <div className="loader2" id="loaderwall" style={{ textAlign: "right" }}>
                            <img src="assets/images/1exca.gif" alt="1exca.gif" width="100%" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Black Separator */}
            <div className="blackbar" style={{ textAlign: "center" }}><div id="line2">
                Mark will help you create and maintain a welcoming and comforting space.
            </div>
            </div>
            {/* Banner Image */}
            <div className="img-fluid" id="backyard">
                <img src="assets/images/backyardstrip1.jpg" width="100%" alt="backyard scene" />
            </div>

            {/* CAREFUL MAINTENANCE */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row" id="text3">
                    <div className="col">
                        <div className="sprayer" id="maintain" style={{ textAlign: "center" }}>
                            <img src="assets/images/2maint.gif" alt="digger working image" width="100%" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="textholder">
                            <div className="ghead" style={{ paddingTop: "5%", textAlign: "left" }}>
                                CAREFUL MAINTENANCE
                            </div>
                            <div className="gtext py-1">
                                You can depend on Mark to help you keep your propery in great shape. Mark covers a wide range of services to help you look your best:
                                <ul>
                                    <li className="l1">Pressure Wash</li>
                                    <li className="l1">Clean Up/Removal</li>
                                    <li className="l1">Fence Repair</li>
                                    <li className="l1">Driveway Repair</li>
                                    <li className="l1">Deck Repair</li>
                                    <li className="l1">Mulch &amp; Soil Services</li>
                                </ul>
                                <p> You can be sure that Mark's team will work hard to maintain your property so that you can relax knowing they are providing a "job well done".</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Black Separator */}
            <div className="blackbar" style={{ textAlign: "center" }}>
                <div id="line3">
                    Contact Mark for a free visit to discuss your project and give you a quote
                </div>
            </div>

            {/* EFFICIENT & DEPENDABLE */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row" id="text4">
                    <div className="col">
                        <div className="textholder" >
                            <div className="ghead" style={{ paddingTop: "5%", textAlign: "left" }}>
                                EFFICIENT &amp; DEPENDABLE
                            </div>
                            <div className="gtext">
                                Projects range from backyard patios to drainage correction and Mark is proud of his accomplishments:
                                <ul>
                                    <li className="l1">Landscaping</li>
                                    <li className="li">Fences &amp; Decks</li>
                                    <li className="l1">Retaining Walls</li>
                                    <li className="l1">Cement Walks &amp; Pads</li>
                                </ul>
                                Deck and fence experts that can turn your outdoor open space to a welcoming living area.
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contactimages" id="aboutmark" style={{ textAlign: "right" }}>
                            <div className="img-fluid">
                                <img src="assets/images/3last.gif" alt="3last.gif" width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Black Separator */}
            <div className="blackbar" style={{ textAlign: "center" }}>
                <div id="line3">
                    Contact Mark for a free visit to discuss your project and give you a quote
                </div>
            </div>

            {/* RAISED GARDENS */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row products-container" id="text3">
                    <div className="col">
                        <div className="sprayer" id="maintain" style={{ textAlign: "center" }}>
                            <img src="assets/images/garden.png" alt="garden" width="100%" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="textholder">
                            <div className="ghead" style={{ paddingTop: "5%", textAlign: "left" }}>
                                RAISED GARDENS
                            </div>
                            <div className="gtext mt-2" >
                                If you have standing water or experience flooding Mark is the man to call. He is a qualified expert that has the answer to your flooding problem
                            </div>
                            <div className="row p-0 mt-2">
                                <div className="gtext col-5 p-0 m-0">
                                    <ul>
                                        <li className="l1">Trenching</li>
                                        <li>Drainage</li>
                                        <li className="l1">Driveways &amp; Lanes</li>
                                        <li className="l1">Flood Zones</li>
                                    </ul>
                                </div>
                                <div className="col gtext">
                                    <ul>
                                        <li className="l1">Land Clearing</li>
                                        <li className="l1">Post Holes</li>
                                        <li className="l1">New Gardens &amp; Tree Planting</li>
                                    </ul>
                                </div>
                            </div>
                            <div>

                                <div>
                                    <h2 className='text-center'>SALES AND INSTALLATION</h2>
                                </div>
                                <div className='select-products-container'>
                                    <img src="assets/images/hanit.png" alt="hanit" className='distributors-logo' />
                                    <img src="assets/images/grobox.png" alt="grobox" className='distributors-logo' />
                                    <Link className='select-products-btn'>Coming Soon</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Black Separator */}
            <div className="blackbar" style={{ textAlign: "center" }}>
                <div id="line3">
                    Contact Mark for a free visit to discuss your project and give you a quote
                </div>
            </div>

            {/* GROUNDWORK AND SURFACES */}
            <div className="container-fluid" style={{ padding: "0% 10%" }}>
                <div className="row products-container" id="text3">
                    <div className="col">
                        <div className="textholder">
                            <div className="ghead" style={{ paddingTop: "5%", textAlign: "left" }}>
                                GROUNDWORK AND SURFACES
                            </div>
                            <div className="gtext mt-2" >
                                If you have standing water or experience flooding Mark is the man to call. He is a qualified expert that has the answer to your flooding problem
                            </div>
                            <div className="row p-0 mt-2">
                                <div className="gtext col-5 p-0 m-0">
                                    <ul>
                                        <li className="l1">Trenching</li>
                                        <li>Drainage</li>
                                        <li className="l1">Driveways &amp; Lanes</li>
                                        <li className="l1">Flood Zones</li>
                                    </ul>
                                </div>
                                <div className="col gtext">
                                    <ul>
                                        <li className="l1">Land Clearing</li>
                                        <li className="l1">Post Holes</li>
                                        <li className="l1">New Gardens &amp; Tree Planting</li>
                                    </ul>
                                </div>
                            </div>
                            <div>

                                <div>
                                    <h2 className='text-center'>SALES AND INSTALLATION</h2>
                                </div>
                                <div className='select-products-container'>
                                    <img src="assets/images/hanit.png" alt="hanit" className='distributors-logo' />
                                    <img src="assets/images/grobox.png" alt="grobox" className='distributors-logo' />
                                    <Link to="/products" className='select-products-btn'>View Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="sprayer" id="maintain" style={{ textAlign: "center" }}>
                            <img src="assets/images/tiles.png" alt="garden" width="100%" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Contact */}
            <div className="container-fluid" id="text5">
                <div className="row" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <div className="col-6">
                        <img src="assets/images/tecktrack.png" id="tectrac" alt="tecktrack" width="100%" />
                        <hr />
                        <div className="row" style={{ margin: "0% 0% 0% 0%" }}>
                            <div className="col-5" style={{ textAlign: "center" }}>
                                <small>MARKS FLYER</small>
                            </div>
                            <div className="col-5" style={{ textAlign: "center" }}>
                                <small>CONTACT .vcf</small>
                            </div>
                        </div>
                        <div className="row" style={{ margin: "0% 0% 0% 0%" }}>
                            <div className="col-5" style={{ textAlign: "center" }}>
                                <a href="MarkGamble.pdf" download>
                                    <img src="assets/images/flyer.png" width="50%" alt=".pdf Image" />
                                </a>
                            </div>
                            <div className="col-5" style={{ textAlign: "center" }}>
                                <a href="markgamble.vcf" download>
                                    <img src="assets/images/contacticon.png" width="60%" alt="Contact Mark Icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="img-fluid justify-content-center">
                            <img src="assets/images/LogoArial.png" width="100%" alt="gamble logo" />
                        </div>
                        <br />
                        <div className="container-fluid" style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "3vw" }}>21 Briarlea Crescent
                                <br />
                                Port Dover Ontario
                                <br />
                                <small>N0A1N4</small>
                                <br />
                                <div style={{ fontSize: "2.5vw" }}>
                                    Mark:&nbsp;<a href="tel:(519) 429-0629‬">519-429-0629‬</a>
                                </div>
                                <div style={{ fontSize: "2.5vw" }}>
                                    Email:&nbsp;<a href="mailto:mark@markgamble.ca">mark@markgamble.ca</a>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                {/* Map */}
                <div style={{ textAlign: "center" }}>
                    <div style={{ textAlign: "center", width: "90%" }}>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13359.905713261447!2d-80.21319688833051!3d42.79170726488378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c537173092311%3A0x4b852eb81b97813e!2sPort%20Dover%2C%20ON!5e0!3m2!1sen!2sca!4v1584210974785!5m2!1sen!2sca" width="90%" height="auto" frameBorder="0" style={{ border: "thin solid black", borderRadius: "10px" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    <div style={{ textAlign: "center", width: "90%" }}>
                        <hr />
                    </div>
                </div>
            </div >
            <div className="container-fluid" style={{ textAlign: "center" }}>
                <h6>- <small> Created by <a href="www.businesslore.com">Businesslore Systems</a></small>-</h6>
            </div>
        </div >
    )
}

export default Home;
