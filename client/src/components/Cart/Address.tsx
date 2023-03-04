import { Link } from "react-router-dom"


export const CartAddress = (props) => {
    
    return(
        <div className="cart_address">
            <span className="title_flex">
                <h5 className="title">Thông Tin Giao Hàng</h5>
                <Link to="/record" className="cart_button">Thay đổi</Link>
            </span>
            <strong className="name_phone">{props?.name} {props?.phone}</strong>
            <p>{props?.address}</p>
            <span className="input">
                <p>Ghi chú:</p>
                <input type="text" placeholder="VD tên tòa nhà, khu vực..." />
            </span>
        </div>
    )
}