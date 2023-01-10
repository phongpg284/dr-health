import "./HospitalMap.scss";
import React, { ReactElement } from "react";
import { Modal } from "react-bootstrap";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { VscSymbolNamespace } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { MdLocalHospital, MdOutlineLocalPhone } from "react-icons/md";
import { isMobile } from "react-device-detect";

import Header from "../../components/Header";
import hospitalList, { HospitalProps } from "./hospitalList";
import AbstractOneLine from "../../assets/abstract-one-line.svg";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
ReactMapGL.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function HospitalMap(): ReactElement {
  const defaultSide = React.useMemo(() => {
    if (!isMobile) {
      return {
        width: "50vw",
        height: "50vw",
      };
    } else {
      return {
        width: "90vw",
        height: "90vw",
      };
    }
  }, [isMobile]);

  const [viewport, setViewport] = React.useState({
    width: defaultSide.width,
    height: defaultSide.height,
    latitude: hospitalList[0].latitude,
    longitude: hospitalList[0].longitude,
    zoom: 5,
  });

  function onListItemClick(index: number) {
    const hospital = hospitalList[index];
    setViewport({
      ...viewport,
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      zoom: 15,
    });
  }

  function onMapItemClick(index: number) {
    setIndexModal(index)(true);
  }

  const [arrModal, setArrModal] = React.useState<boolean[]>([]);
  React.useEffect(() => {
    setArrModal(new Array(hospitalList.length).fill(false));
  }, [hospitalList]);

  function setIndexModal(index: number) {
    return function (show: boolean) {
      const newArr = [...arrModal];
      newArr[index] = show;
      setArrModal(newArr);
    };
  }

  return (
    <div>
      <Header />
      <div className="hospitalMapContent">
        <h1>Cơ sở điều trị</h1>
        <div className="outsideContainer">
          {!isMobile && <img src={AbstractOneLine} alt="" className="mapBack" />}
          <div className="contentContainer">
            <div className="list" style={{ height: defaultSide.height }}>
              {hospitalList.map((hospital, index) => (
                <HospitalListItem onClick={() => onListItemClick(index)} key={index} hospital={hospital} />
              ))}
            </div>
            <MyMap onChose={onMapItemClick} viewport={viewport} setViewport={setViewport} />
            {arrModal.map((modal, index) => (
              <ModalItem key={index} hospital={hospitalList[index]} modal={modal} setModal={setIndexModal(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface HospitalListItem {
  hospital: HospitalProps;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
function HospitalListItem(props: HospitalListItem) {
  const [modal, setModal] = React.useState(false);
  function toggleModal() {
    setModal(!modal);
  }
  const { hospital, onClick } = props;
  function onItemClick(e: React.MouseEvent<HTMLDivElement>) {
    toggleModal();
    onClick(e);
  }
  return (
    <div onClick={onItemClick} className="hospitalListItem">
      <div className="name rowItem">
        <span className="icon">
          <MdLocalHospital />
        </span>
        <span className="text">{hospital.name}</span>
      </div>
    </div>
  );
}

interface HospitalModalProps {
  hospital: HospitalProps;
  setModal: (modal: boolean) => void;
  modal: boolean;
}

function ModalItem(props: HospitalModalProps) {
  const { hospital, setModal, modal } = props;
  function onHide() {
    setModal(false);
  }
  return (
    <Modal centered show={modal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin bệnh viện</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modalContent">
          <div className="name rowItem">
            <span className="icon">
              <VscSymbolNamespace />
            </span>
            <span className="text">{hospital.name}</span>
          </div>
          <div className="address rowItem">
            <span className="icon">
              <FaRegAddressCard />
            </span>
            <span className="text">{hospital.address}</span>
          </div>
          <div className="phone rowItem">
            <span className="icon">
              <MdOutlineLocalPhone />
            </span>
            <a href={`tel:${hospital.phone}`} className="text">
              {hospital.phone}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface MyMap {
  setViewport: any;
  viewport: any;
  onChose: any;
}

const token = process.env.REACT_APP_MAPBOX_TOKEN || "pk.eyJ1Ijoia2hvaW5ndXllbjEyMjAiLCJhIjoiY2t5MmxyY21xMG0zMDJvczI5NWg1bXE0MCJ9.0bnXpWtdPXeUNVBYHg-dBA";

function MyMap({ viewport, setViewport, onChose }: MyMap): ReactElement {
  const { zoom } = viewport;

  const sizeIcon = React.useMemo(() => {
    if (zoom < 5) {
      return "small";
    } else if (zoom < 10) {
      return "medium";
    }
    return "large";
  }, [zoom]);

  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="rgba(102, 116, 237, 1)" offset="0%" />
          <stop stopColor="rgba(186, 26, 244, 1)" offset="50%" />
          <stop stopColor="rgba(255, 0, 113, 1)" offset="100%" />
        </linearGradient>
      </svg>

      <ReactMapGL className="myMap" {...viewport} mapboxApiAccessToken={token} onViewportChange={setViewport} mapStyle="mapbox://styles/mapbox/streets-v11">
        {hospitalList.map((hospital, index) => (
          <Marker latitude={hospital.latitude} longitude={hospital.longitude} key={index}>
            <div className="myMarker">
              <div className="markerContent">
                <div className="nameWrapper">
                  <div onClick={() => onChose(index)} className={`name ${zoom >= 15 ? "show" : "hide"}`}>
                    {hospital.name}
                  </div>
                </div>

                <div onClick={() => onChose(index)} className={`icon ${sizeIcon}`}>
                  <IoMdPin style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />
                </div>
              </div>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
}

export default HospitalMap;
