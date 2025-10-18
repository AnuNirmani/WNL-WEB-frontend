import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Locations.css'

const Locations = () => {
  const locations = [
    {
      id: 1,
      title: "Head Office",
      address: [
        "No. 8, Hunupitiya Cross Road,",
        "Colombo 02."
      ],
      contact: [
        "Tel: 011 2479479",
        "Fax: 011 2448323"
      ]
    },
    {
      id: 2,
      title: "Advertising Head Office",
      address: [
        "36, Hyde Park Corner,",
        "Colombo 02."
      ],
      contact: [
        "Tel: 5383383, 2479579, 5479579, 4479579",
        "Fax: 2314864, 5330013"
      ]
    },
    {
      id: 3,
      title: "Fort Branch",
      address: [
        "No. 08, Sir Chittampalam A Gardiner Mw,",
        "Colombo 02."
      ],
      contact: [
        "Tel: 011 2479516, 2326144",
        "Tel/Fax: 011 2386724"
      ]
    },
    {
      id: 4,
      title: "Kandy Branch",
      address: [
        "No. 01, Kotugodella Veediya,",
        "Kandy."
      ],
      contact: [
        "Tel: 081 2228492",
        "Tel: 011 2479930",
        "Fax: 081 2205917"
      ]
    },
    {
      id: 5,
      title: "Ratnapura Branch",
      address: [
        "Ratnapura."
      ],
      contact: [
        "Tel: 045 5671115",
        "Fax: 045 2226208"
      ]
    },
    {
      id: 6,
      title: "Nugegoda Branch",
      address: [
        "No. 2 3/1/1, Nawala Road,",
        "Nugegoda."
      ],
      contact: [
        "Tel: 011 2814143, 5383688",
        "Fax: 011 2814142"
      ]
    },
    {
      id: 7,
      title: "Circulation Head Office",
      address: [
        "36, Hyde Park Corner,",
        "Colombo 02."
      ],
      contact: [
        "Circulation Tel: 011 2479679, 2479625, 5383679, Fax: 2338580",
        "Subscription Tel: 011 2479626, Fax: 2339680"
      ]
    },
    {
      id: 8,
      title: "Kandy Circulation Branch",
      address: [
        "No. 135/13,14,15, Kotugodella Weediya,",
        "Kandy."
      ],
      contact: [
        "Tel: 0812205028"
      ]
    }
  ]

  return (
    <div className="locations-page">
      <Header />
      
      <main id="main">
        {/* Breadcrumbs */}
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <br />
            <ol>
              <li><a href="/">Home</a></li>
              <li>Locations</li>
            </ol>
          </div>
        </section>

         {/* Locations Content */}
         <section className="inner-page">
           <div className="container">
             <div className="section-title">
               <h2>Locations</h2>
             </div>
             <div className="row">
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className="col-xl-4 col-md-6 d-flex align-items-stretch"
                  data-aos="zoom-in"
                  data-aos-delay={`${(index + 1) * 100}`}
                >
                  <div className="icon-box contact-box">
                    <h4><a href="">{location.title}</a></h4>
                    {location.address.map((line, idx) => (
                      <p key={idx} className="addres">{line}</p>
                    ))}
                    {location.contact.map((line, idx) => (
                      <p key={idx} className="addres">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Locations
