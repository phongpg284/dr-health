import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { Typography, Button } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_PATIENT } from "../schema";

const { Paragraph } = Typography;

const Pathological = ({ data, role }: any) => {
  const [savePathological] = useMutation(UPDATE_PATIENT);
  const [content, setContent] = useState<any>(undefined);
  const prevContent = useRef();
  const [changeContent, setChangeContent] = useState(false);
  useEffect(() => {
    if (data?.pathologicalDescription)
      setContent(data.pathologicalDescription);
      else 
      setContent("")
  },[data]);

  
  useEffect(() => {
    if(prevContent.current !== undefined)
    setChangeContent(true);
  },[content])
  
  useEffect(() => {
    prevContent.current = content;
  })
  const handleSavePathological = () => {
    savePathological({
      variables: {
        inputs: {
          _id: data._id,
          pathologicalDescription: content
        }
      }
    })
    setChangeContent(false)
  }

  return (
    <div className="pathological-wrapper">
      <div className="pathological-title">Bệnh nền</div>
      <div className="pathological-content">
        <Paragraph
        // ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
          editable={role === "doctor" ? {
            onChange: setContent,
            // maxLength: 50,
            // autoSize: { maxRows: 6, minRows: 3 },
          } : undefined}
        >
          {content}
        </Paragraph>
      </div>
      {changeContent &&
        <Button onClick={handleSavePathological} type="primary">Lưu ghi chú</Button>
      }

    </div>
  );
};

export default Pathological;
