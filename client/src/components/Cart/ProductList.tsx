import { RiExchangeDollarFill } from "react-icons/ri"
import { Radio } from 'antd';
import { Cart, ItemCart, updateItemCartSet } from 'app/cartSlice'
import { BiMinus } from "react-icons/bi";
import { HiMinusSm } from "react-icons/hi";
import { useState } from "react";
import { useAppSelector } from "app/store";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

function CartProductItem(props: {itemSelect: ItemCartSelected, key: number, line: boolean}) {
    const { itemSelect, key, line } = props;
    const { item, number } = itemSelect;
    
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useDispatch();

    function plusCount() {
        dispatch(updateItemCartSet({itemSelected: [...cart.itemSelected, item]}));
    }

    function minusCount() {
        const index = cart.itemSelected.findIndex((it) => it.title === item.title && it.pharmacies === item.pharmacies);
        const items: ItemCart[] = []

        cart.itemSelected.forEach((it, i) => {
            if (i == index) { return }
            items.push(it);
        })

        dispatch(updateItemCartSet({itemSelected: items}));
    }

    function deleteItem() {
        const items: ItemCart[] = []

        cart.itemSelected.forEach((it) => {
            if (it.title === item.title && it.pharmacies === item.pharmacies) {
                return
            }
            items.push(it);
        })

        dispatch(updateItemCartSet({itemSelected: items}));
    }
    
    return (
        <span className={"item " + (line ? "" : "item_line")}>
            <img src={item.image} className="icon"/>
            <div>
                <span className="item_name">
                    <p className="title">{item.title}</p>
                    <FaTimes className="close" onClick={deleteItem}/>
                </span>
                <span className="item_name" style={{marginLeft: "0", marginTop: "10px"}}>
                    <span className="item_number">
                        <BiMinus className="count" onClick={minusCount}/>
                        <div className="num_count">{number}</div>
                        <div className="count" onClick={plusCount}>+</div>    
                    </span>
                    <p className="item_price">{Number(item.price) * number}.000 {item.currency}</p>
                </span>
            </div>
        </span>
    )
}

export interface ItemCartSelected {
    item: ItemCart;
    number: number;
}

export const CartProductList = (props: {cart: Cart}) => {
    const items: ItemCartSelected[] = []

    for(let index = 0; index < props.cart.itemSelected.length; index++) {
        let bool = false
        for(let i = 0; i < items.length; i++) {
            if(items[i].item.title == props.cart.itemSelected[index].title && items[i].item.pharmacies == props.cart.itemSelected[index].pharmacies) {
                items[i].number += 1;
                bool = true
                break;
            }
        }
        if(!bool) { 
            items.push({item: props.cart.itemSelected[index], number: 1})
        }
    }

    return(
        <div className="cart_product_list">
            <h5 className="title">Danh sách sản phẩm</h5>
            {items.map((item, index) => (
                <CartProductItem key={index} itemSelect={item} line={index == (items.length - 1)}/>
            ))}
        </div>
    )
}