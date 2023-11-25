import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import 'swiper/css';
import 'swiper/css/effect-cards';
import NestedModal from '../../components/nestedModal/NestedModal';
import PaymentMethods from '../paymentMethods/PaymentMethods';
import Prize from '../prize/Prize';
import Tickets from '../tickets/Tickets';
import './landingPage.scss';


const LandingPage = () => {

  const [openNestedModal, setOpenNestedModal] = useState(false);
  const scrollTwoRef = useRef(null);


  return (
    <>
      <section className="hero d-flex align-items-center justify-content-center">

        <div className="position-absolute w-100 gradient-overlay"></div>
        {/* <div className="content position-relative text-center mb-5"> */}
        <div className='banner'>
          <article>
            <div className='banner__left'>
              <h1 className="hero-title blend">
                ¡Participa y gana hasta 100$!
              </h1>
              <button className='banner__left__btn' onClick={() => scrollTwoRef.current.scrollIntoView({ behavior: 'smooth' })}>JUGAR</button>

            </div>
            <Helmet>
              <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/43542253.js"></script>
            </Helmet>
          </article>

          {/* </div> */}
        </div>
      </section>
      <section className="two" ref={scrollTwoRef}>
        <Prize />
        <h2 className='two__title'>SELECCIONAR TICKET</h2>
        <Tickets openNestedModal={openNestedModal} setOpenNestedModal={setOpenNestedModal} />


      </section>
      {openNestedModal && (
        <NestedModal open={openNestedModal} onClose={() => setOpenNestedModal(false)} />
      )}

      <section className="three"></section>
      {/* <section className="four"></section> */}
      <section className="herotwo">

        {/* 
            <div className="four position-absolute w-100 gradient-overlay"></div>
            <div className="content position-relative text-center mb-5">
    
            </div> */}
      </section>
      <section className="five">

        <PaymentMethods />
      </section>
      <div className="custom-cursor"></div>
    </>
  );
}

export default LandingPage