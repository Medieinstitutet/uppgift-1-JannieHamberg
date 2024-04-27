import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

export const HomeSection2 = () => {
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

        <div className=" w-full mt-20">
            <h1 className="text-5xl mb-6 flex justify-center mt-20 ">
            <span className="mr-3" style={{ fontFamily: 'Arsenal, sans-serif', fontStyle: 'italic' }}>
                AquaLux  
            </span>
            <span style={{ fontFamily: 'Arsenal, sans-serif', fontStyle: 'italic', color: '#007073' }}>
                Awards
            </span>
            </h1>
            </div>

            <div className="container mx-auto px-4 py-8">
  <div className="flex justify-around">
   
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src="src/assets/award1.png" alt="Self-Paced Tour" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Best In Show</div>
        <p className="text-gray-700 text-base">
        Conferred the 'Best in Show' title at the renowned Aquatic Gardener’s Association Convention 2024 in Berlin, Germany, our aquascape 'Emerald Tranquility' was lauded for its innovative design and natural harmony, embodying the pinnacle of aquatic gardening artistry.
        </p>
      </div>
    </div>

    
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src="src/assets/award2.png" alt="Semi-Guided Tour" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Best Discus</div>
            <p className="text-gray-700 text-base">
            Our Discus triumphed as "Best Discus" at the International Discus Competition 2023 in Singapore, showcasing our commitment to vibrant colors and perfect symmetry in aquaculture.
            </p>
        </div>
    </div>

 
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src="src/assets/award3.png" alt="Fully Guided Tour" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Grand Champion</div>
        <p className="text-gray-700 text-base">
        Crowned "The Grand Champion" at the Asian Aquatic Expo 2021 in Shanghai, China, our Koi have set the standard for exceptional quality and majestic beauty in the aquatic world.
        </p>
      </div>
    </div>
  </div>
</div>

        </motion.div>
    )
}