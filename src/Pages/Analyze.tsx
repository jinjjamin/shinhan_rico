import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import anime, { AnimeTimelineInstance } from 'animejs';

/* Components */
import Layout from '../Components/Layout';

const Analyze = () => {
    const sourcepos = (target: string, time: number) => {
        const el = document.querySelectorAll('[data-sourcepos]');

        if (el.length <= 0) {
            return;
        }

        document.querySelectorAll(target).forEach((objectTarget) => {
            if (objectTarget.classList.contains('complete')) {
                return;
            }
        });

        setTimeout(() => {
            document.querySelectorAll(target).forEach((objectTarget) => {
                objectTarget.querySelectorAll('[data-sourcepos]').forEach((objectEl) => {
                    const timmer = Number(objectEl.getAttribute('data-sourcepos'));
                    const contents = Array.from(objectTarget.childNodes);
                    const onlyText = contents.every(node =>
                        node.nodeType === 3 && node.nodeValue?.trim() !== ''
                    );

                    if (onlyText) {
                        const lines = objectEl.textContent?.split('\n') || [];
                        objectEl.innerHTML = lines
                          .map(line =>
                            Array.from(line).map(char =>
                              char === ' '
                                ? `<span class='letter space'>&nbsp;</span>`
                                : `<span class='letter'>${char}</span>`
                            ).join('')
                          ).join('<br>');
                      }

                    setTimeout(() => {
                        objectEl.classList.add('active');

                        if (objectEl.classList.contains('complete')) {
                            return;
                        }

                        if (onlyText) {
                            if (objectEl.classList.contains('complete')) return;

                            // anime.timeline({ loop: false }).add({
                            //   targets: objectEl.querySelectorAll('.letter'),
                            //   scale: [0.3, 1],
                            //   opacity: [0, 1],
                            //   translateZ: 0,
                            //   easing: 'easeOutExpo',
                            //   duration: 600,
                            //   delay: (_, i) => 7 * (i + 1),
                            //   complete: () => {
                            //     objectEl.classList.add('complete');
                            //   },
                            // });
                          }
                          else {
                            const onTransitionEnd = () => {
                              objectEl.classList.add('complete');
                              objectEl.removeEventListener('transitionend', onTransitionEnd);
                            };
                            objectEl.addEventListener('transitionend', onTransitionEnd);
                          }
                    }, timmer * 350);
                });
            });
        }, time);
    }

    useEffect(() => {
        document.querySelectorAll('.step01').forEach((object) => {
            object.classList.add('active');
        });

        sourcepos('.step01.active', 300);
    }, []);

    return (
        <>
            <Layout type="fixed">
                <div className="chatProdArea">
                    <div className="chatHead">
                        <div className="character"></div>
                        <div className="msgArea">
                            <div className="msgBalloon">
                                <div className="msg step01"><div data-sourcepos="0.5">분석을 진행 하는 동안 나가도 괜찬아요! 완료되면 알려드릴게요</div></div>
                                <div className="msg step02"><div data-sourcepos="1">리코가 질문에 답을 하기 위해 열심히 고민하고 있어요!</div></div>
                                <div className="msg step03"><div data-sourcepos="1">리코가 분석한 자료를 바탕으로 맞춤 추천설계를 준비완료했어요!</div></div>
                                <div className="msg step04"><div data-sourcepos="0.5">설계를 선택하셨어요! 빠진 부분이 없는지 한번 더 확인해주세요</div></div>
                            </div>
                        </div>
                    </div>
                    <div className="chatCont">
                        <div className="chartMsgCont">
                            <div className="chartMsgItem step01">
                                <div className="topTitle">
                                    <strong className="hTit" data-sourcepos="2" data-next-text="분석완료" data-next-time="0.5">
                                        <span className="hTitSpan" data-sourcepos="2">질문 분석중</span>
                                        <div className="loadingDots" data-sourcepos="2">
                                            <span>.</span>
                                            <span>.</span>
                                            <span>.</span>
                                        </div>
                                    </strong>
                                </div>
                                <div className="analyzeBoxArea">
                                    <div className="analyzeBox"  data-sourcepos="3">
                                        <dl className="analyzeDefine">
                                            <dt data-sourcepos="3.5" data-next-text="“암, 5~15만원 가입설계 시작해줘”"  data-next-time="1.5">“암, 5~15만원 가입설계 시작해줘”</dt>
                                            <dd data-sourcepos="4" data-next-text="설계 분석이 완료되었어요"  data-next-time="2.5">열심히 답변을 준비하고 있어요</dd>
                                        </dl>
                                        <div className="btnArea">
                                            <a href="#" className="btns btnCol02 md view pause" data-sourcepos="4.5"  data-next-time="4">
                                                <span data-next-text="생각과정 보기" data-sourcepos="4.7"  data-next-time="4">중지하기</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="analyzeView" data-sourcepos="5">
                                        <div className="analyzeViewInner">
                                            <div className="titSearch" data-sourcepos="5.5">리코의 생각과정</div>
                                            <div className="alnalyzeProgress">
                                                <div className="progressLine">
                                                    <div className="bar" style={{"height" : "0%"}}></div>
                                                </div>
                                                <div className="progressView">
                                                    <dl className="defineList" data-sourcepos="6">
                                                        <dt data-sourcepos="6">정보수집</dt>
                                                        <dd data-sourcepos="6.5">37세 남성 이생명 고객님께 꼭 필요한 보장을 현명하게 선택하실 수 있도록 포괄적인 정보를 분석합니다. 고객별 보장 분석, S-UW 조회, 영업 전략, 마이플랜, 질병 예측 모델 등을 종합적 으로 검토해 고객님께 가장 적합한 최적의 설계를 제안해 드릴게요.</dd>
                                                    </dl>
                                                    <dl className="defineList" data-sourcepos="8">
                                                        <dt data-sourcepos="8">스마트 보장 분석</dt>
                                                        <dd  data-sourcepos="8.5">이생명 고객님은 3건을 유지하며 월 210,346원을 아주 잘 납입하고 계시네요. 보험가입수준은 대한민국 37세 남성중에 백분위 60%수준에 해당해요. 사망, 장해등의 보장은 같은 연령대의 다른 고객들에 비해 매우 잘 준비하셨어요. 그런데 안타깝게도 보장항목별 중요도에 따라 분석한 결과 43점으로 또래 평균대비 12점이 낮으세요. 특히 암, 뇌, 심장질환에 대한 진단금은 아직 부족한것으로 보이네요.</dd>
                                                    </dl>
                                                    <div className="peopleInfoSwiper">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide" data-sourcepos="12">
                                                                <div className="peopleInfoCont">
                                                                    <div className="info">
                                                                        <dl>
                                                                            <dt data-sourcepos="12.5">이생명 고객님</dt>
                                                                            <dd data-sourcepos="13">전문직업 / 30세 / 남자</dd>
                                                                        </dl>
                                                                        <div className="photo" data-sourcepos="13.5"><img src="/public/images/mobile/img_people.png" alt="" /></div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <dl>
                                                                            <dt data-sourcepos="14">보험계약</dt>
                                                                            <dd data-sourcepos="14.5"><em>3</em>건</dd>
                                                                        </dl>
                                                                        <dl>
                                                                            <dt data-sourcepos="15">월보험료</dt>
                                                                            <dd data-sourcepos="15.5"><em>210,346</em>원</dd>
                                                                        </dl>
                                                                    </div>
                                                                </div>
                                                                <div className="peopleInfobtm">
                                                                    <div className="option" data-sourcepos="15">30대 남자 평균 보험료 약 20만원</div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide" data-sourcepos="14">
                                                                <div className="peopleInfoCont">
                                                                    <div className="info">
                                                                        <dl>
                                                                            <dt>이생명 고객님</dt>
                                                                            <dd>전문직업 / 30세 / 남자</dd>
                                                                        </dl>
                                                                        <div className="photo"><img src="/public/images/mobile/img_people.png" alt="" /></div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <dl>
                                                                            <dt>보험계약</dt>
                                                                            <dd><em>3</em>건</dd>
                                                                        </dl>
                                                                        <dl>
                                                                            <dt>월보험료</dt>
                                                                            <dd><em>210,346</em>원</dd>
                                                                        </dl>
                                                                    </div>
                                                                </div>
                                                                <div className="peopleInfobtm">
                                                                    <div className="option">30대 남자 평균 보험료 약 20만원</div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide" data-sourcepos="14">
                                                                <div className="peopleInfoCont">
                                                                    <div className="info">
                                                                        <dl>
                                                                            <dt>이생명 고객님</dt>
                                                                            <dd>전문직업 / 30세 / 남자</dd>
                                                                        </dl>
                                                                        <div className="photo"><img src="/public/images/mobile/img_people.png" alt="" /></div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <dl>
                                                                            <dt>보험계약</dt>
                                                                            <dd><em>3</em>건</dd>
                                                                        </dl>
                                                                        <dl>
                                                                            <dt>월보험료</dt>
                                                                            <dd><em>210,346</em>원</dd>
                                                                        </dl>
                                                                    </div>
                                                                </div>
                                                                <div className="peopleInfobtm">
                                                                    <div className="option">30대 남자 평균 보험료 약 20만원</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pagination" data-sourcepos="16"></div>
                                                    </div>
                                                    <dl className="defineList" data-sourcepos="16.5">
                                                        <dt data-sourcepos="16.5">추천설계 준비완료</dt>
                                                        <dd data-sourcepos="17">리코가 보장분석을 분석한 자료를 바탕으로 추천 설계를 준비완료했어요!</dd>
                                                    </dl>
                                                    <dl className="defineList02" data-sourcepos="17.5">
                                                        <dt data-sourcepos="17.5">추천 보장항목</dt>
                                                        <dd data-sourcepos="18">#일반사망 #일반암진단금 #급성심금경색 진단금 #뇌혈관진단금</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="chartMsgItem step02">
                                <div className="topTitle">
                                    <strong className="hTit" data-sourcepos="1">
                                        <span className="hTitSpan" data-sourcepos="1">최적의 설계 구성중</span>
                                        <div className="loadingDots" data-sourcepos="1">
                                            <span>.</span>
                                            <span>.</span>
                                            <span>.</span>
                                        </div>
                                    </strong>
                                </div>
                            </div>

                            <div className="chartMsgItem step03">
                                <div className="topTitle">
                                    <strong className="hTit" data-sourcepos="1">추천설계</strong>
                                </div>
                                <div className="recommInfoBox" data-sourcepos="1.5">
                                    <div className="recommInfoHead" data-sourcepos="2">
                                        <dl>
                                            <dt data-sourcepos="2.5">설계안내</dt>
                                            <dd data-sourcepos="3">이생명님께 해당 설계를 추천드려요</dd>
                                        </dl>
                                    </div>
                                    <div className="recommInfoCont" data-sourcepos="3.5">
                                        <dl className="item" data-sourcepos="3.5">
                                            <dt data-sourcepos="3.5">고객 개인화 추천</dt>
                                            <dd data-sourcepos="4">현재 고객님의 부족한 일반암 진단비 5,000만원과 뇌혈관 진단비를 원하신 점을 반영하여 설계하였습니다. 추가로, AI 질병 예측 모델에서 뇌혈관 질환 발병 가능성을 63%로 높게 예측하여 뇌혈관 질환에 대해 충분한 보장을 받을 수 있는 방향으로 설계하였습니다.</dd>
                                        </dl>
                                        <dl className="item" data-sourcepos="6.5">
                                            <dt data-sourcepos="6.5">설계사 선호</dt>
                                            <dd data-sourcepos="7">전사 우수 설계사들이 비슷한 보장 상태와 보장 니즈를 가진 고객에게 가장 많이 추천한 조합입니다. 일반암 진단금 강화와 뇌혈관 진단 보장을 핵심으로 구성되었으며, 실제 계약 체결률과 유지율이 가장 우수한 방향으로 설계하였습니다.</dd>
                                        </dl>
                                        <dl className="item" data-sourcepos="9.5">
                                            <dt data-sourcepos="9.5">회사 전략 추천</dt>
                                            <dd data-sourcepos="10">현재 부족한 일반암 보장과 선택하신 뇌혈관질환 진단 보장을 함께 반영하기 위해, 회사 판매 전략에 따른 우선순위 분석 결과 해당 특약 조합이 1순위로 확인되었습니다. 이에 따라 계약체결률과 고객님의 니즈를 모두 충족할 수 있도록 최적의 방향으로 설계하였습니다.</dd>
                                        </dl>
                                        <div className="chartGraphSwiper">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide" data-sourcepos="12">
                                                    <div className="head">
                                                        <div className="title" data-sourcepos="12.5">고객 개인화 추천</div>
                                                        <dl className="price">
                                                            <dt data-sourcepos="13">매월</dt>
                                                            <dd data-sourcepos="13.5"><em>234,520</em> 원</dd>
                                                        </dl>
                                                    </div>
                                                    <div className="cont">
                                                        <div className="chart" data-sourcepos="14"><img src="/public/images/mobile/img_chart01.png" alt="" /></div>
                                                        <a href="#" className="btns btnLine01 md"  data-sourcepos="14.5">
                                                            <span>선택하기</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide" data-sourcepos="12">
                                                    <div className="head">
                                                        <div className="title" data-sourcepos="12.5">설계사 선호</div>
                                                        <dl className="price">
                                                            <dt data-sourcepos="13">매월</dt>
                                                            <dd data-sourcepos="13.5"><em>182,600</em> 원</dd>
                                                        </dl>
                                                    </div>
                                                    <div className="cont">
                                                        <div className="chart" data-sourcepos="14"><img src="/public/images/mobile/img_chart02.png" alt="" /></div>
                                                        <a href="#" className="btns btnLine01 md" data-sourcepos="14.5">
                                                            <span>선택하기</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide" data-sourcepos="12">
                                                    <div className="head">
                                                        <div className="title" data-sourcepos="12.5">회사 전략 추천</div>
                                                        <dl className="price">
                                                            <dt data-sourcepos="13">매월</dt>
                                                            <dd data-sourcepos="13.5"><em>127,890</em> 원</dd>
                                                        </dl>
                                                    </div>
                                                    <div className="cont">
                                                        <div className="chart" data-sourcepos="14"><img src="/public/images/mobile/img_chart03.png" alt="" /></div>
                                                        <a href="#" className="btns btnLine01 md" data-sourcepos="14.5">
                                                            <span>선택하기</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pagination" data-sourcepos="15.5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="chartMsgItem step04">
                                <div className="topTitle">
                                    <strong className="hTit" data-sourcepos="0.5">선택설계</strong>
                                </div>
                                <div className="prodItemListBox" data-sourcepos="1">
                                    <div className="prodItemHead">
                                        <div className="title" data-sourcepos="1">고객 개인화 추천</div>
                                        <dl className="price">
                                            <dt data-sourcepos="1.5">매월</dt>
                                            <dd data-sourcepos="2"><em>42,030</em> 원</dd>
                                        </dl>
                                        <div className="label" data-sourcepos="1">
                                            <span>선택완료</span>
                                        </div>
                                    </div>
                                    <div className="prodItemCont" data-sourcepos="2.2">
                                        <div className="item" data-sourcepos="2.5">
                                            <div className="name" data-sourcepos="2.5">신한통합건강보장보험 원 (ONE) 무배당, 해약환급미지급형</div>
                                            <dl className="price">
                                                <dt data-sourcepos="3.5">보험료</dt>
                                                <dd data-sourcepos="4"><em>42,030</em> 원</dd>
                                            </dl>
                                        </div>
                                        <div className="item" data-sourcepos="4.5">
                                            <div className="name" data-sourcepos="4.5">신한통합건강보장보험 원 (ONE) 무배당, 해약환급미지급형</div>
                                            <dl className="price">
                                                <dt data-sourcepos="5.5">보험료</dt>
                                                <dd data-sourcepos="6"><em>42,030</em> 원</dd>
                                            </dl>
                                        </div>
                                        <div className="item" data-sourcepos="6.5">
                                            <div className="name" data-sourcepos="6.5">신한통합건강보장보험 원 (ONE) 무배당, 해약환급미지급형</div>
                                            <dl className="price">
                                                <dt data-sourcepos="7.5">보험료</dt>
                                                <dd data-sourcepos="8"><em>42,030</em> 원</dd>
                                            </dl>
                                        </div>
                                        <div className="item">
                                            <div className="name" data-sourcepos="8.5">신한통합건강보장보험 원 (ONE) 무배당, 해약환급미지급형</div>
                                            <dl className="price">
                                                <dt data-sourcepos="9.5">보험료</dt>
                                                <dd data-sourcepos="10"><em>42,030</em> 원</dd>
                                            </dl>
                                        </div>
                                        <div className="btnArea">
                                            <a href="#" className="btns btnLine01 md" data-sourcepos="11">
                                                <span>반영하기</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btnCtrlMove">
                            <button className="btnMove up">
                                <span>위로 이동</span>
                            </button>
                            <button className="btnMove down">
                                <span>아래로 이동</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Analyze;