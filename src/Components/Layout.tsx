import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header  from './Header';
import Modal from '../Components/Modal';

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
            <Modal id="designHistory" type="full" >
                <div className="layerHead">
                    <div>
                        <a href="#" className="btnHeadPrev btnLayerClose">
                            <span>이전페이지로 이동</span>
                        </a>
                    </div>
                </div>
                <div className="layerTitle">
                    <dl>
                        <dt>설계 이력</dt>
                        <dd>진행 중이거나 완료된 설계이력을 확인하세요</dd>
                    </dl>
                </div>
                <div className="layerCont">
                    <img src="/public/images/mobile/img_design_history.png" alt="" />
                </div>
            </Modal>
        </>
    )
}

export default Layout;