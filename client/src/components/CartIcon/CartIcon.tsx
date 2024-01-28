import "./index.scss";

import { useEffect, useState } from "react";
import { Badge, Empty } from "antd";
import { useAppSelector } from "app/store";
import { Link, useNavigate } from "react-router-dom";
import { ItemCart } from "app/cartSlice";

const CartIcon = ({ children }: any) => {
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const items: ItemCart[] = [];

  for (let index = 0; index < cart.itemSelected.length; index++) {
    let bool = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].title == cart.itemSelected[index].title && items[i].pharmacies == cart.itemSelected[index].pharmacies) {
        bool = true;
        break;
      }
    }
    if (!bool) {
      items.push(cart.itemSelected[index]);
    }
  }

  function onClick() {
    navigate("/cart");
  }

  return (
    <div className="cart_icon_bagde" onClick={onClick}>
      <Badge count={items.length} size="small" offset={[4, 0]} className="header_notifications">
        {children}
      </Badge>
    </div>
  );
};

export default CartIcon;
