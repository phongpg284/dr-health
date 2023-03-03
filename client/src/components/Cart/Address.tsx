

export const CartAddress = (props) => {
    
    return(
        <div className="cart_address">
            <h5 className="title">Thông Tin Giao Hàng</h5>
            <strong className="name_phone">{props?.name} {props?.phone}</strong>
            <p>{props?.address}</p>
            <span className="input">
                <p>Ghi chú:</p>
                <input type="text" placeholder="VD tên tòa nhà, khu vực..." />
            </span>
        </div>
    )
}