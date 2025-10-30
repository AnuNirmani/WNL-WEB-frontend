import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Vision from './Vision'
import Mission from './Mission'
import Logos from './Logos'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Header />
      
      {/* Main Content */}
      <main id="main">
        {/* Breadcrumbs */}
        <section id="breadcrumbs" className="breadcrumbs" data-aos="fade-down">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>About Us</li>
            </ol>
          </div>
        </section>

        {/* About Us Content */}
        <section className="inner-page">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>About Us</h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="100">
              Wijeya Newspapers Ltd. (WNL) commenced operations in 1980 with two Sinhala weeklies -"Sirikatha" and "Wijeya" designed for women and children respectively. These were followed in 1983 by another Sinhala weekly for young men -"Tharunaya". Soon after, was born The "Lanka Woman"- a women's journal in English.
            </p>

            <p data-aos="fade-up" data-aos-delay="150">
              The company was anxious to provide readers with quality colour printing  and thus WNL became the first Sri Lankan publisher to install a web-fed offset press capable of providing very good colour 
            </p>

            <p data-aos="fade-up" data-aos-delay="200">
              In 1986, the Company expanded its publishing activities by acquiring several newspaper titles form the then defunct Times of Ceylon Ltd.  Two Sunday Newspapers, the Sunday Lankadeepa in February 1986 and the Sunday Times in June 7th of 1987, which reached the hands of the reading public, were brand new publications with refreshingly new concepts, style and form. They served to fill a great vacuum for bold and independent newspapers with attractive presentations. 
            </p>

            <p data-aos="fade-up" data-aos-delay="250">
              The success of these two newspapers led to WNL's first daily newspaper in 1991 - the "Daily Lankadeepa" which provided its readers with a fresh product everyday and which has raced away to become the most popular Sinhala daily newspaper of today. 
              Introduced in January 1999 as the "Mid Week Mirror", the English tabloid became a daily in June 1999. Today as a broad sheet, it remains a popular daily with its own distinctive style of writing and presentation that makes easy reading.  
            </p>

            <p data-aos="fade-up" data-aos-delay="300">
              Great emphasis has also been made by WNL to provide high quality printing and ancillary facilities. Today WNL runs the most modern newspaper printing operating in Sri Lanka with five print production lines. Its subsidiary operates a heat-set printing plant, a Japanese built Mitsubishi, the only one in Sri Lanka. 
            </p>

            <p data-aos="fade-up" data-aos-delay="350">
              Wijeya Newspapers Ltd., views the future with continued confidence in its own growth as well as the further expansion of a discriminating and demanding reading public. In line with that , Wijeya Newspapers Ltd expanded it's business by starting a state of art factory in 2008 in Hokandara. it has installed the Hi-Speed Auto Registration 4 colour Web offset (Hi-Line) Printing Machine using CTP technology with environment friendly chemicals with 45000 copy per hour along with first Automated off-Line Inserting machine(KANSA) as the 1st installation in South Asian Region. 
            </p>

            <p data-aos="fade-up" data-aos-delay="400">
              Wijeya Newspapers Ltd is very proud to have the new technology machine with high caliber technical staff with sound knowledge of Environmental management .further ,the factory has been designed in environmental friendly manner with Sound proofed press room.
              The Factory uses the waste and effluent water recycle for it's garden and also natural Day Lights use for total Factory area of 650000 sq.feet building in day time.
            </p>

            <p data-aos="fade-up" data-aos-delay="450">
              Wijeya Newspapers Ltd  e-news sites are also very popular among internet users. The Sinhala daily "Lankadipa" became the first Sinhala newspaper in the worldwide web. "The Sunday Times" had been available to web users a few years earlier. The popularity of WNL print journalism has been ported to cyberspace with ease. While newspapers will remain relevant for quite a long time, the company is already preparing for the next revolution in info business. 
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <Vision />

        {/* Mission Section */}
        <Mission />

        {/* Values Section */}
        <section id="values" className="services section-bg">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Values</h2>
              <p data-aos="fade-up" data-aos-delay="100"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p data-aos="fade-up" data-aos-delay="200">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <Logos />
      </main>

      <Footer />
    </div>
  )
}

export default AboutUs
