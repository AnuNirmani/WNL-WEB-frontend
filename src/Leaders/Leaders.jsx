import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Leaders.css';

const Leaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Equivalent of your JS fetch function
  const fetchLeaders = async () => {
    const apiUrl = 'http://127.0.0.1:8000/api/employees'; // or localhost if you use that



    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const employees = await response.json();

      // ✅ Same filtering logic
      const filtered = employees.filter(emp =>
        emp.position?.toLowerCase().includes('leader') &&
        emp.status?.toLowerCase() === 'active'
      );

      setLeaders(filtered);
    } catch (err) {
      console.error('Error fetching leaders:', err);
      setError('Error loading leaders.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data on mount (like running the script)
  useEffect(() => {
    fetchLeaders();
  }, []);

  // ✅ Equivalent of your renderCards function
  const renderLeaders = () => {
    if (loading) return <p className="text-center w-100">Loading leaders...</p>;
    if (error) return <p className="text-danger text-center w-100">{error}</p>;
    if (leaders.length === 0) return <p className="text-center w-100">No leaders found.</p>;

    return leaders.map((emp, index) => (
      <div
        key={emp.id}
        className="col-lg-4 col-md-6 d-flex align-items-stretch"
        data-aos="zoom-in"
        data-aos-delay={100 + index * 100}
      >
        <div className="member">
          <img
            src={emp.photo || 'https://placehold.co/400x400?text=No+Photo'}
            className="img-fluid"
            alt={emp.name}
          />
          <div className="member-content">
            <h4>{emp.name || 'Unnamed'}</h4>
            <span>{emp.position || ''}</span>
            <p>{emp.bio?.trim() ? emp.bio : 'No bio available.'}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="leaders-page">
      <Header />

      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Leadership</li>
          </ol>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="our-leaders" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>OUR LEADERS</h2>
            <p>Meet the people guiding Wijeya Newspapers towards a brighter future.</p>
          </div>

          <div id="leadersGrid" className="row">
            {renderLeaders()}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leaders;
