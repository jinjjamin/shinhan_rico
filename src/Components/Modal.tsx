import React from 'react';
import { Link } from 'react-router-dom';

interface ModalProps {
    id? : string;
    type? : string;
    children : React.ReactNode;
    link : string;
}

const Modal:React.FC<ModalProps> = ({id, type, children, link}) => {
    const modalClose = (target : any) => {
        const modalTarget = document.querySelectorAll('#' + target);

        if(!modalTarget.length){
            return
        }

        modalTarget.forEach((obj)=> {
            obj.classList.remove('active');
            setTimeout(function(){
                obj.classList.remove('show');
            }, 300)
        });
    }
    return (
        <>
           <div className={type ? "modalPop " + type  : "modalPop"} id={id}>
                <div className="modalPopArea">
                    <div className="modalBody">
                        {children}
                        <Link to="#" className="btnModalClose" onClick={()=> modalClose(id)}>
                            <span>해당 모달 닫기</span>
                        </Link>
                    </div>
                    <div className="modalFoot">
                        <Link to={link} className="btns btnCol01">
                            <span>선택완료</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;