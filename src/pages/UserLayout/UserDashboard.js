import React, { useEffect } from 'react';


// Import your image
import postSlide1 from '../../img/download.jpeg';
import { Link } from 'react-router-dom';


const UserDashboard = () => {


  return (
    <>
    <main id="main">
      <section id="hero-slider" className="hero-slider">
        <div className="container-md" >
          <div className="row">
            <div className="col-12">
              <div className="swiper sliderFeaturedPosts">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <a
                      href="single-post.html"
                      className="img-bg d-flex align-items-end bg-hero-1"
                      style={{
                        backgroundImage: `url(${postSlide1})`,
                        textDecoration:"none" // Use imported image here
                      }}
                    >
                      <div className="img-bg-inner">
                        <h2>
                          Gain the Knowlege by
                        </h2>
                        <p>
                         Solving the amazing questions.We will help you to prepare for PSC Exams
                        </p>
                  <Link to={"/quiz-cat"} >    <button class="btn "style={{backgroundColor:"beige"}}>
                          Start the quiz
                        </button></Link> 
                      </div>
                    </a>
                  </div>
               
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="posts" className="posts">
  <div className="container" >
    <div className="row g-5">
      <div className="col-lg-4">
        <div className="post-entry-1 lg">
          <a href="single-post.html" style={{textDecoration:"none"}}>
            <img
              src={require("../../img/post-landscape-1.jpg")}
              alt=""
              className="img-fluid"
            />
          </a>
          <div className="post-meta">
            <span className="date">Culture</span>{" "}
            <span className="mx-1">•</span> <span>Sept 5th '23</span>
          </div>
          <h2>
            <a style={{textDecoration:"none"}} href="single-post.html">
            Bharat Drone Shakti exhibition 2023
            </a>
          </h2>
          <p className="mb-4 d-block">
          an exciting and forward-looking initiative, Defence Minister Rajnath Singh recently inaugurated the grand “Bharat Drone Shakti 2023” exhibition at the Hindon airbase. This monumental event, a collaborative endeavor between the Indian Air Force and the Drone Federation of India ..
          </p>

        </div>
        <div className="post-entry-1 lg">
          <a href="single-post.html" style={{textDecoration:"none"}}>
            <img
              src={require("../../img/post-landscape-1.jpg")}
              alt=""
              className="img-fluid"
            />
          </a>
          <div className="post-meta">
            <span className="date">Culture</span>{" "}
            <span className="mx-1">•</span> <span>Sept 5th '23</span>
          </div>
          <h2>
            <a style={{textDecoration:"none"}} href="single-post.html">
            Asian Games Medal Tally 2023 List, Medal Winners From India
            </a>
          </h2>
          <p className="mb-4 d-block">
          The Asian Games 2023 medal tally is a table that shows the number.
          </p>

        </div>
      </div>
      <div className="col-lg-8">
        <div className="row g-5">
          <div className="col-lg-6 border-start custom-border">
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                                                                      src={require("../../img/post-landscape-8.jpg")}

                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Sport</span>{" "}
                <span className="mx-1">•</span> <span>Jul 5th '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">How Many Medals India Won in Asian Games 2023?</a>
              </h2>
            </div>
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                                                                      src={require("../../img/post-landscape-7.jpg")}

                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Food</span>{" "}
                <span className="mx-1">•</span> <span>Jul 17th '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">
                RBI Cancels Licence Of The Kapol Co-operative Bank Over Inadequate Capital
                </a>
              </h2>
            </div>
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                                                                       src={require("../../img/post-landscape-6.jpg")}

                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Design</span>{" "}
                <span className="mx-1">•</span> <span>Mar 15th '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">
                ഗുരുവായൂർ ദേവസ്വം ബോർഡിൽ ജോലി നേടാം | Guruvayur Devaswom Board Recruitment 2023
                </a>
              </h2>
            </div>
          </div>
          <div className="col-lg-6 border-start custom-border">
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                 src={require("../../img/post-landscape-8.jpg")}
                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Business</span>{" "}
                <span className="mx-1">•</span> <span>Jul 5th '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">
                Kerala PSC LGS Previous Question Papers With Answer Key Download | LGS Question Paper Collection
                </a>
              </h2>
            </div>
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                                   src={require("../../img/post-landscape-5.jpg")}

                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Tech</span>{" "}
                <span className="mx-1">•</span> <span>Mar 1st '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">
                Kerala PSC Notification October 2023 | PSC Recruitment October 2023 | Kerala PSC Career
                </a>
              </h2>
            </div>
            <div className="post-entry-1">
              <a style={{textDecoration:"none"}} href="single-post.html">
                <img
                                                     src={require("../../img/post-landscape-6.jpg")}

                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="post-meta">
                <span className="date">Travel</span>{" "}
                <span className="mx-1">•</span> <span>Jul 5th '22</span>
              </div>
              <h2>
                <a style={{textDecoration:"none"}} href="single-post.html">
                ICFRE Lower Division Clerk Recruitment
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>{" "}
    {/* End .row */}
  </div>
</section>
<section className="mb-5 bg-light py-5">
  <div className="container" >
    <div className="row justify-content-between align-items-lg-center">
      <div className="col-lg-5 mb-4 mb-lg-0">
        <h2 className="display-4 mb-4">Latest News</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, rem
          eaque vel est asperiores iste pariatur placeat molestias, rerum
          provident ea maiores debitis eum earum esse quas architecto! Minima,
          voluptatum! Minus tempora distinctio quo sint est blanditiis voluptate
          eos. Commodi dolore nesciunt culpa adipisci nemo expedita suscipit
          autem dolorum rerum?
        </p>
        <p>
          At magni dolore ullam odio sapiente ipsam, numquam eius minus animi
          inventore alias quam fugit corrupti error iste laboriosam dolorum
          culpa doloremque eligendi repellat iusto vel impedit odit cum. Sequi
          atque molestias nesciunt rem eum pariatur quibusdam deleniti saepe
          eius maiores porro quam, praesentium ipsa deserunt laboriosam
          adipisci. Optio, animi!
        </p>
        <p>
          <a href="#" className="more">
            View All Blog Posts
          </a>
        </p>
      </div>
      <div className="col-lg-6">
        <div className="row">
          <div className="col-6">
            <img
            src={require("../../img/post-landscape-8.jpg")}
              alt=""
              className="img-fluid mb-4"
            />
          </div>
          <div className="col-6 mt-4">
            <img
                          src={require("../../img/post-landscape-5.jpg")}

              alt=""
              className="img-fluid mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </main>
    <footer id="footer" className="footer">

<div className="footer-legal">
  <div className="container">
    <div className="row justify-content-between">
      <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">

        <div className="credits">
          Designed  <a style={{textDecoration:"none"}} href="https://bootstrapmade.com/">@2023 PSC CRAKER</a>
        </div>
      </div>
      <div className="col-md-6">
        <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
          <a href="#" className="twitter">
            <i className="bi bi-twitter" />
          </a>
          <a href="#" className="facebook">
            <i className="bi bi-facebook" />
          </a>
          <a href="#" className="instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href="#" className="google-plus">
            <i className="bi bi-skype" />
          </a>
          <a href="#" className="linkedin">
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</footer>
  
  </>
  
  );
};

export default UserDashboard;
