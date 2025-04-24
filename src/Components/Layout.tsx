import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header  from './Header'

/* Css */
import '../assets/css/mobile.css';

interface LayoutProps {
    type?  : string;
    children : React.ReactNode;
}

const Layout:React.FC<LayoutProps> = ({type, children}) => {
    var vh = window.innerHeight;
	var vw = (window.innerWidth >= 1920) ? 1920 : window.innerWidth;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	document.documentElement.style.setProperty("--vw", `${vw}px`);

	window.addEventListener("resize", () => {
		var vh = window.innerHeight;
		var vw = (window.innerWidth >= 1920) ? 1920 : window.innerWidth;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		document.documentElement.style.setProperty("--vw", `${vw}px`);
	});

    useEffect(()=> {
        if(type === 'fixed'){
            document.querySelector('#wrap')?.classList.add('fixed');
        }
    }, [])
    return (
        <>
            <Header />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Layout;