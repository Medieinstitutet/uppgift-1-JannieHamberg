import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";
import { StarRating } from "./StarRating"

export const HomeSection3 = () => {

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
        <div className="home-section-3-bg w-full mb-10">
             <div className=" w-full mt-20 p-8 text-white">
            <h1 className="text-5xl mb-6 flex justify-center mt-20 ">
            <span className="mr-3" style={{ fontFamily: 'Arsenal, sans-serif', fontStyle: 'italic'  }}>
                What Our Customers Say 
            </span>
            </h1>
            </div>


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
<div className="container mx-auto px-4 py-8">
  <div className="flex justify-center mx-auto gap-10 pt-20 ">
    <div className="max-w-sm rounded overflow-hidden shadow-lg glass">
      <div className="px-6 py-4">
      <StarRating rating={5} />
        <p className="text-white text-base pb-4">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quam iusto eligendi ipsa voluptatibus beatae aut praesentium expedita? Aut ab, harum dolore veniam natus fugit a iusto reprehenderit labore facilis.
        </p>
        <div className="font-bold text-xl mb-2 flex justify-end ">Larissa Charter</div>
      </div>
    </div>

    
    <div className="max-w-sm rounded overflow-hidden shadow-lg glass">
        <div className="px-6 py-4">
        <StarRating rating={5} />
            <p className="text-white text-base pb-4">
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor ad recusandae unde illo ea ipsum ab eligendi accusantium iusto distinctio deserunt, repellendus exercitationem error! Est ratione cum repudiandae eveniet.
            </p>
            <div className="font-bold text-xl mb-2 flex justify-end">Miguel Rivera</div>
        </div>
    </div>

 
    <div className="max-w-sm rounded overflow-hidden shadow-lg glass">
      <div className="px-6 py-4">
      <StarRating rating={5} />
        <p className="text-white text-base pb-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et natus maiores, eum iure magni debitis! Placeat distinctio hic ex optio nihil eligendi qui quidem odio excepturi, dignissimos autem! Tenetur, ipsam.
        </p>
        <div className="font-bold text-xl mb-2 flex justify-end">Carey Larson</div>
      </div>
    </div>
  </div>
</div>
</motion.div>
        </div>
    )

}