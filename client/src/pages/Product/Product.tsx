import { useState, useEffect } from "react";
import { Breadcrumb, Menu, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {
  CartIcon,
  Content,
  ContentWrapper,
  MenuWrapper,
  Product,
  ProductBuyButton,
  ProductImage,
  ProductPrice,
  ProductSoldQuantity,
  ProductTitle,
  ProductWrapper,
  Select,
  Title,
  Wrapper,
} from "./styled";
import cartIcon from "./cart.svg";
import menu from "../../temp/menu.json";
import products from "../../temp/products.json";
import { useAppSelector } from "app/store";
import { BsFillCartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Cart, ItemCart, updateItemCartSet } from "app/cartSlice";
import { useHistory } from "react-router-dom";

enum SortingType {
  ASC = "asc",
  DESC = "desc",
  POPULAR = "popular",
}

type Product = typeof products[number]["products"][number];

const Products = () => {
  const account = useAppSelector((state) => state.account);
  const product = useAppSelector((state) => state.product);
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const defaultSorting = SortingType.POPULAR;
  const defaultCategoryKeySelecting = product.idSelected;
  const defaultCategoryItemKeySelecting = product.idSelected.split("-")[0];

  const [productKeySelecting, setProductKeySelecting] = useState(defaultCategoryKeySelecting);
  const [sortSelecting, setSortSelecting] = useState(defaultSorting);
  const [currentMenuTitles, setCurrentMenuTitles] = useState([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const onClick = (e: any) => {
    setProductKeySelecting(e?.key);
  };

  const onClickSorting = (e: any) => {
    setSortSelecting(e?.target?.name);
  };

  const addToCart = (e: ItemCart) => {
    if (account.accessToken == null) {
      history.replace("/login");
      return
    }

    dispatch(updateItemCartSet({itemSelected: [...cart.itemSelected, e]}))
    message.success("Item added to cart!");
  };

  const directBuy = (e: ItemCart) => {
    if (account.accessToken == null) {
      history.replace("/login");
      return
    }

    dispatch(updateItemCartSet({itemSelected: [...cart.itemSelected, e]}))
    history.replace("/cart");
  };

  function sortByType(type) {
    if (type === SortingType.POPULAR)
      return function (a, b) {
        return b?.sold - a?.sold;
      };
    if (type === SortingType.ASC)
      return function (a, b) {
        return a?.price - b?.price;
      };
    if (type === SortingType.DESC)
      return function (a, b) {
        return b?.price - a?.price;
      };
  }

  useEffect(() => {
    const selectedKeyArr = productKeySelecting.split("-");
    const currentMenu = menu.find((item) => item.id.toString() === selectedKeyArr[0]);
    setCurrentMenuTitles([currentMenu.title, currentMenu.items.find((item) => item.id.toString() === selectedKeyArr[1]).title]);
  }, [productKeySelecting]);

  useEffect(() => {
    const currentList = products?.find((p) => p.category_id === productKeySelecting)?.products?.sort(sortByType(sortSelecting));
    setCurrentProducts([...currentList]);
  }, [productKeySelecting, sortSelecting]);

  return (
    <Wrapper>
      <ContentWrapper>
        <MenuWrapper>
          <h5 className="title">Danh mục sản phẩm</h5>
          <Menu style={{ width: 240 }} defaultSelectedKeys={[defaultCategoryKeySelecting]} defaultOpenKeys={[defaultCategoryItemKeySelecting]} mode="inline" onClick={onClick}>
            {menu &&
              menu?.map((sub) => (
                <Menu.SubMenu key={sub.id} title={sub.title}>
                  {sub?.items && sub.items?.map((item) => <Menu.Item key={sub.id + "-" + item.id}>{item.title}</Menu.Item>)}
                </Menu.SubMenu>
              ))}
          </Menu>
        </MenuWrapper>
        <Content>
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>{currentMenuTitles[0]}</Breadcrumb.Item>
              <Breadcrumb.Item>{currentMenuTitles[1]}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Select>
            <Title>{currentMenuTitles[0]}</Title>
            <div>
              <button name={SortingType.POPULAR} className={sortSelecting === SortingType.POPULAR && "active"} onClick={onClickSorting}>
                Phổ biến
              </button>
              <button name={SortingType.ASC} className={sortSelecting === SortingType.ASC && "active"} onClick={onClickSorting}>
                Giá thấp
              </button>
              <button name={SortingType.DESC} className={sortSelecting === SortingType.DESC && "active"} onClick={onClickSorting}>
                Giá cao
              </button>
            </div>
          </Select>
          <ProductWrapper>
            {currentProducts?.map((p, index) => (
              <Product key={index}>
                <ProductImage src={p.image} />
                <ProductTitle>{p.title}</ProductTitle>
                <ProductPrice>
                  {p.price} {p.currency}/ {p.unit}
                </ProductPrice>
                <ProductSoldQuantity>Đã bán {p.sold}</ProductSoldQuantity>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CartIcon onClick={()=>{addToCart(currentProducts[index])}}>
                    <FaShoppingCart className="icon"/>
                  </CartIcon>
                  <ProductBuyButton onClick={()=>{directBuy(currentProducts[index])}}>Mua ngay</ProductBuyButton>
                </div>
              </Product>
            ))}
          </ProductWrapper>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Products;
