import { RiExchangeDollarFill } from "react-icons/ri"
import { Radio } from 'antd';

export const CartPayment = (props) => {
    
    return(
        <div className="cart_payment">
            <h5 className="title">Hình thức thanh toán</h5>
            <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1} className="cart_ratio">
                    <span className="input">
                        <RiExchangeDollarFill className="icon"/>
                        <span>
                            <p>Thanh toán khi nhận hàng (COD)</p>
                        </span>
                    </span>
                </Radio>
            </Radio.Group>
        </div>
    )
}