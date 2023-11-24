import React, { useEffect } from 'react'
import './public.css'
import images from '../images'
import { Link, useNavigate } from 'react-router-dom'

const PublicWeb = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const code = urlParams.get('code');
    const referrer = document.referrer;
    const isOAuthScreen = referrer.includes('accounts.google.com/signin/oauth/v2/consentsummary');
    if (code) {
      localStorage.setItem("code", code);
      if (isOAuthScreen) {
      } else {
        navigate(-1); 
      }
    }
  }, []);
  return (
    <div className='body'>
      <header className="header" data-header="">
        <div className="container">
          <a href="#" className="logo">
            <img src={images.logo} width="162" height="70" alt="EduWeb logo" />
          </a>
          <nav className="navbar-public" data-navbar="">
            <div className="wrapper">
              <a href="#" className="logo">
                <img src={images.logo} width="162" height="70" alt="EduWeb logo" />
              </a>
              <button
                className="nav-close-btn"
                aria-label="close menu"
                data-nav-toggler=""
              >
                <ion-icon name="close-outline" aria-hidden="true" />
              </button>
            </div>
            <ul className="navbar-public-list">
              <li className="navbar-public-item">
                <a href="#home" className="navbar-public-link" data-nav-link="">
                  Home
                </a>
              </li>
              <li className="navbar-public-item">
                <a href="#about" className="navbar-public-link" data-nav-link="">
                  About
                </a>
              </li>
              <li className="navbar-public-item">
                <a href="#courses" className="navbar-public-link" data-nav-link="">
                  Courses
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <Link to="/login" ><a href="#" className="btn-public has-before">
              <span className="span">Login</span>
              <ion-icon name="arrow-forward-outline" aria-hidden="true" />
            </a></Link>
            <button
              className="header-action-btn"
              aria-label="open menu"
              data-nav-toggler=""
            >
              <ion-icon name="menu-outline" aria-hidden="true" />
            </button>
          </div>
          <div className="overlay" data-nav-toggler="" data-overlay="" />
        </div>
      </header>
      <main>
        <article>
          <section className="section hero has-bg-image" id="home" aria-label="home" style={{ backgroundImage: "url('./assets/images/hero-bg.svg')" }}>
            <div className="container">
              <div className="hero-content">
                <h1 className="h1 section-title">
                  Ace the Kerala PSC Exam with<span className="span"> our Comprehensive Resources</span>
                </h1>
                <p className="hero-text">
                  Empowering your success with curated study materials and expert guidance.
                </p>
                <a href="#" className="btn-public has-before">
                  <span className="span">Explore Preparation Resources</span>
                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </a>
              </div>
              <figure className="hero-banner">
                <div className="img-holder one" style={{ '--width': 270, '--height': 300 }}>
                  <img src={images.banner1} width="270" height="300" alt="hero banner" className="img-cover" />
                </div>
                <div className="img-holder two" style={{ '--width': 240, '--height': 370 }}>
                  <img src={images.banner2} width="240" height="370" alt="hero banner" className="img-cover" />
                </div>
                <img src={images.svg1} width="380" height="190" alt="wd" className="shape hero-shape-1" />
                <img src={images.svg2} width="622" height="551" alt="wd" className="shape hero-shape-2" />
              </figure>
            </div>
          </section>
          <section className="section category" aria-label="category">
            <div className="container">
              <p className="section-subtitle">Features</p>
              <h2 className="h2 section-title">
                Prepare with <span className="span">Comprehensive Resources</span> for Kerala PSC Exam.
              </h2>
              <p className="section-text">
                Access a wide range of resources tailored for your Kerala PSC exam preparation.
              </p>
              <ul className="grid-list">
                <li>
                  <div className="category-card" style={{ '--color': '170, 75%, 41%' }}>
                    <div className="card-icon">
                      <img src={images.category1} width="40" height="40" loading="lazy"
                        alt="Previous Year Questions" className="img" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">Kerala PSC Previous Year Questions</a>
                    </h3>
                    <p className="card-text">
                      Access a vast collection of previous year questions to enhance your preparation.
                    </p>
                    <span className="card-badge">Practice and Prepare</span>
                  </div>
                </li>
                <li>
                  <div className="category-card" style={{ '--color': '351, 83%, 61%' }}>
                    <div className="card-icon">
                      <img src={images.category1} width="40" height="40" loading="lazy"
                        alt="PSC Bulletin Magazine" className="img" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">Kerala PSC Bulletin Magazine</a>
                    </h3>
                    <p className="card-text">
                      Stay updated with the latest news and articles through our PSC Bulletin Magazine.
                    </p>
                    <span className="card-badge">Stay Informed</span>
                  </div>
                </li>
                <li>
                  <div className="category-card" style={{ '--color': '229, 75%, 58%' }}>
                    <div className="card-icon">
                      <img src={images.category1} width="40" height="40" loading="lazy"
                        alt="Mock Tests" className="img" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">Mock Tests and Performance</a>
                    </h3>
                    <p className="card-text">
                      Take mock tests, assess your performance, and improve your scores effectively.
                    </p>
                    <span className="card-badge">Test Your Skills</span>
                  </div>
                </li>
                <li>
                  <div className="category-card" style={{ '--color': '42, 94%, 55%' }}>
                    <div className="card-icon">
                      <img src={images.category1} width="40" height="40" loading="lazy"
                        alt="Check Rank List" className="img" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">Check Kerala PSC Rank List</a>
                    </h3>
                    <p className="card-text">
                      Check the rank list to gauge your position and plan your preparation effectively.
                    </p>
                    <span className="card-badge">Assess Your Rank</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="section about" id="about" aria-label="about">
            <div className="container">

              <figure className="about-banner">

                <div className="img-holder" style={{ '--width': 520, '--height': 370 }}>
                  <img src={images.about} width="520" height="370" loading="lazy" alt="about banner"
                    className="img-cover" />
                </div>

                <img src={images.about1} width="371" height="220" loading="lazy" alt="ad"
                  className="shape about-shape-2" />

                <img src={images.about2} width="722" height="528" loading="lazy" alt="wd"
                  className="shape about-shape-3" />

              </figure>

              <div className="about-content">
                <p className="section-subtitle">About Us</p>
                <h2 className="h2 section-title">
                  Revolutionizing Kerala PSC Exam Preparation Through Dedicated Learning
                </h2>
                <p className="section-text">
                  With a focused approach on Kerala PSC exam readiness, we strive to elevate distant learning for skill development, providing tailored resources and guidance.
                </p>
                <ul className="about-list">
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                    <span className="span">Comprehensive PSC Exam Curriculum</span>
                  </li>
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                    <span className="span">Interactive Remote Learning Experience</span>
                  </li>
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                    <span className="span">Continuous Learning Support & Lifetime Access</span>
                  </li>
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                    <span className="span">Expert Guidance & Skilled Instructors</span>
                  </li>
                </ul>
                <img src={images.about3} width="100" height="100" loading="lazy" alt="dd" className="shape about-shape-4" />
              </div>

            </div>
          </section>
          <section className="section course" id="courses" aria-label="course">
            <div className="container">

              <p className="section-subtitle">We Help You To</p>

              <h2 className="h2 section-title"> Get Ahead Of The Crowd
              </h2>

              <ul className="grid-list">

                <li>
                  <div className="course-card">

                    <figure className="card-banner img-holder" style={{ '--width': 370, '--height': 220 }}>
                      <img src={images.illust} width="370" height="220" loading="lazy"
                        alt="Build Responsive Real- World Websites with HTML and CSS" className="img-cover" />
                    </figure>

                    <div className="abs-badge">
                      <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="card-content">
                      <h3 className="h3">
                        <a href="#" className="card-title">24X7 ACCESS</a>
                      </h3>
                      <p>
                        Study anywhere anytime, either using your mobile, desktop or laptop. Download lessons and view them offline or stream them directly. Designed for your convenience.
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="course-card">

                    <figure className="card-banner img-holder" style={{ '--width': 370, '--height': 220 }}>
                      <img src={images.illust2} width="370" height="220" loading="lazy"
                        alt="Build Responsive Real- World Websites with HTML and CSS" className="img-cover" />
                    </figure>

                    <div className="abs-badge">
                      <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="card-content">
                      <h3 className="h3">
                        <a href="#" className="card-title">PERZONALIZED TIME TABLE</a>
                      </h3>
                      <p>
                        At PSC Green, we understand the significance of effective time management in your exam preparation journey. That's why we offer you the unique advantage of a timetable tailored  to your needs.
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="course-card">

                    <figure className="card-banner img-holder" style={{ '--width': 370, '--height': 220 }}>
                      <img src={images.illust3} width="370" height="220" loading="lazy"
                        alt="Build Responsive Real- World Websites with HTML and CSS" className="img-cover" />
                    </figure>

                    <div className="abs-badge">
                      <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="card-content">
                      <h3 className="h3">
                        <a href="#" className="card-title">INDEPTH KNOWLEDGE BASE</a>
                      </h3>
                      <p>
                        Get every little information you need on all topics through our recorded lessons, live sessions, handwritten notes and Q-Bank. You don’t need to open a book anymore.
                      </p>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </section>
          <section className="video has-bg-image" aria-label="video" style={{ backgroundImage: "url('./assets/images/video-bg.png')" }}>
            <div className="container">

              <div className="video-card">

                <div className="video-banner img-holder has-after" style={{ '--width': '', '--height': '' }}>
                  <img src={images.main} width="970" height="550" loading="lazy" alt="video banner" className="img-cover" />
                </div>

              </div>

            </div>
          </section>
          <section className="section stats" aria-label="stats">
            <div className="container">

              <ul className="grid-list">

                <li>
                  <div className="stats-card" style={{ '--color': '170, 75%, 41%' }}>
                    <h3 className="card-title">29.3k</h3>
                    <p className="card-text">Student Enrolled</p>
                  </div>
                </li>

                <li>
                  <div className="stats-card" style={{ '--color': '351, 83%, 61%' }}>
                    <h3 className="card-title">32.4K</h3>
                    <p className="card-text">Class Completed</p>
                  </div>
                </li>

                <li>
                  <div className="stats-card" style={{ '--color': '260, 100%, 67%' }}>
                    <h3 className="card-title">100%</h3>
                    <p className="card-text">Satisfaction Rate</p>
                  </div>
                </li>

                <li>
                  <div className="stats-card" style={{ '--color': '42, 94%, 55%' }}>
                    <h3 className="card-title">354+</h3>
                    <p className="card-text">Top Instructors</p>
                  </div>
                </li>

              </ul>

            </div>
          </section>
        </article>
      </main>
      <footer className="footer" style={{ backgroundImage: "url('./assets/images/footer-bg.png')" }}>
        <div className="footer-top section">
          <div className="container grid-list">

            <div className="footer-brand">
              <p className="footer-brand-text">
                Empowering your success with curated study materials and expert guidance.
              </p>
              <div className="wrapper">
                <span className="span">Call:</span>
                <a href="tel:+011234567890" className="footer-link">+01 123 4567 890</a>
              </div>
              <div className="wrapper">
                <span className="span">Email:</span>
                <a href="mailto:info@eduweb.com" className="footer-link">pscgreen.learning@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicWeb
