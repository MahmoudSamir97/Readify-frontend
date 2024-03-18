import React from 'react';
import "./header.css";
import { motion } from "framer-motion";
import img1 from "./../../images/img1.jpg";
import img2 from "./../../images/book1.jpeg";
import img3 from "./../../images/book2.jpeg";

const Header = () => {
    const generateCarouselItem = () => {
        const images = [img1, img2, img3];
        return images.map((image, index) => (
            <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
                <div className="img-text">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Readify <b> </b>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima maxime omnis sed nostrum, porro harum d.
                    </motion.p>
                </div>
            </div>
        ));
    };

    return (
        <div className="carousel-container"> {/* New div container */}
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    {generateCarouselItem()}
                </div>
            </div>
        </div>
    );
}

export default Header;
