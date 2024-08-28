import '../styling/FooterStyle.css'
import SocialMedia from './SocialMedia';


const Footer = () => {

    const Year = new Date().getFullYear();

    return (
        <footer>
            <div className='footer-content'>
                <img src=''/>
                <SocialMedia/>
                <span>Made with ❤</span>
            </div>
        </footer>
    );
};

export default Footer;