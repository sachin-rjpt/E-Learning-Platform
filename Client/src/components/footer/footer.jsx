import "./footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
export default function footer(){
     return (
           <footer>
            <div className="footer-content">
             <p className="footer-info"> 
             &copy; 2024 Your E-Learning Platform. All rights reserved. <br />
               <span> Developer @Sachin Rajput</span>
             </p>
             <div className="social-links">
                <a href="#"><FaFacebookSquare /></a>
                <a href="#"><FaInstagramSquare /></a>
                <a href="#"><FaTwitterSquare /></a>
             </div>
         </div>
         </footer>
     );
}