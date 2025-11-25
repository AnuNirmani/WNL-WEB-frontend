import React from 'react'

const Footer = () => {
  return (
    <footer id="footer">
      {/* Main Footer Content */}
      <div className="footer-main" style={{ background: '#000', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            {/* Group Sites */}
            <div className="col-lg-2 col-md-6 col-12 mb-4">
              <div className="footer-column">
                <h4 className="footer-heading">Group Sites</h4>
                <ul className="footer-links">
                  <li><a href="http://www.lankadeepa.lk/" target="_blank" rel="noopener noreferrer">Lankadeepa</a></li>
                  <li><a href="http://www.ada.lk/" target="_blank" rel="noopener noreferrer">Ada</a></li>
                  <li><a href="http://www.sundaytimes.lk/" target="_blank" rel="noopener noreferrer">Sunday Times</a></li>
                  <li><a href="http://www.ft.lk/" target="_blank" rel="noopener noreferrer">Daily FT</a></li>
                  <li><a href="http://www.tamilmirror.lk/" target="_blank" rel="noopener noreferrer">Tamil Mirror</a></li>
                  <li><a href="http://www.deshaya.lk/" target="_blank" rel="noopener noreferrer">Deshaya</a></li>
                  <li><a href="http://middleeast.lankadeepa.lk/" target="_blank" rel="noopener noreferrer">Middleast Lankadeepa</a></li>
                  <li><a href="http://edu.dailymirror.lk/" target="_blank" rel="noopener noreferrer">Mirror Edu</a></li>
                  <li><a href="http://life.lk/" target="_blank" rel="noopener noreferrer">Life Online</a></li>
                  <li><a href="http://www.hi.lk/" target="_blank" rel="noopener noreferrer">Hi Online</a></li>
                  <li><a href="https://www.lw.lk/" target="_blank" rel="noopener noreferrer">LW</a></li>
                  <li><a href="https://www.kelimandala.lk/" target="_blank" rel="noopener noreferrer">Kelimandala</a></li>
                  <li><a href="https://www.wijeya.lk/" target="_blank" rel="noopener noreferrer">Wijeya</a></li>
                  <li><a href="http://www.wedo.lk" target="_blank" rel="noopener noreferrer">Wedo</a></li>
                  <li><a href="https://www.wnow.lk/" target="_blank" rel="noopener noreferrer">wnow</a></li>
                </ul>
              </div>
            </div>

            {/* E-papers & Classified */}
            <div className="col-lg-2 col-md-6 col-12 mb-4">
              <div className="footer-column">
                <h4 className="footer-heading">E-papers</h4>
                <ul className="footer-links">
                  <li><a href="http://dailylankadeepa.pressreader.com/daily-lankadeepa">lankadeepa</a></li>
                  <li><a href="http://sundaylankadeepa.pressreader.com/sunday-lankadeepa">Sunday Lankadeepa</a></li>
                  <li><a href="http://sundaytimes.pressreader.com/sunday-times-sri-lanka">Sunday Times</a></li>
                  <li><a href="https://dailyftepaper.pressreader.com/daily-ft">Daily FT</a></li>
                  <li><a href="http://epaper.ada.lk/">Ada</a></li>
                  <li><a href="http://epaper.tamilmirror.lk/">Tamil Mirror</a></li>
                </ul>
                
                <h4 className="footer-heading mt-4">Classified</h4>
                <ul className="footer-links">
                  <li><a href="http://www.hitad.lk">Hitad</a></li>
                  <li><a href="http://www.timesjobs.lk">Timesjobs</a></li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6 col-12 mb-4">
              <div className="footer-column">
                <h4 className="footer-heading">Services</h4>
                <ul className="footer-links">
                  <li><a href="http://dailymirrorepaper.newspaperdirect.com/epaper/viewer.aspx">E-Paper</a></li>
                  <li><a href="mailto:subs@wijeya.lk">Home delivery</a></li>
                  <li><a href="dmstuff.wijeyadigital.lk/advert/Banners/advertise_with_us/index.htm#dm_section">Advertise with us</a></li>
                  <li><a href="https://www.dailymirror.lk/apps">Mobile Apps</a></li>
                  <li><a href="https://www.dailymirror.lk/feedback">feedback</a></li>
                  <li><a href="https://www.dailymirror.lk/archives">Archive</a></li>
                </ul>
              </div>
            </div>

            {/* Section */}
            <div className="col-lg-2 col-md-6 col-12 mb-4">
              <div className="footer-column">
                <h4 className="footer-heading">Section</h4>
                <ul className="footer-links">
                  <li><a href="https://www.dailymirror.lk/Opinion/172">Opinion</a></li>
                  <li><a href="https://www.dailymirror.lk/Expose/333">Expose</a></li>
                  <li><a href="https://www.dailymirror.lk/Features/131">Features</a></li>
                  <li><a href="https://www.dailymirror.lk/Cartoon/167">Cartoon</a></li>
                  <li><a href="https://www.dailymirror.lk/World-News/213">World News</a></li>
                  <li><a href="https://www.dailymirror.lk/sports">Sports</a></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-12 col-12 mb-4">
              <div className="footer-column">
                <h4 className="footer-heading">Contact</h4>
                
                <div className="contact-section">
                  <div className="contact-item">
                    <h5 className="contact-subheading">Editorial:</h5>
                    <p className="contact-details">Phone - <a href="tel:+94112479356" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 112 479 356</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:dmonlinelk@gmail.com" style={{ color: '#ffffffff', textDecoration: 'none' }}>dmonlinelk@gmail.com</a></p>
                  </div>
                  
                  <div className="contact-item">
                    <h5 className="contact-subheading">Technical:</h5>
                    <p className="contact-details">Phone - <a href="tel:+94112479884" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 112 479 884</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:helpdesk@wijeya.lk" style={{ color: '#ffffffff', textDecoration: 'none' }}>helpdesk@wijeya.lk</a></p>
                  </div>
                  
                  <div className="contact-item">
                    <h5 className="contact-subheading">Web Advertising:</h5>
                    <p className="contact-details">Phone (Dilan) - <a href="tel:+94773727288" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 77 372 7288</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:dilanj@wnl.lk" style={{ color: '#ffffffff', textDecoration: 'none' }}>dilanj@wnl.lk</a></p>
                    <p className="contact-details">Phone (Dushyanth) - <a href="tel:+94779125988" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 77 912 5988</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:dushyantha@wijeyadigital.lk" style={{ color: '#ffffffff', textDecoration: 'none' }}>dushyantha@wijeyadigital.lk</a></p>
                    <p className="contact-details">Phone (Sanjaya) - <a href="tel:+94766853168" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 76 685 3168</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:sanjaya@wijeyadigital.lk" style={{ color: '#ffffffff', textDecoration: 'none' }}>sanjaya@wijeyadigital.lk</a></p>
                  </div>
                  
                  <div className="contact-item">
                    <h5 className="contact-subheading">Print Advertising:</h5>
                    <p className="contact-details">Phone (Indika) - <a href="tel:+94773850781" style={{ color: '#ffffffff', textDecoration: 'none' }}>+94 77 385 0781</a></p>
                    <p className="contact-details">E-mail - <a href="mailto:indikaj@wijeya.lk" style={{ color: '#ffffffff', textDecoration: 'none' }}>indikaj@wijeya.lk</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom" style={{ 
        background: '#0c1a4b', 
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div className="container">
          <div className="row align-items-center">
            
              <div className="copyright" >
                
                <center>© 2025 Developed and Maintained by WNL in collaboration with Web Publishing Department </center>
                  <center>© All rights reserved, 2008 - Wijeya Newspapers Ltd. </center>
              </div>
         
            <div className="col-md-6 text-end">
              <a href="#" className="back-to-top" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#47b2e4',
                color: '#fff',
                textDecoration: 'none',
                transition: '0.3s'
              }}>
                <i className="ri-arrow-up-line" style={{ fontSize: '20px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

