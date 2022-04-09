import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import './robot.scss'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'

import Angry1 from '../../assets/emoji/angry1.svg';
import Funny1 from '../../assets/emoji/funny1.svg';
import Happy1 from '../../assets/emoji/happy1.svg';
import Happy2 from '../../assets/emoji/happy2.svg';
import Sad1 from '../../assets/emoji/sad1.svg';
import Sad2 from '../../assets/emoji/sad2.svg';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosBowtie } from 'react-icons/io';

import DoctorSVG from '../../assets/doctor_chibi.svg';

const arrIcon = [
    Angry1,
    Funny1,
    Happy1,
    Happy2,
    Sad1,
    Sad2
]

interface RobotType {
    isActive: boolean
}

function Robot(props: RobotType): ReactElement {
    const { isActive } = props;

    const [indexIcon, setIndexIcon] = React.useState(0);

    React.useEffect(() => {
        setNextIcon();
    }, [indexIcon])

    function setNextIcon() {
        let newIndex = indexIcon + 1;
        if (newIndex >= arrIcon.length) {
            newIndex = 0;
        }
        setTimeout(() => {
            setIndexIcon(newIndex)
        }, 2000)

    }

    const Icon = React.useMemo(() => (arrIcon[indexIcon]), [indexIcon]);


    const [positionHead, setPositionHead] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        randomPositionHead();
    }, [positionHead])

    function randomPositionHead() {
        const randomRange = 10;
        const x = Math.random() * randomRange - (randomRange / 2);
        const y = Math.random() * randomRange - (randomRange / 2);
        setTimeout(() => {
            setPositionHead({ x, y })
        }, 500)
    }

    const [positionBot, setPositionBot] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        randomPositionBot();
    }, [positionBot])

    function randomPositionBot() {
        const xRange = 8;
        const botRange = 10;
        const { x, y } = positionBot;

        let newX = 0;
        let newY = 0;
        if (y == botRange) {
            newY = -botRange;
        } else {
            newY = botRange;
        }
        newX = Math.random() * xRange - (xRange / 2);
        setTimeout(() => {
            setPositionBot({ x: newX, y: newY });
        }, 1000)
    }



    return (
        <div className="RobotElement">
            {/* <motion.div
                initial={{ x: 0, y: 0,  fontSize:"3em" }}
                animate={{...positionBot,fontSize: isActive ? "3em" : "1.5em"}}
                transition={{ type: "tween", duration: 1 }}
                className="robotWrapper">
                <motion.div
                    initial={{ x: 0, y: 0 }}
                    animate={positionHead}
                    transition={{ type: "tween", duration: 0.5 }}
                    className="robotHead">
                    <div className="face">
                        <img src={Icon} alt="" className="emoji" />
                    </div>
                </motion.div>
                <div className="robotBody">
                    <div className="bodyLogo">
                        <AiOutlinePlus />
                    </div>
                    <div className="tie">
                        <IoIosBowtie/>
                    </div>
                </div>
            </motion.div> */}

            <motion.div
                initial={{fontSize: "3em" }}
                animate={{ fontSize: isActive ? "3em" : "1.5em" }}
                transition={{ type: "tween", duration: 1 }}

                className="image_container">
                <img src={DoctorSVG} alt="" className="doctorImage" />
            </motion.div>
        </div>
    )
}

export default Robot
