import "./style.scss";
import { useAppSelector } from "app/store";
import { useEffect, useState } from "react";
import usePromise from "utils/usePromise";

interface PatientSelectProps {
  onChange: (value: string | null) => void;
}
function PatientSelect({ onChange }: PatientSelectProps) {
  const account = useAppSelector((state) => state.account);
  const [patientList] = usePromise(`/doctor/patients/${account.id}`);
  const [patient, setPatient] = useState<string | null>(null);

  useEffect(() => {
    onChange(patient);
  }, [patient]);

  return (
    <div className="patientSelect">
      <div className="patientGroup">
        <span className="patientLabel">Bệnh nhân</span>
        <select onChange={(e) => setPatient(e.target.value)} className="patientInput">
          <option value="">Chọn bệnh nhân</option>
          {patientList?.map((patient: any) => (
            <option key={patient.id} value={patient._id}>
              {patient.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PatientSelect;
