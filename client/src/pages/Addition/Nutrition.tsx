import React, { ReactElement } from 'react'
import { IframeItem } from './Addition'

function Exercise(): ReactElement {
    return (
        <div className="Exercise VideoPage">
            <div className="pageHeader">
                <div className="pageTitle">
                    Chế độ dinh dưỡng cho người đột quỵ
                </div>
            </div>
            {/* <IframeItem
                link={`https://www.youtube.com/embed/6ANrTx9O4xs`}
                title="chế độ ăn uống, sinh hoạt sau đột quỵ"
            />

            <IframeItem
                link={`https://www.youtube.com/embed/o8mq4P2xBi0`}
                title="Chế độ dinh dưỡng cho bệnh nhân phục hồi sau đột quỵ"
            /> */}
            <IframeItem
                link={`https://www.youtube.com/embed/DhQEnCmI110`}
                title="XÂY DỰNG CHẾ ĐỘ DINH DƯỠNG HỢP LÝ CHO NGƯỜI ĐỘT QUỴ"
            />
            <IframeItem
                link={`https://www.youtube.com/embed/7ML-_YZbwak`}
                title="CHẾ ĐỘ DINH DƯỠNG CHO NGƯỜI BỊ ĐỘT QUỴ"
            />

        </div>
    )
}

export default Exercise
