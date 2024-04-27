import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

export const HomeSection1 = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.6 
    });
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: -100 }
        }}
        transition={{ duration: 1.2, type: "tween" }}
      >
        <div className=" w-full mt-10">
        <section className="text-white grid grid-cols-7">
          <div className="homeSection-1-1-bg col-span-2 ">
          <figure className=" flex justify-start mb-10 h-auto px-20 pt-8">
              <img src="src/assets/logo-fish.png" alt="aquascaping products" className="fish-logo " />
            </figure>
          <h1 className="text-5xl mb-6 pl-20">
            <span style={{ fontFamily: 'Arsenal, sans-serif', fontStyle: 'italic' }}>
                Leave <br />
            </span>{' '}
            <span style={{ fontFamily: 'Arsenal, sans-serif', fontStyle: 'italic' }}>
                i
            </span>
            <span style={{ fontFamily: 'Arsenal, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
                t to us!
            </span>{' '}
            </h1>

            <p className="text-xl mb-8 font-arsenal px-20">
            Embark on an exquisite underwater  <br /> journey with us. Our commitment to  <br /> quality and sustainability sets us apart, crafting aquatic landscapes that resonate with elegance and life.  <br /> Every product is a promise of unmatched excellence,  echoing our passion for the aquatic world.
            </p>
          </div>
      
          <div className="homeSection-1-2-bg grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 col-span-5">
            <div className="rounded-lg overflow-hidden">
            <figure className=" flex justify-center items-center overflow-hidden ">
              <img src="src/assets/home-aquascaping.png" alt="aquascaping products" className="home-sec-1-img w-full " />
            </figure>
            </div>
            <div className="rounded-lg overflow-hidden">
            <figure className=" flex justify-center items-center overflow-hidden ">
              <img src="src/assets/home-fish-selection.png" alt="fish selection" className="home-sec-1-img w-full " />
            </figure>
            </div>
            <div className=" rounded-lg overflow-hidden">
            <figure className=" flex justify-center items-center overflow-hidden ">
              <img src="src/assets/home-coral-selection.png" alt="aquascaping products" className="home-sec-1-img w-full " />
            </figure>
            </div>
          </div>
        </section>
      </div>
      </motion.div>

    )
}