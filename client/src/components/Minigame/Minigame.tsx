import "./minigame.scss"
import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useAppSelector, useAppDispatch } from 'app/store';
import { Modal } from 'antd';

import { Game_1 } from "./Game_1"
import { Game_2 } from "./Game_2"
import { Game_3 } from "./Game_3"
import { GET_PATIENT_PROFILE, GET_GAME } from './schema';
import { updateGame, updateId } from 'app/game';

//icon

import { TrophyOutlined } from '@ant-design/icons';

const { confirm } = Modal

export default function Minigame() {
    const dispatch = useAppDispatch();
    const userAccountInfo = useAppSelector((state) => state.account);
    const gameInfo = useAppSelector((state) => state.game);
    const [id, setId] = React.useState("")
    const [getGame, { data: game }] = useLazyQuery(GET_GAME);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);

    React.useEffect(() => {
        if (userAccountInfo.role && userAccountInfo.id) {
            if (userAccountInfo.role == "patient") {
                getPatientProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
            }
        }
    }, [userAccountInfo.role]);

    React.useEffect(() => {
        if (patientProfile && patientProfile.getPatient.games) {
            dispatch(
                updateId({
                    nth: 1,
                    totalScore: 0,
                    totalTime: 0,
                    gamePass: [],
                    gameTime: [],
                    gameId: patientProfile.getPatient.games,
                })
            )
            dispatch(
                updateGame({
                    nth: 1,
                    totalScore: 0,
                    totalTime: 0,
                    gamePass: [false, false, false, false, false],
                    gameTime: [0, 0, 0, 0, 0],
                    gameId: [],
                })
            )
        }
    }, [patientProfile])

    function play() {
        if (gameInfo.gameId) {
            if (patientProfile.getPatient.games.length < 5) {
                showAlertOfNotEnoughGame()
            } else {
                if (gameInfo.nth > 4) {
                    setId("")
                } else {
                    const id = gameInfo.gameId[Math.floor(Math.random() * gameInfo.gameId.length)]
                    setId(id)
                    dispatch(
                        updateId({
                            nth: 1,
                            totalScore: 0,
                            totalTime: 0,
                            gamePass: [],
                            gameTime: [],
                            gameId: gameInfo.gameId.filter((e: string) => e != id),
                        })
                    )


                }
            }

        }

    }

    React.useEffect(() => {
        if (id != "") {
            getGame({
                variables: {
                    id: id
                }
            })
            console.log(id);
        } else {
            if (gameInfo.nth > 4) {
                showConfirm()
                dispatch(
                    updateGame({
                        nth: 1,
                        totalScore: 0,
                        totalTime: 0,
                        gamePass: [false, false, false, false, false],
                        gameTime: [0, 0, 0, 0, 0],
                        gameId: [],
                    })
                )
                dispatch(
                    updateId({
                        nth: 1,
                        totalScore: 0,
                        totalTime: 0,
                        gamePass: [],
                        gameTime: [],
                        gameId: patientProfile.getPatient.games,
                    })
                )
            }
        }
    }, [id])

    function showAlertOfNotEnoughGame() {
        confirm({
            title: `Xin lỗi`,
            icon: <TrophyOutlined />,
            content:
                <div>
                    Hiện tại chưa đủ game, mời quay lại sau
                </div>,
            onOk() {
                ///
            },
            onCancel() {
                ///
            },
        });
    }

    function showConfirm() {
        confirm({
            title: `Cũng không tồi đấy chứ ^_^!`,
            icon: <TrophyOutlined />,
            content:
                <div>
                    <span>Điểm của bạn là {gameInfo.totalScore}{"("}{gameInfo.totalTime}s{")"}.</span><br />
                    <span>Bạn có muốn gửi kết quả tới bác sĩ ?</span><br />
                    <span>Số màn qua: {gameInfo.gamePass.filter((e) => e).length}</span><br />
                    <span>Chi tiết từng màn: </span><br />
                    <span>Màn 1: {gameInfo.gamePass[0] ? "Qua" : "Không qua"}{"("}{gameInfo.gameTime[0]}s{")"}</span><br />
                    <span>Màn 2: {gameInfo.gamePass[1] ? "Qua" : "Không qua"}{"("}{gameInfo.gameTime[1]}s{")"}</span><br />
                    <span>Màn 3: {gameInfo.gamePass[2] ? "Qua" : "Không qua"}{"("}{gameInfo.gameTime[2]}s{")"}</span><br />
                    <span>Màn 4: {gameInfo.gamePass[3] ? "Qua" : "Không qua"}{"("}{gameInfo.gameTime[3]}s{")"}</span><br />
                    <span>Màn 5: {gameInfo.gamePass[4] ? "Qua" : "Không qua"}{"("}{gameInfo.gameTime[4]}s{")"}</span>
                </div>,
            onOk() {
                ///
            },
            onCancel() {
                ///
            },
        });
    }

    // function SwitchGame(e: React.MouseEvent<HTMLDivElement>) {
    //     const buttons = document.querySelectorAll(".minigame_switch_item")
    //     const contents = document.querySelectorAll(".minigame_content_item")
    //     const switchcar = document.querySelector(".minigame_switch")
    //     const contentcar = document.querySelector(".minigame_content")

    // if (contentcar) {
    //     contentcar.classList.remove("minigame_hidden")
    // }
    // if (switchcar && !switchcar.classList.contains("minigame_hidden")) {
    //     switchcar.classList.add("minigame_hidden")
    // }
    // if (contents) {
    //     contents.forEach((content: Element, index: number) => {
    //         if (!content.classList.contains("minigame_hidden")) {
    //             content.classList.add("minigame_hidden")
    //         }
    //         content.setAttribute("style", "z-index:0")
    //     })
    // }
    //     if (buttons && contents) {
    //         const sw = document.querySelector(".minigame_switch")
    //         buttons.forEach((button: Element, index: number) => {
    //             if (e.currentTarget == button && sw && sw.firstElementChild) {
    //                 if (contents[index]) {
    //                     contents[index].classList.remove("minigame_hidden")
    //                     contents[index].setAttribute("style", "z-index:5")
    //                 }
    //             }
    //         })
    //     }
    // }

    if (game && game.getGame) {
        console.log(game.getGame.type);
    }

    return (<div className='minigame_all'>
        <div className="minigame_background"></div>
        <div className="minigame_carry minigame_column">
            <div className={`minigame_begin ${id == "" ? "" : "minigame_hidden"}`} >
                <div className="minigame_title">
                    Đây là bài test dành cho bạn
                </div>
                <div className="minigame_title">
                    Bấm để chơi
                </div>
                <div className="minigame_playbutton" onClick={play}>
                    Play
                </div>
            </div>
            {/* <div className="minigame_switch">
                <div className="minigame_row mg_juround" style={{ position: "absolute", width: "100%" }}>
                    <div className="minigame_switch_item" onClick={SwitchGame}><BiHome className="minigame_switch_icon" /><span className="minigame_switch_text">&nbsp;&nbsp;Tap Tap</span></div>
                    <div className="minigame_switch_item" onClick={SwitchGame}><BiCategory className="minigame_switch_icon" /><span className="minigame_switch_text">&nbsp;&nbsp;Dash Dash</span></div>
                    <div className="minigame_switch_item" onClick={SwitchGame}><BiBoltCircle className="minigame_switch_icon" /><span className="minigame_switch_text">&nbsp;&nbsp;Dash Dash</span></div>
                </div>
            </div> */}
            {game && game.getGame.type == 1 && (
                <div className={`minigame_content ${id == "" ? "minigame_hidden" : ""}`} >
                    <div className="minigame_content_item">
                        {patientProfile && patientProfile.getPatient && <Game_1 id={id} play={play} />}
                    </div>
                </div>
            )}
            {game && game.getGame.type == 2 && (
                <div className={`minigame_content ${id == "" ? "minigame_hidden" : ""}`}>
                    <div className="minigame_content_item">
                        {patientProfile && patientProfile.getPatient && <Game_2 id={id} play={play} />}
                    </div>
                </div>
            )}
            {game && game.getGame.type == 3 && (
                <div className={`minigame_content ${id == "" ? "minigame_hidden" : ""}`}>
                    <div className="minigame_content_item">
                        {patientProfile && patientProfile.getPatient && <Game_3 id={id} play={play} />}
                    </div>
                </div>
            )}
        </div>
    </div>)
}