import React, { ReactElement } from 'react'
import { IframeItem } from './Addition'


function FristAid(): ReactElement {
    return (
        <div className="Exercise VideoPage">
            <div className="pageHeader">
                <div className="pageTitle">
                    Sơ cứu người bị đột quỵ
                </div>
            </div>
            <IframeItem
                link={`https://www.youtube.com/embed/2BVDyLyebig`}
                title="Hướng dẫn sơ cứu người bị đột quỵ tại nhà" />
            <IframeItem
                link={`https://www.youtube.com/embed/O8ACLEyuRc4`}
                title="8 BƯỚC SƠ CỨU KHẨN CẤP NGƯỜI BỊ ĐỘT QUỴ, VÀI PHÚT NGẮN NGỦI GIÚP BẠN CỨU SỐNG CẢ MẠNG NGƯỜI" />
            <IframeItem
                link={`https://www.youtube.com/embed/Mdy19UxHWR4`}
                title="(VTC14)_ Nhận biết và sơ cứu đột quỵ" />
            <IframeItem
                link={`https://www.youtube.com/embed/OGNLpIxtCls`}
                title="Chuyên gia hướng dẫn sơ cứu người đái tháo đường bị đột quỵ tại nhà" />
            <IframeItem
                link={`https://www.youtube.com/embed/6mPCCeqCYrw`}
                title="Bài tập cho người sau đột quỵ yếu liệt một bên| liệt nửa người sau tai biến" />
            <IframeItem
                link={` https://www.youtube.com/embed/SKs8EKh_3SQ`}
                title="Kỹ năng sơ cứu người bệnh đột quỵ | UMC | Bệnh viện Đại học Y Dược TPHCM" />

        </div>
    )
}

export default FristAid
