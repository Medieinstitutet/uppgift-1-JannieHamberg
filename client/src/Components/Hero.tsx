import { motion } from "framer-motion"


export const Hero = () => {
    return (
        <div className="hero min-h-screen">
            <video autoPlay loop muted playsInline className="video">
                <source src='src/assets/videos/vid-hero-2.mp4' type='video/mp4'/>
            </video>
            <div className="hero-content text-center mt-10">
                <div className="max-w-lg flex flex-col gap-10">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                    >
                        <img src="../assets/logo3.png" alt="" />
                    </motion.h1>
              
                </div>
            </div>
        </div>
    )
}