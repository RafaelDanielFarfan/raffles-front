import React, { useEffect, useState } from 'react'
import './landingPage.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetTicketsAsync } from '../../redux/actions/ticketsActions';
import Tickets from '../tickets/Tickets';
import NestedModal from '../../components/nestedModal/NestedModal';
import PaymentMethods from '../paymentMethods/PaymentMethods';
import Prize from '../prize/Prize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from 'react-helmet';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useRef } from 'react';


const LandingPage = () => {

  const [openNestedModal, setOpenNestedModal] = useState(false);
  const scrollTwoRef = useRef(null);


  return (
    <>
      <header>
        <div className="sticky-nav difference d-flex justify-content-between">
          <div className="logo"></div>

        </div>

      </header>
      <section className="hero d-flex align-items-center justify-content-center">

        <div className="position-absolute w-100 gradient-overlay"></div>
        {/* <div className="content position-relative text-center mb-5"> */}
        <div className='banner'>
          <article>
            <div className='banner__left'>
              <h1 className="hero-title blend">
                ¡Apoya, participa y gana!
              </h1>
              <h2 className='banner__left__h2'>Todo lo recaudado será destinado para la operación de Olga Guzmán</h2>
              <button className='banner__left__btn' onClick={() => scrollTwoRef.current.scrollIntoView({ behavior: 'smooth' })}>APOYAR</button>
              
            </div>
            <div className='banner__right'>
              <figure>
                <img className='banner__img' src="https://res.cloudinary.com/dd8l8bm6q/image/upload/v1691515300/w0h744eu1wok1d6a5pvr.png" alt="Descripción de la imagen" />
              </figure>
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


        <article className="whyHelp__article">
          <section className="whyHelp__left">
            <p className="whyHelp__article__p">
              Olga es una persona extraordinaria, siempre dispuesta a tender una mano amiga a quien lo necesita. Sin embargo, en este momento, es ella quien requiere de nuestra ayuda.

              <br />

              Olga está enfrentando una condición médica delicada que requiere una operación vital para restaurar su salud y bienestar. Desafortunadamente, los costos médicos en Venezuela son muy elevados y están fuera del alcance de sus posibilidades económicas.
            </p>

          </section>

          <section className="whyHelp__right">
            <h2 className="whyHelp__right__h2">¿Cómo puedes ayudar?</h2>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              <SwiperSlide>
                <p >
                  ¡Con la compra de un ticket para la rifa!
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  ¡Donar generosamente: Cada granito de arena suma para alcanzar la meta!
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  ¡Compartir y difundir: Compartiendo esta campaña en tus redes sociales y entre tus amigos y familiares!
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  ¡Orar y enviar buenas vibras: Tus buenos deseos y oraciones también son de gran valor para Olga y su familia!
                </p>
              </SwiperSlide>
            </Swiper>
          </section>

        </article>


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