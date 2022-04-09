import React, { ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from 'app/store';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_GAME, UP_GAME } from './schema';
import { Modal } from 'antd';

// icon

import { BiRightArrow } from 'react-icons/bi';
import { GiPauseButton } from 'react-icons/gi';
import { MdRestartAlt } from 'react-icons/md';
import { AiOutlineSound } from 'react-icons/ai';
import { TrophyOutlined } from '@ant-design/icons';
import { updateGame } from 'app/game';

const { confirm } = Modal

interface BoxElementProps {
    numberE: number;
}
interface Game_2Props {
    id: string;
    play: () => void;
}
//selectNum do not bigger than numberE

export const Game_2: React.FC<Game_2Props> = ({ id, play }) => {
    const [getGame, { data: game }] = useLazyQuery(GET_GAME);
    const gameInfo = useAppSelector((state) => state.game);
    const [upGame] = useMutation(UP_GAME)
    const dispatch = useAppDispatch()


    React.useEffect(() => {
        if (id) {
            getGame({
                variables: {
                    id: id
                }
            })
        }
    }, [])

    React.useEffect(() => {
        gameApply()
        setShouldPlay(1)
    }, [game])

    const [score, setScore] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [hc, setHC] = React.useState(0)
    const [ht, setHT] = React.useState(0)
    const [numberE, setNumberE] = React.useState(0)
    const [selectNum, setSelectNum] = React.useState(0)
    const [wrongCount, setWrongCount] = React.useState(3)
    const [pertime, setPertime] = React.useState<number[]>([])

    const [isTrueElement, setIsTrueElement] = React.useState<boolean[]>([])
    const [ans, setAns] = React.useState<string[]>([])
    const [isPicked, setIsPicked] = React.useState<boolean[]>([])
    const [isInit, setIsInit] = React.useState(false)

    const playNoti = React.useRef<HTMLDivElement>(null)
    const playButton = React.useRef<HTMLDivElement>(null)
    const stopButton = React.useRef<HTMLDivElement>(null)

    const audio = React.useRef<HTMLAudioElement>(null)

    // game property
    //--------------------------------------------------------------------------------------------------------

    const [shouldPlay, setShouldPlay] = React.useState(0) // 0: stop, reset score , 1: play , 2: stop, not reset
    const [playTime, setPlaytime] = React.useState(10) // set default playtime per level here
    const [levelNum, setLevelNum] = React.useState(0) // number of levels to play

    function mediaPlay() {
        //set media play
        if (audio && audio.current && audio.current.paused) {
            audio.current.play()
        } else
            if (audio && audio.current && audio.current.played) {
                audio.current.pause()
            }
    }

    // set mode on number of text can pick, number of text should be select
    function gameApply() {
        setWrongCount(1)
        setSelectNum(1)
        setNumberE(4)
        setIsInit(!isInit)
    }

    // cumstom element, do not change classname!(can add)
    const BoxElement: React.FC<BoxElementProps> = ({ numberE }) => {
        function clickBox(e: React.MouseEvent) {
            if (shouldPlay == 1) {
                const allElement = document.querySelectorAll(`.game_2_item`)
                allElement.forEach((element, i) => {
                    if (e.currentTarget == element) {
                        if (isPicked[i]) {
                            isPicked[i] = false
                        } else {
                            isPicked[i] = true
                        }
                        if (isTrueElement[i] && isPicked[i]) {
                            setSelectNum(selectNum - 1)
                            if (playNoti && playNoti.current && !playNoti.current.classList.contains("minigame_hidden")) {
                                playNoti.current.classList.add("minigame_hidden")
                            }
                            setScore(score + 10)
                        }
                        if (isTrueElement[i] && !isPicked[i]) {
                            setSelectNum(selectNum + 1)
                            setScore(score - 10)
                        }
                        if ((!isTrueElement[i] && isPicked[i])) {
                            if (playNoti && playNoti.current) {
                                playNoti.current.classList.remove("minigame_hidden")
                                playNoti.current.innerText = "Sai rồi"
                            }
                            setWrongCount(wrongCount - 1)
                            setScore(score - 5)
                        }
                        setIsTrueElement(isTrueElement)
                        setIsPicked(isPicked)
                    }
                })
            }
        }
        return <>
            {isTrueElement.map((element, i) => {
                if (element) {
                    return (
                        // <>
                        <div className={`game_2_item game_2_item_true ${isPicked[i] ? "game_2_item_picked" : ""} ${shouldPlay == 0 ? "minigame_hidden" : ""}`} key={i} onClick={clickBox}>
                            {ans[i]}
                        </div>
                        // {i < isTrueElement.length / 2 && i > isTrueElement.length / 2 - 1 && <br />}</>
                    )
                } else {
                    return (
                        // <>
                        <div className={`game_2_item ${isPicked[i] ? "game_2_item_picked" : ""} ${shouldPlay == 0 ? "minigame_hidden" : ""}`} key={i} onClick={clickBox}>
                            {ans[i]}
                        </div>
                        // {i < isTrueElement.length / 2 && i > isTrueElement.length / 2 - 1 && <br />}</>
                    )
                }
            })}
        </>
    }


    function initElement(numberE: number, selectNum: number) {
        const elements: boolean[] = []
        const answer: string[] = []
        let index = 0
        for (let i = 0; i < numberE; i++) {
            elements.push(false)
            answer.push("")
        }
        for (let i = 0; i < selectNum; i++) {
            let elementIndex = 0
            elementIndex = Math.floor(Math.random() * numberE)
            while (elements[elementIndex] == true && elementIndex >= 0) {
                elementIndex = Math.floor(Math.random() * numberE)
            }
            elements[elementIndex] = true
            if (game && game.getGame.options) {
                answer[elementIndex] = game.getGame.options[game.getGame.answer]
                // fix here if more than 1 answer
            }
            // set true element
        }
        for (let i = 0; i < elements.length; i++) {
            if (game && game.getGame.options && answer[i] == "") {
                if (index == game.getGame.answer) { index++ } // fix here if more than 1 answer
                answer[i] = game.getGame.options[index]
                index += 1
            }
        }
        setIsPicked(elements.map(() => false))
        setIsTrueElement(elements)
        if (game && game.getGame.options) {
            setAns(answer)
        }
    }

    function showConfirm() {
        confirm({
            title: `Cũng không tồi đấy chứ ^_^!`,
            icon: <TrophyOutlined />,
            content: `Điểm của bạn là ${score}(${pertime.reduce(add, 0)}s). Bạn có muốn gửi kết quả tới bác sĩ ?`,
            onOk() {
                ///
            },
            onCancel() {
                ///
            },
        });
    }

    //--------------------------------------------------------------------------------------------------------

    //game actions
    React.useEffect(() => {
        if (wrongCount <= 0) {
            if (playNoti && playNoti.current) {
                playNoti.current.classList.remove("minigame_hidden")
                playNoti.current.innerText = "Trò chơi kết thúc"

                const useTime: number[] = pertime
                useTime.push(playTime - time)
                setPertime(useTime)

                next(false)
            }
            switchPlayButton()

            setShouldPlay(0)
            setSelectNum(0)
            setNumberE(0)
            setScore(0)
        }
    }, [wrongCount])
    React.useEffect(() => {
        if (selectNum == 0 && numberE > 0) {
            if (playNoti && playNoti.current) {
                playNoti.current.classList.remove("minigame_hidden")
                if (levelNum > 0) {
                    playNoti.current.innerText = "Qua màn"
                    const useTime: number[] = pertime
                    useTime.push(playTime - time)

                    setLevelNum(levelNum - 1)
                    setPertime(useTime)
                    next(true)
                    setShouldPlay(2)
                } else {
                    playNoti.current.innerText = "Chiến thắng"

                    switchPlayButton()
                    next(true)
                    setShouldPlay(0)
                }
            }
            if (time <= 0 && wrongCount <= 0) {
                switchPlayButton()
            }
            if (levelNum > 0) {
                setTimeout(() => {
                    gameApply()
                    setTime(playTime)
                    setShouldPlay(1)
                }, 1000);
            }
        }
    }, [selectNum])

    React.useEffect(() => {
        if (numberE >= selectNum)
            initElement(numberE, selectNum)
    }, [isInit])

    React.useEffect(() => {
        switch (shouldPlay) {
            case 0:
                setTime(0)
                break;
            case 1:
                setTime(time < 1 ? playTime : time - 1)
                break;
            default:
                break;
        }
    }, [shouldPlay])
    React.useEffect(() => {
        switch (shouldPlay) {
            case 0:
                setTime(0)
                break;
            case 1:
                if (time > 0) {
                    setTimeout(() => {
                        setTime(time - 1)
                    }, 1000);
                } else {
                    if (playNoti && playNoti.current) {
                        playNoti.current.classList.remove("minigame_hidden")
                        playNoti.current.innerText = "Trò chơi kết thúc"

                        const useTime: number[] = pertime
                        useTime.push(playTime)
                        setPertime(useTime)

                        next(false)
                    }
                    switchPlayButton()

                    setShouldPlay(0)
                    setSelectNum(0)
                    setNumberE(0)
                    setScore(0)
                }
                break;
            default:
                break;
        }
    }, [time])
    React.useEffect(() => {
        if (score > hc) {
            setHC(score)
            setHT(pertime.reduce(add, 0))
        }
    }, [score])

    function add(sum: number, num: number) {
        return sum + num;
    }

    function Time(time: number) {
        return time < 60 ? `${time} s` : `${Math.floor(time / 60)} : ${(time % 60)} s`
    }
    function startPlaying() {
        switchStopButton()
        if (playNoti && playNoti.current && !playNoti.current.classList.contains("minigame_hidden")) {
            playNoti.current.classList.add("minigame_hidden")
        }
        if (shouldPlay == 0) {
            gameApply()
            setScore(0)
            setPertime([])
        }
        setShouldPlay(1)
    }
    function stopPlaying() {
        switchPlayButton()
        if (playNoti && playNoti.current) {
            playNoti.current.classList.remove("minigame_hidden")
            playNoti.current.innerText = "Trò chơi đang dừng"
        }
        setShouldPlay(2)
    }
    function rePlaying() {
        switchPlayButton()
        if (playNoti && playNoti.current && !playNoti.current.classList.contains("minigame_hidden")) {
            playNoti.current.classList.add("minigame_hidden")
        }
        setShouldPlay(0)
        setSelectNum(0)
        setNumberE(0)
        setScore(0)
    }
    async function next(isPass: boolean) {
        if (gameInfo) {
            const pass = gameInfo.gamePass.map((element) => element)
            pass[gameInfo.nth - 1] = isPass

            const allTime = gameInfo.gameTime.map((element) => element)
            allTime[gameInfo.nth - 1] = playTime - time

            // upGame({
            //     variables: {
            //         id: id,
            //         type: 2,
            //         pass: isPass
            //     }
            // })
            await dispatch(
                updateGame({
                    nth: gameInfo.nth + 1,
                    totalScore: gameInfo.totalScore + score,
                    totalTime: gameInfo.totalTime + playTime - time,
                    gamePass: pass,
                    gameTime: allTime,
                    gameId: [],
                })
            )
            play()
        }

    }
    function switchPlayButton() {
        if (stopButton && stopButton.current && !stopButton.current.classList.contains("minigame_hidden")) {
            stopButton.current.classList.add("minigame_hidden")
        }
        if (playButton && playButton.current) {
            playButton.current.classList.remove("minigame_hidden")
        }
    }
    function switchStopButton() {
        if (stopButton && stopButton.current) {
            stopButton.current.classList.remove("minigame_hidden")
        }
        if (playButton && playButton.current && !playButton.current.classList.contains("minigame_hidden")) {
            playButton.current.classList.add("minigame_hidden")
        }
    }
    return (<>
        <div className="game_info mg_juround mg_alstart">
            {/* <div className="minigame_row mg_wrap">
                <div className="game_title">Độ khó:</div>
                <div className="game_text" style={{ width: "80px" }}>&nbsp;{`${Mode(mode)}`}</div>
                <div className="game_text" onClick={changeMode} style={{ cursor: "pointer" }}>&nbsp;<CgArrowsExchangeAltV /></div>
            </div> */}
            <div className="minigame_row mg_wrap">
                <div className="game_title">Điểm:</div>
                <div className="game_text">&nbsp;{`${gameInfo.totalScore}`}</div>
            </div>
            <div className="minigame_row mg_wrap">
                <div className="game_title">Màn:</div>
                <div className="game_text">&nbsp;{`${gameInfo.nth}`}</div>
            </div>
        </div>
        <div className="game_content">
            {/* <div className="game_button game_back" onClick={back}>
                Trở lại
            </div> */}
            <div className="minigame_column game_noti" style={{ marginBottom: "10px" }}>
                <div className="minigame_row" style={{ width: "100%" }}>
                    <div className="game_text">{game && (`${game.getGame.question}`)}</div>&nbsp;&nbsp;&nbsp;
                    <div className="game_title game_button" style={{ padding: "10px 20px" }} onClick={mediaPlay}><audio src={game && game.getGame.record} ref={audio} /><AiOutlineSound /></div>
                </div>
                <div className="game_text minigame_hidden" ref={playNoti}>Trò chơi đang dừng</div>
            </div>
            <div className="minigame_row minigame_game_2 mg_wrap mg_juround">
                <BoxElement numberE={numberE} />
            </div>
        </div>
        <div className="game_extension mg_juround">
            <div className="minigame_row mg_wrap">
                <div className="game_title">Thời gian còn:</div>
                <div className="game_text">&nbsp;{`${Time(time)}`}</div>
            </div>

            <div className="minigame_row mg_wrap mg_juround" style={{ width: "80%" }}>
                <div className="game_title game_button" ref={playButton} onClick={startPlaying}><BiRightArrow /></div>
                <div className="game_title game_button minigame_hidden" ref={stopButton} onClick={stopPlaying}><GiPauseButton /></div>
                <div className="game_title game_button" onClick={rePlaying}><MdRestartAlt /></div>
            </div>
        </div>
    </>)
}