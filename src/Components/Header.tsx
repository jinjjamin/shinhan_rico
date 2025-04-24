import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header id="header">
                <h1 className="logo"><Link to="/">로고</Link></h1>
                <div>
                    <Link to="#" className="btnHeadSocial">
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