import './addition.scss'
import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom';
import PhysicalTherapy from './PhysicalTherapy';
import FirstAid from './FristAid';
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import StrokePrevention from './StrokePrevention'
import Nutrition from './Nutrition'
import {useAppDispatch} from 'app/store'
import * as GreetingBot from 'app/GreetingBot';
import Abstract14 from 'assets/abstract14.png'



function Addition(): ReactElement {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(GreetingBot.setGreetingName(GreetingBot.GreetingNameType.Addition))
    }, [])

    return (
        <div className="Addition">
            <Header></Header>
            <div className="AdditionContent">
            <img src={Abstract14} alt="" className="newsBackground" />
                <Switch>
                    <Route path="/ho-tro/che-do-dinh-duong" component={Nutrition} />
                    <Route path="/ho-tro/giai-phap-phong-ngua" component={StrokePrevention} />
                    <Route path="/ho-tro/vat-ly-tri-lieu" component={PhysicalTherapy} />
                    <Route path="/ho-tro/so-cuu" component={FirstAid} />
                </Switch>
            </div>
            <Footer></Footer>
        </div>
    )
}

export function IframeItem({ link, title }: { link: string, title: string }) {
    return (
        <div className="iframe_item">
            <iframe src={link} className="iframe" />
            <div className="titleContainer">
                <div className="title">
                    {title}
                </div>
            </div>

        </div>
    )
}

export default Addition
