// import "./profile.scss";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

import { updateProductSet } from "app/productSlice";
import { useAppDispatch } from "app/store";
import { message } from "antd";
import usePromise from "utils/usePromise";
import { CartAddress } from "./Address";
import { CartPayment } from "./Payment";
import { CartProductList, ItemCartSelected } from "./ProductList";
import { PayMethod, updateItemCartSet } from "app/cartSlice";

export default function Cart() {
  const account = useAppSelector((state) => state.account);
  const cart = useAppSelector((state) => state.cart);
  const [patientData] = usePromise(`/user/${account.id}`);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (cart.itemSelected.length < 1 || account.accessToken == null) {
    navigate("/", { replace: true });
  }

  const items: ItemCartSelected[] = [];

  let cost = 0;

  for (let index = 0; index < cart.itemSelected.length; index++) {
    cost = cost + Number(cart.itemSelected[index].price);
    let bool = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].item.title == cart.itemSelected[index].title && items[i].item.pharmacies == cart.itemSelected[index].pharmacies) {
        items[i].number += 1;
        bool = true;
        break;
      }
    }
    if (!bool) {
      items.push({ item: cart.itemSelected[index], number: 1 });
    }
  }

  return (
    <div className="cart_all">
      <div className="cart_info">
        <CartAddress phone={patientData?.phone ?? ""} name={patientData?.fullName ?? ""} address={patientData?.address?.location ?? ""} />
        <CartPayment />
        <CartProductList cart={cart} />
      </div>
      <div className="cart_cost">
        <div className="cart_total_number">
          <span>
            <p style={{ color: "#ea0054" }}>{items.length} sản phẩm</p>
            <strong style={{ color: "black" }}>
              {cost}.000 {items[0]?.item.currency}
            </strong>
          </span>
        </div>
        <div className="cart_ship" hidden={cart.payMethod == PayMethod.pickup}>
          <span>
            <p style={{ color: "black" }}>Phí di chuyển</p>
            <strong style={{ color: "black" }}>
              {35}.000 {items[0]?.item.currency}
            </strong>
          </span>
        </div>
        <div className="cart_total_cost">
          <span>
            <p style={{ color: "black" }}>Tổng tiền</p>
            <strong style={{ color: "black", fontSize: "22px" }}>
              {cost + (cart.payMethod == PayMethod.pickup ? 0 : 35)}.000 {items[0]?.item.currency}
            </strong>
          </span>
          <div
            onClick={() => {
              message.success("Đặt hàng thành công!");
              navigate("/", { replace: true });
              dispatch(updateItemCartSet({ itemSelected: [] }));
            }}
          >
            Đặt hàng
          </div>
        </div>
      </div>
    </div>
  );
}
