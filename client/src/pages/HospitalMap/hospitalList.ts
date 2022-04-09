import React from "react";

export interface HospitalProps {
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    phone: string;
}
const HospitalList: HospitalProps[] = [
    {
        name: "Bệnh viện Đa khoa Trung ương Cần Thơ",
        address: "315 Nguyễn Văn Linh, Phường An Khánh, Ninh Kiều, Cần Thơ, Việt Nam",
        phone: "0901215115",
        longitude: 105.7532103,
        latitude: 10.0287631,
    },
    {
        name: "Bệnh viện Đa khoa S.I.S Cần Thơ",
        address: "397 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam",
        phone: "18001115",
        longitude: 105.746338,
        latitude: 10.020765,
    },
    {
        name: "Bệnh viện Đa khoa Thành phố Cần Thơ",
        address: "04 Châu Văn Liêm, An Lạc, Ninh Kiều, Cần Thơ, Việt Nam",
        phone: "02923917901",
        longitude: 105.7805638,
        latitude: 10.0308784,
    },
    

    {
        name: "Bệnh viện Đa khoa Hoàn Mỹ Cửu Long",
        address: "Lô 20 Võ Nguyên Giáp, Phú Thứ, Cái Răng, Cần Thơ, Việt Nam",
        phone: "02923917901",
        longitude: 105.7969679,
        latitude: 10.005285,
    },



    {
        name: "Bệnh viện Đa khoa Tỉnh Bình Định",
        address: "106 Đường Nguyễn Huệ, Trần Phú, Thành phố Qui Nhơn, Bình Định, Việt Nam",
        phone: "+842563822184",
        longitude: 107.1087223,
        latitude: 16.791802,
    },
    {
        name: "Bệnh viện đa khoa tỉnh Quảng Trị",
        address: "266 Hùng Vương, Đông Lương, Thành phố Đông Hà, Quảng Trị, Việt Nam",
        phone: "+842333852209",
        longitude: 109.2233527,
        latitude: 13.7673903,
    },
    {
        name: "Bệnh viện Đa khoa Trung ương Quảng Nam",
        address: "Tam Hiệp, Núi Thành, Quảng Nam, Việt Nam",
        phone: "+842353870390",
        longitude: 108.3441571,
        latitude: 15.4452115,
    },

    {
        name: "Bệnh viện C Thái Nguyên",
        address: "Cải Đan, Tp. Sông Công, Thái Nguyên, Việt Nam",
        phone: "+842083862224",
        longitude: 104.8090885,
        latitude: 21.9461785,
    },
    {
        name: "Bệnh viện Chợ Rẫy",
        address: "201B Nguyễn Chí Thanh, Phường 12, Quận 5, Thành phố Hồ Chí Minh, Việt Nam",
        phone: "+842838554137",
        longitude: 106.6573655,
        latitude: 10.7576886,
    },
    {
        name: "Bệnh viện Đại Học Y Dược - Hoàng Anh Gia Lai",
        address: "238 Lê Duẩn, Phù Đổng, Thành phố Pleiku, Gia Lai 600000, Việt Nam",
        phone: "+842692222517",
        longitude: 108.0273735,
        latitude: 13.9711429,
    },
    {
        name: "Bệnh Viện Đa Khoa Lâm Đồng",
        address: "1 Đường Phạm Ngọc Thạch, Phường 6, Thành phố Đà Lạt, Lâm Đồng, Việt Nam",
        phone: "+842633827528",
        longitude: 107.9799852,
        latitude: 11.7468391,
    },
    {
        name: "Bệnh viện Đa Khoa Hà Tĩnh",
        address: "Số 75 Hải Thượng Lãn Ông, Bắc Hà, TP Hà Tĩnh - Hà Tĩnh, Hà Tĩnh, Việt Nam",
        phone: "+842393855569",
        longitude: 105.8995795,
        latitude: 18.3457803,
    },
    {
        name: "Bệnh viện Hữu nghị Việt Nam - Cu Ba",
        address: "Đường Hữu Nghị - Tiếu, khu 10, Đồng Hới, Quảng Bình, Việt Nam",
        phone: "+84943767668",
        longitude: 106.6000581,
        latitude: 17.4740615,
    },
    {
        name: "Bệnh Viện Hữu Nghị Việt Đức",
        address: "40 Tràng Thi, Hàng Bông, Hoàn Kiếm, Hà Nội 100000, Việt Nam",
        phone: "+842438253531",
        longitude: 105.844712,
        latitude: 21.0286371,
    },
    {
        name: "Bệnh viện An Bình",
        address: "146 An Bình, Phường 7, Quận 5, Thành phố Hồ Chí Minh, Việt Nam",
        phone: "+842839234260",
        longitude: 106.6693821,
        latitude: 10.7542438,
    },
    {
        name: "Bệnh viện Bà Rịa",
        address: "686 Võ Văn Kiệt, Long Tâm, Bà Rịa, Bà Rịa - Vũng Tàu, Việt Nam",
        phone: "+842543731115",
        longitude: 107.1944645,
        latitude: 10.5096801,
    },
    {
        name: "Bệnh viện Bạch Mai",
        address: "78 Đường Giải Phóng, Phương Đình, Đống Đa, Hà Nội, Việt Nam",
        phone: "+842438693731",
        longitude: 105.8388904,
        latitude: 21.0001216,
    },
];

const latOffset = 0.0;
const lonOffset = 0.0022;

const finalList = HospitalList.map((item) => {
    const newItem = { ...item };
    newItem.latitude = newItem.latitude + latOffset;
    newItem.longitude = newItem.longitude + lonOffset;
    return newItem;
});

export default finalList;
