import styled from "styled-components/macro";

export const Wrapper = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const MenuWrapper = styled.div`
  max-width: 240px;
  padding: 15px 0;
  .title {
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1300px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
`;

export const Content = styled.div`
  padding: 10px;
  .breadcrumb-wrapper {
    text-align: left;
    .ant-breadcrumb-link {
      font-weight: 600;
      span {
        vertical-align: middle;
      }
    }
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Open Sans", sans-serif;
  font-family: "Roboto", sans-serif;
`;

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px 10px;
  button {
    margin: 0 5px;
    height: 30px;
    border: 1px solid #8b8b8b;
    color: #8b8b8b;
    background-color: #fff;
    border-radius: 4px;
    text-decoration: none !important;
    :hover {
      color: #ea0054;
      background-color: #ffe6ef;
      border-color: #ffe6ef;
    }
  }
  .active {
    color: #ea0054;
    background-color: #ffe6ef;
    border-color: #ffe6ef;
  }
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Product = styled.div`
  width: 230px;
  border: #ebebeb solid 1px;
  border-radius: 9px;
  margin: 10px;
  padding: 20px 5px;
`;

export const ProductImage = styled.img`
  width: 200px;
  margin-bottom: 30px;
  margin-top: 20px;
  :hover {
    transform: scale(1.1);
  }
`;

export const ProductTitle = styled.div`
  font-size: 14px;
  letter-spacing: 0.06px;
  height: 60px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ProductPrice = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const ProductSoldQuantity = styled.div`
  color: #8b8b8b;
  margin-bottom: 20px;
  font-size: 14px;
`;

export const CartIcon = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 37px;
  background-color: #fff;
  color: #1e1e1e;
  border: #c9c9c9 solid 1px;
  border-radius: 4px !important;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;
`;
export const ProductBuyButton = styled.button`
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  height: 37px;
  border-radius: 4px !important;
  background-color: #fff;
  color: #ea0054;
  border: #ea0054 solid 1px;
  text-transform: uppercase;
  font-weight: 550;
  margin-left: 15px;
`;
