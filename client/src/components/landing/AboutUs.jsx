import React from 'react';
import img from './doctor-image12345.jpg';
import img1 from './doc.jpg';


function AboutUs() {
     return (
          <div style={{
               minHeight: '75px',
               height: 'fit-content',
               width: '100%',
               paddingTop: '10px',
               paddingRight: '30px',
               paddingBottom: '10px',
               paddingLeft: '30px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',

          }}>
               <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    maxWidth: '1320px',
                    marginTop: '0px',
                    marginRight: 'auto',
                    marginBottom: '0px',
                    marginLeft: 'auto',
               }}>
                    <div style={{
                         width: '55%',
                         height: 'auto',
                         boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 10px 7px',
                         borderRadius: '10px',
                    }}>
                         <img src={img} alt="Mission Image" />
                    </div>
                    <div style={{
                         padding: '0px 0px 0px 40px',
                         width: '40%',
                    }}>
                         <p style={{
                              fontSize: '25px',
                              fontWeight: '700',
                              lineHeight: '34px',
                              color: 'rgb(51, 51, 51)',
                              marginBottom: '10px',
                         }}>
                              Our Mission
                         </p>
                         <p style={{
                              color: 'rgb(102, 102, 102)',
                              fontSize: '25px',
                              fontWeight: '700',
                              lineHeight: '34px',
                              marginBottom: '15px',
                         }}>
                              At Aarogyashala, we are committed to revolutionizing healthcare delivery by providing accessible, affordable, and compassionate medical services. Our mission is simple yet profound: to empower individuals and communities to lead healthier, happier lives.
                         </p>
                         <p style={{
                              fontSize: '25px',
                              lineHeight: '34px',
                              color: 'rgb(102, 102, 102)',
                              marginBottom: '50px',
                         }}>
                              We believe that healthcare is a fundamental human right, and everyone deserves access to high-quality medical care. Our mission is to bridge the gap between patients and healthcare providers, offering comprehensive and personalized healthcare solutions that cater to the diverse needs of our patients.
                         </p>
                         <button style={{
                              fontSize: '20px',
                              lineHeight: '28px',
                              color: 'rgb(255, 255, 255)',
                              backgroundColor: 'rgb(38, 122, 107)',
                              padding: '10px 50px',
                              border: 'none',
                              cursor: 'pointer',
                              width: '100%', // Set width to 100%
                              padding: '20px 0', // Increased pad
                         }}>
                              Explore
                         </button>
                    </div>
               </div>
               <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    maxWidth: '1320px',
                    marginTop: '100px',
                    marginRight: 'auto',
                    marginBottom: '50px',
                    marginLeft: 'auto',
               }}>
                    <div style={{
                         width: '40%',
                         padding: '0px 40px 0px 0px',
                    }}>
                         <p style={{
                              fontSize: '25px',
                              fontWeight: '700',
                              lineHeight: '34px',
                              color: 'rgb(51, 51, 51)',
                              marginBottom: '10px',
                              textAlign: 'right',
                         }}>
                              Our Vision
                         </p>
                         <p style={{
                              color: 'rgb(102, 102, 102)',
                              fontSize: '25px',
                              fontWeight: '700',
                              lineHeight: '34px',
                              marginBottom: '15px',
                              textAlign: 'right',
                         }}>
                              At Aarogyashala, our vision is to create a healthier world where every individual has access to quality healthcare services and can live their life to the fullest. We envision a future where healthcare is not just a service, but a fundamental right that empowers individuals to thrive physically, mentally, and emotionally.
                         </p>
                         <p style={{
                              fontSize: '25px',
                              lineHeight: '34px',
                              color: 'rgb(102, 102, 102)',
                              marginBottom: '50px',
                              textAlign: 'right',
                         }}>
                              We strive to be a trusted partner in our patients' healthcare journey, leveraging innovation, compassion, and expertise to deliver personalized and holistic care. Through our commitment to excellence, integrity, and community engagement, we aim to be a beacon of hope and healing in the communities we serve.
                         </p>
                         <button style={{
                              fontSize: '20px',
                              lineHeight: '28px',
                              color: 'rgb(255, 255, 255)',
                              backgroundColor: 'rgb(38, 122, 107)',
                              padding: '10px 50px',
                              border: 'none',
                              cursor: 'pointer',
                              width: '100%', // Set width to 100%
                              padding: '20px 0', // Increased padding for top and bottom
                         }}>
                              Explore
                         </button>
                    </div>
                    <div style={{
                         width: '55%',
                         height: 'auto',
                         boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 10px 7px',
                         borderRadius: '10px',
                    }}>
                         <img src={img1} alt="Vision Image" />
                    </div>
               </div>
          </div>
     );
}

export default AboutUs;