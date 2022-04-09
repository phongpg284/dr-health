import React from 'react'
import {IframeItem} from './Addition'

const Exercise = () => {
    return (
        <div className="Exercise VideoPage">
            <div className="pageHeader">
                <div className="pageTitle">
                Bài tập vật lý trị liệu
                </div>
            </div>
            <IframeItem
                link={`https://www.youtube.com/embed/4zNBswPDa_M`}
                title="Tập vật lý trị liệu cho người bệnh đột quỵ" />
            <IframeItem
                link={`https://www.youtube.com/embed/T2H8lLHaF5o`}
                title="Vật lý trị liệu, phục hồi chức năng cho bệnh nhân đột quỵ" />
            <IframeItem
                link={`https://www.youtube.com/embed/VHU3oPoMAsI`}
                title="Tập Vật Lý Trị Liệu dành cho người bị tai biến" />
            <IframeItem
                link={`https://www.youtube.com/embed/fJTwSM3y74o`}
                title="Các động tác phục hồi chức năng cho người bị đột quỵ não" />
        </div>
    )
}



export default Exercise
