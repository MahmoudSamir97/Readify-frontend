import React from "react";
import { motion } from "framer-motion";
import "./aboutus.css";

// Import images
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpg";
import img7 from "../../images/img7.jpg";

const AboutUs = () => {
  const teamMembers = [
    { name: "Member 1", position: "Position 1", description: "Description for member 1", imageUrl: img1 },
    { name: "Member 2", position: "Position 2", description: "Description for member 2", imageUrl: img2 },
    { name: "Member 3", position: "Position 3", description: "Description for member 3", imageUrl: img3 },
    { name: "Member 4", position: "Position 4", description: "Description for member 4", imageUrl: img4 },
    { name: "Member 5", position: "Position 5", description: "Description for member 5", imageUrl: img5 }
  ];

  return (
    <div>
      <h2 className="mx-3 mt-3 mb-6">Who We Are</h2>

      <motion.div
        className="about mx-auto"
        style={{ width: "100%", height: "70vh", position: "relative" }} 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 1, ease: "easeInOut" } },
          hidden: { opacity: 0, y: 50, transition: { delay: 1, duration: 1, ease: "easeInOut" } }
        }}
      >
        <div className="about-item" style={{ position: "relative" }}>
          <div className="animation-text" style={{ color: "white", fontWeight: "bold", fontStyle: "italic", textAlign: "left", padding: "0 20px" ,paddingRight:"600px"}}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <p>
                "Our bookstore application is a comprehensive platform designed to cater to all book lovers' needs. With an extensive collection of books spanning various genres and topics, our app offers users an immersive browsing experience. Whether you're searching for the latest bestsellers, timeless classics, or niche subjects, our curated selection ensures that you'll find exactly what you're looking for. Additionally, our user-friendly interface and intuitive features make it easy to discover new titles, create personalized reading lists, and engage with fellow book enthusiasts. Whether you're an avid reader, a casual bookworm, or a curious learner, our bookstore application is your go-to destination for all things literary."
              </p>
            </motion.div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "83%", transform: "translate(-50%, -50%)" }}>
            <img src={img7} alt="Background" className="background-image" style={{ width: "450px", height: "420px", objectFit: "cover" }} /> {/* Adjust width and height as needed */}
          </div>
        </div>
      </motion.div>
      
      <h2 className="mx-3 mt-3 mb-4">Our Team</h2>
      <div className="about mx-auto team-container" style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flip-card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{ marginBottom: "20px", boxShadow: "black", borderRadius: "8px", overflow: "hidden" }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={member.imageUrl} alt={member.name} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
              </div>
              <div className="flip-card-back" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "50px" }}>
                <h1 style={{ color: "#333", marginBottom: "10px" }}>{member.name}</h1>
                <p style={{ color: "#666", marginBottom: "10px" }}>{member.position}</p>
                <p style={{ color: "#777" }}>{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
