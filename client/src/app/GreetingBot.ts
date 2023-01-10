import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const HomeMp3 = require('../assets/mp3/home_page.mp3').default;
// const LoginPageMp3 = require("../assets/mp3/login_page.mp3").defaut;

import HomeMp3 from '../assets/mp3/home_page.mp3'
import LoginPageMp3 from '../assets/mp3/login_page.mp3';
import NewsPageMp3 from '../assets/mp3/news-page.mp3'
import AdditionMp3 from '../assets/mp3/addition.mp3'
import StrokePointMp3 from '../assets/mp3/stroke-point.mp3'

export enum GreetingNameType {
    HomePage = "HomePage",
    LoginPage = "LoginPage",
    News = "News",
    Addition = "Addition",
    StrokePoint = "StrokePoint",
}

interface Greeting {
    name: GreetingNameType;
    text: string;
    repeat: number;
    mp3: string;
}

const greetings: Greeting[] = [
    {
        name: GreetingNameType.HomePage,
        text: "Chào mừng bạn đến với trang chủ",
        repeat: 0,
        mp3: HomeMp3
    },
    {
        name: GreetingNameType.LoginPage,
        text: "Đây là trang đăng nhập, hãy chọn đăng ký nếu bạn chưa có tài khoản",
        repeat: 0,
        mp3: LoginPageMp3
    },
    {
        name: GreetingNameType.News,
        text: "Đây là trang bản tin, nơi bạn có thể tìm thấy thông tin về bệnh đột quỵ",
        repeat: 0,
        mp3: NewsPageMp3
    },
    {
        name: GreetingNameType.Addition,
        text: "Đây là trang hỗ trợ, hãy xem các video hướng dẫn phòng chống bệnh đột quỵ",
        repeat: 0,
        mp3: AdditionMp3
    },
    {
        name: GreetingNameType.StrokePoint,
        text: "Đây là trang tính điểm đột quỵ dựa theo quy định của viện sức khỏe quốc gia hoa kỳ",
        repeat: 0,
        mp3: StrokePointMp3
    },
]

interface GreetingBot {
    data: Greeting[];
    greetingName?: GreetingNameType;
    setting: SettingBot;
}

interface SettingBot {
    enableBot: boolean;
    enableChat: boolean;
    enableSound: boolean;
    enableLoop: boolean;
}

const initialState: GreetingBot = {
    data: greetings,
    greetingName: undefined,
    setting: {
        enableBot: true,
        enableChat: false,
        enableSound: true,
        enableLoop: false,
    }
}

export const greetingBotSlice = createSlice({
    name: "greetingBot",
    initialState,
    reducers: {
        reset: (state) => {
            state.data = initialState.data;
            state.greetingName = initialState.greetingName;
            state.setting.enableSound = false;
            return state
        },
        setGreetingName: (state, action: PayloadAction<GreetingNameType>) => {
            for (const i in state.data) {
                if (action.payload === state.data[i].name) {

                    state.data[i].repeat++;
                    break;
                }
            }
            state.greetingName = action.payload;
            return state;
        },
        toggleBot: (state) => {
            state.setting.enableBot = !state.setting.enableBot;
            return state;
        },
        toggleChat: (state) => {
            state.setting.enableChat = !state.setting.enableChat;
            return state;
        },
        toggleSound: (state) => {
            state.setting.enableSound = !state.setting.enableSound;
            return state;
        },
        toggleLoop: (state) => {
            state.setting.enableLoop = !state.setting.enableLoop;
            return state;
        },


    },
});

export const { setGreetingName, reset, toggleBot, toggleChat, toggleSound, toggleLoop } = greetingBotSlice.actions
export default greetingBotSlice.reducer