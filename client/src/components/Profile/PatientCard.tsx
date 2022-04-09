
interface PatientCardProps {
    fullName: string;
    age: number;
}


export const PatientCard: React.FC<PatientCardProps> = ({ fullName, age }) => {
    return (
        <div className="profile_contentinfo_item_patient profile_cp_item">
            <div className="profile_patient_in">
                <div className="profile_patient_avatar"></div>
                <div className="profile_patient_text_carry">
                    <div className="profile_patient_text profile_cp_item">
                        • Họ và tên:{` ${fullName} `}
                    </div>
                    <div className="profile_patient_text profile_cp_item">
                        • Tuổi:{` ${age}`}
                    </div>
                </div>
            </div>
            <a href="/patients" className="profile_patient_textdetail profile_cp_item">
                Xem thêm
            </a>
        </div>
    )
}