import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Layout from '../Components/Layout';
import Modal from '../Components/Modal';
import RadioBoxGroup from '../Components/RadioBoxGroup';
import RadioBox from '../Components/RadioBox';

const Main = () => {
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

    return (
        <>
            <Layout>
                <div className="mainWrap">
                    <div>
                        <div className="msgArea">이생명 고객님의<br /><strong>간편맞춤 가입설계</strong>가 <br />필요하신가요? </div>
                        <div className="btnArea left">
                            <Link to="#" className="btnCategory" onClick={()=> modalOpen('#categoryPop')}>
                                <span>카테고리로 시작</span>
                            </Link>
                        </div>
                    </div>
                    <div className="questionSwiper">
                        <div className="head">
                            <div className="title">많이 선택한 카테고리</div>
                        </div>
                        <div className="list">
                            <div className="item item01">
                                <div className="itemView">
                                    <Link to="#" className="swiper-slide dementia">치매에 5만원 이하의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide dying">사망에 10~20만원의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide cancer">암 질병에 5~10만원의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide hospitalization">입원수술에 5만원 이하의 가입설계시작해줘</Link>
                                </div>
                            </div>
                            <div className="item item02" dir="rtl">
                                <div className="itemView">
                                    <Link to="#" className="swiper-slide dementia">치매에 5만원 이하의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide dying">사망에 10~20만원의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide cancer">암 질병에 5~10만원의 가입설계 시작해줘</Link>
                                    <Link to="#" className="swiper-slide hospitalization">입원수술에 5만원 이하의 가입설계시작해줘</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Modal id="categoryPop" type="bottom" link={"/Analyze"}>
                <div className="modalMsg">
                    <div className="msg">리코에게 알려주세요!</div>
                </div>
                <div className="modalCont">
                    <div className="titArea">
                        <strong className="title"><em>급부</em>와 <em>금액</em>을 선택해주세요</strong>
                    </div>
                    <div className="insInfoSelect">
                        <RadioBoxGroup>
                            <RadioBox id="rdo0101" name="rdo0101" label="#사망" defaultChecked={true} />
                            <RadioBox id="rdo0102" name="rdo0102" label="#암" />
                            <RadioBox id="rdo0103" name="rdo0103" label="#뇌심" />
                            <RadioBox id="rdo0104" name="rdo0104" label="#입원수술" />
                            <RadioBox id="rdo0105" name="rdo0105" label="#치매" />
                            <RadioBox id="rdo0106" name="rdo0106" label="#기타" />
                        </RadioBoxGroup>

                        <RadioBoxGroup>
                            <RadioBox id="rdo0201" name="rdo02" label="#5만원 이하"  defaultChecked={true} />
                            <RadioBox id="rdo0202" name="rdo02" label="#5~10만원" />
                            <RadioBox id="rdo0203" name="rdo02" label="#10~20만원" />
                            <RadioBox id="rdo0204" name="rdo02" label="#20만원 이상" />
                        </RadioBoxGroup>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Main;