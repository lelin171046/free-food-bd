import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bgimg1 from '../assets/F1.jpg'
import bgimg2 from '../assets/F2.jpg'
import bgimg3 from '../assets/F3.jpg'




import Slider from './Slider';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Carosoul = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      // progressCircle.current.style.setProperty('--progress', 1 - progress);
      // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className='container px-6 py10 mx-auto'>
      <Swiper
        spaceBetween={30} 
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true, 
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><Slider image={bgimg1} text={'Food donation is a powerful way to help those in need by providing essential nourishment.'}></Slider></SwiperSlide>
        <SwiperSlide><Slider image={bgimg2} text={'Sharing food shows care and kindness.'}></Slider></SwiperSlide>
        <SwiperSlide><Slider image={bgimg3} text={'Food donation helps feed the hungry, It reduces food waste and supports communities.'}></Slider></SwiperSlide>
        
       
        
        <div className="autoplay-progress" slot="container-end">
          
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
    );
};

export default Carosoul;