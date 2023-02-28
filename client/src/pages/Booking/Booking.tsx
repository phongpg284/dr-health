import { useState, useEffect } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import {
  Content,
  ContentWrapper,
  ItemWrapper,
  Avatar,
  Wrapper,
  ProfileWrapper,
  Profile,
  Title,
  Description,
  BookingWrapper,
  TimeSlots,
  Address,
  Price,
  SelectDate,
  Booking,
  TimeSlot,
  SelectCityWrapper,
} from "./styled";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import doctors from "../../temp/doctors.json";

const { Option } = Select;

const MAX_AVAILABLE_BOOKING_DAY = 5;

const cityDropdown = [
  {
    title: "Toàn quốc",
    value: "All",
  },
  {
    title: "Hà Nội",
    value: "Hà Nội",
  },
  {
    title: "Hồ Chí Minh",
    value: "Thành phố Hồ Chí Minh",
  },
];

interface DateSlot {
  date: dayjs.Dayjs;
  title: string;
}

type DefaultDoctor = typeof doctors[number];

interface Doctor extends DefaultDoctor {
  timeSlots: dayjs.Dayjs[][];
}

const BookingPage = () => {
  const [citySelect, setCitySelect] = useState(cityDropdown[1].value);
  const [doctorList, setDoctorList] = useState<Doctor[]>(doctors as Doctor[]);
  const [currentDoctorList, setCurrentDoctorList] = useState<Doctor[]>([]);

  function cityFilter(doctor: any) {
    if (citySelect === cityDropdown[0].value) return doctor;
    else return doctor?.city === citySelect;
  }

  const handleChange = (value: string) => {
    setCitySelect(value);
  };

  //Generate random time slots for each available days for doctor
  const getTimeSlots = () => {
    function randomIntFromInterval(min: number, max: number) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const maxSlots = 2;
    const slots: dayjs.Dayjs[] = [];

    let currTime = dayjs().set("hour", 9).set("minute", 0).set("second", 0);
    const morningWorkingTime = {
      start: dayjs().set("hour", 8).set("minute", 0).set("second", 0),
      end: dayjs().set("hour", 12).set("minute", 0).set("second", 0),
    };
    const afternoonWorkingTime = {
      start: dayjs().set("hour", 13).set("minute", 0).set("second", 0),
      end: dayjs().set("hour", 17).set("minute", 0).set("second", 0),
    };

    const isValidTimeSlot = (time: dayjs.Dayjs) =>
      (time >= morningWorkingTime.start && time < morningWorkingTime.end) || (time >= afternoonWorkingTime.start && time < afternoonWorkingTime.end);

    for (let i = 0; i < maxSlots; i++) {
      if (isValidTimeSlot(currTime)) slots.push(currTime);
      currTime = currTime.add(30, "minute");
    }
    return slots;
  };

  useEffect(() => {
    const newDoctors = doctors?.map((doctor) => {
      const arrDate = [];
      for (let i = 0; i < MAX_AVAILABLE_BOOKING_DAY; i++) {
        arrDate.push(getTimeSlots());
      }
      return { ...doctor, timeSlots: arrDate };
    });
    setDoctorList([...newDoctors]);
  }, [doctors]);

  useEffect(() => {
    setCitySelect(cityDropdown[0].value);
  }, []);

  useEffect(() => {
    setCurrentDoctorList([...doctorList?.filter(cityFilter)]);
  }, [citySelect]);

  return (
    <Wrapper>
      <ContentWrapper>
        <SelectCityWrapper>
          <Select value={citySelect} style={{ width: 120 }} onChange={handleChange}>
            {cityDropdown.map((option) => (
              <Option key={option.title} value={option.value}>
                {option.title}
              </Option>
            ))}
          </Select>
        </SelectCityWrapper>
        <Content>
          {currentDoctorList?.map((doctor) => (
            <DoctorBooking data={{ ...doctor }} key={doctor as unknown as string} />
          ))}
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

const DoctorBooking = ({ data }: { data: Doctor }) => {
  const [dateSelectAvailable, setDateSelectAvailable] = useState<DateSlot[]>([]);
  const [dateSelect, setDateSelect] = useState<DateSlot>(dateSelectAvailable?.[0]);

  useEffect(() => {
    //Generate available days
    const arr = [];
    for (let i = 1; i <= MAX_AVAILABLE_BOOKING_DAY; i++) {
      const d = dayjs().add(i, "day");
      const day = d.get("day") > 0 ? "Thứ " + (d.get("day") + 1) : "Chủ nhật";
      const date = d.get("date");
      const month = d.get("month") + 1;
      arr.push({
        date: d,
        title: day + " - " + date + "/" + month,
      });
    }
    setDateSelectAvailable(arr);
    setDateSelect(arr?.[0]);
  }, []);
  return (
    <div>
      <ItemWrapper>
        <ProfileWrapper>
          <Avatar src={data.avatar} />
          <Profile>
            <Title>{data.name}</Title>
            {data?.description?.map((des) => (
              <Description key={des}>{des}</Description>
            ))}
            <FaMapMarkerAlt />
            <span>{data.city}</span>
          </Profile>
        </ProfileWrapper>
        <BookingWrapper>
          <SelectDate>
            <select onChange={(e) => setDateSelect(JSON.parse(e.target.value))}>
              {dateSelectAvailable?.map((date) => (
                <option key={date?.title} value={JSON.stringify(date)}>
                  {date?.title}
                </option>
              ))}
            </select>
          </SelectDate>
          <Booking>
            <div>
              <span className="calendar-icon">
                <FaCalendarAlt />
              </span>
              <span>Lịch khám</span>
              <br />
              <TimeSlots>
                {data?.timeSlots?.[dateSelectAvailable?.findIndex((d) => d?.title === dateSelect?.title)]?.map((t, index) => (
                  <TimeSlot key={index}>
                    {t.format("HH:mm")} - {t.add(30, "minute").format("HH:mm")}
                  </TimeSlot>
                ))}
              </TimeSlots>
            </div>
            <Address>
              <span>Địa chỉ khám</span>
              <br />
              {data.hospital}
              <br />
              {data.address}
            </Address>
            <Price>
              <span>Giá khám: </span>
              {data.fee} {data.currency}
            </Price>
          </Booking>
        </BookingWrapper>
      </ItemWrapper>
    </div>
  );
};

export default BookingPage;
