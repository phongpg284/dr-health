import "./index.scss";
import { useAppSelector } from "app/store";
import { useReactMediaRecorder } from "react-media-recorder";


import { Divider, Input } from "antd";

import microIcon from "../../../../assets/micro.png";
import { useState, useEffect, memo } from "react";
import { downloadRecord } from "./downloadRecords";

interface Record {
  fileName: string;
  record: any;
  createdAt: string;
}

const RecordsRender = ({records}: any) => {
  return (
    <>
      {records && records.map((r: Record) => (
        <div key={records.indexOf(r) + 100}>
          <div style={{textAlign: "left", fontSize: "1rem", marginBottom: "2px"}} key={records.indexOf(r) + 200}>
            {records.indexOf(r) + 1}.{" "}
            {r.fileName.slice(0, r.fileName.lastIndexOf("."))} - {" "}
            {new Date(r.createdAt).toLocaleString()}
          </div>
          <audio
            style={{textAlign: "center"}}
            src={URL.createObjectURL(r.record)}
            controls
            className="me-3"
            key={records.indexOf(r)}
          />
        </div>     
      ))}
    </>
  )
}
const RecordsToRender = memo(RecordsRender);

const AudioRecord = ({ patientId }: any) => {
  const account = useAppSelector((state) => state.account);
  const [recordName, setRecordName] = useState("");
  const [records, setRecords] = useState<any>([]);
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: {
        type: "audio/wav",
      },
    });

  // const [uploadRecord] = useMutation(UPLOAD);
  // const { loading, error, data } = useQuery(RECORDING_DOCTOR, {
  //   variables: {
  //     id: patientId,
  //   },
  // });

  const getRecords = async (data: any) => {
    const recordings: Record[] = [];
    if (data)
      for (let i = 0; i < data.getRecordingDoctor.length; i++)
        recordings.push({
          fileName: data.getRecordingDoctor[i].fileName,
          record: await downloadRecord(
            data.getRecordingDoctor[i].fileName,
            patientId
          ),
          createdAt: data.getRecordingDoctor[i].createdAt,
        });    
    setRecords(recordings);
  };

  // useEffect(() => {
  //   getRecords(data);
  // }, [data]);

  

  const updateRecordList = (data: Blob) => {
    setRecords((prev: any) => {
      return [...prev,{
        fileName: `${recordName}.mp3`,
        record: data,
        createdAt: new Date(),
      }]
    })
  }

  const handleSubmit = () => {
    fetch(mediaBlobUrl!, { method: "GET", mode: "same-origin" })
      .then((r) => r.blob())
      .then((data) => {
        const file = new File([data], recordName + ".mp3", {
          type: "audio/wav",
        });
        // uploadRecord({
        //   variables: {
        //     ownerId: account.id,
        //     receiverId: patientId,
        //     file: file,
        //   },
        // }).then(() => {
        //   updateRecordList(data);
        //   clearBlobUrl();
        // });
      });
  };

  const handleClickRecord = () => {
    if (status === "recording") stopRecording();
    else startRecording();
  };

  const handleChangeInput = (e: any) => {
    setRecordName(e.target.value);
  };
  const handleCancel = () => {
    clearBlobUrl();
  };

  return (
    <div className="record-container">
      {account.role === "doctor" && (
        <div>
          <div className="record-title">Ghi âm nhắc nhở bệnh nhân</div>
          <div className="d-flex align-items-center justify-content-center">
            {!mediaBlobUrl && (
              <img
                src={microIcon}
                className="micro-icon"
                onClick={handleClickRecord}
              />
            )}
            {status === "recording" && (
              <div className="record-status">Đang ghi âm...</div>
            )}
            {mediaBlobUrl && (
              <div>
                <audio src={mediaBlobUrl!} controls className="me-3" />
                <div className="d-flex">
                  <Input
                    placeholder="Nhập tên file ghi âm"
                    onChange={handleChangeInput}
                    value={recordName}
                  />
                  <button
                    className="command-button"
                    id="save-button"
                    onClick={handleSubmit}
                  >
                    Lưu
                  </button>
                  <button
                    className="command-button"
                    id="cancel-button"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
          <Divider />
        </div>
      )}
      <div className="record-title">Lịch sử ghi âm</div>
      <div className={`record-list${mediaBlobUrl? "-short" : ""}`}>
        <RecordsToRender records={records} />
      </div>
    </div>
  );
};

export default AudioRecord;
