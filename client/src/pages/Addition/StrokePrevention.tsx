import React, { ReactElement } from 'react'
import { IframeItem } from './Addition'

function Exercise(): ReactElement {
    return (
        <div className="Exercise VideoPage">
            <div className="pageHeader">
                <div className="pageTitle">
                    Giải pháp phòng ngừa đột quỵ hiệu quả
                </div>
            </div>
            <IframeItem
                link={`https://www.youtube.com/embed/NVKCgsOVedg`}
                title="Giải pháp phòng ngừa đột quỵ"
            />
             <IframeItem
                link={`https://www.youtube.com/embed/dIM3hyJN8nM`}
                title="Đột quỵ và phòng ngừa đột quỵ mùa COVID-19"
            />
             <IframeItem
                link={`https://www.youtube.com/embed/EhukwRwK_IM`}
                title="KIỂM SOÁT MỠ MÁU, CHẶN ĐỨNG NGUY CƠ ĐỘT QUỴ"
            />

        </div>
    )
}

export default Exercise
