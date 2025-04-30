import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const modalOpen = (target : string) => {
        const modalTarget = document.querySelectorAll(target);

        if(!modalTarget.length){
            return
        }

        modalTarget.forEach((obj)=> {
            obj.classList.add('show');
            setTimeout(function(){
                obj.classList.add('active');
            }, 1);
        });
    }

    useEffect(()=> {
         // 모달 Close
         document.querySelectorAll('.btnLayerClose').forEach((object)=> {
            object.addEventListener('click' , (e)=> {
                e.preventDefault();

                object.closest('.modalPop')?.classList.remove('show');
                object.closest('.modalPop')?.classList.remove('active');
            })
        });

    }, [])
    return (
        <>
            <header id="header">
                <h1 className="logo"><Link to="/">로고</Link></h1>
                <div>
                    <Link to="#" className="btnHeadSocial" onClick={()=> modalOpen('#designHistory')}>
                        <span>이력관리</span>
                        <em className="count">1</em>
                    </Link>
                    <Link to="#" className="btnHeadClose">
                        <span>해당페이지 닫기</span>
                    </Link>
                </div>
            </header>

        </>
    )
}

export default Header;