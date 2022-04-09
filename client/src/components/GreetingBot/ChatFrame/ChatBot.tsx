import React from "react";
import { v4 } from "uuid";
import { Message } from "./ChatFrame";

type Answer = string | React.ReactElement;

interface Conversation {
    questions: string[];
    answers: Answer[];
    hint?: string[];
}

const listConversation: Conversation[] = [
    {
        questions: ["Xin chào", "Chào bạn", "hello", "hi"],
        answers: ["Chào bạn, tôi là chatbot của Hỗ trợ đột quỵ", "Xin chào, tôi là chatbot của Dr. Health"],
    },
    {
        questions: ["Bạn là ai", "Bạn tên gì"],
        answers: ["Tên tôi là CB, tôi sẽ giúp bạn giải đáp thắc mắc", "Tôi là CB, người hướng dẫn của trang web này"],
    },
    {
        questions: ["chó", "ngu", "óc", "mày", "câm mồm"],
        answers: ["Đừng nói vậy chứ bạn 🙃🙃", "Tôi sẽ giả bộ không hiểu bạn nói gì 🙂🙂🙂", "Đôi khi tôi ước rằng mình không hiểu những gì bạn nói 😓😓😓"],
    },
    {
        questions: ["Đột quỵ là gì ?", "Bệnh đột quỵ là gì ?", "Muốn biết về bệnh đột quỵ"],
        answers: [
            <>
                <b> Đột quỵ</b> xảy ra khi một mạch máu bị vỡ hoặc thông thường nhất vẫn là hình thành sự tắc nghẽn trong mạch máu.
                <div>
                    Nếu không được điều trị sớm, các tế bào não sẽ bắt đầu nhanh chóng chết đi.
                    Kết quả là bệnh nhân có thể tàn tật hoặc nghiêm trọng hơn là tử vong. Nếu bạn phát hiện người nhà bị đột quỵ, hãy nhanh chóng tìm kiếm sự hỗ trợ y tế, đừng bao giờ trì hoãn.
                </div>
            </>
        ],
        hint: ["Nguyên nhân đột quỵ", "Phòng chống đột quỵ", "Tổn thương do đột quỵ"],
    },
    {
        questions: ["Tổn thương do đột quỵ", "Tác hại đột quỵ"],
        answers: [
            <>

                <h6>
                    Đối với đột quỵ, thời gian của họ rất quý giá – tính bằng giây.
                </h6>

                <div>
                    Khi mạch máu bị tắc nghẽn, máu sẽ không đến được nơi bị tắc nghẽn (máu vận chuyển oxy và các chất dinh dưỡng),
                    các tế bào sẽ bị ngưng cấp dưỡng và chết dần sau vài phút.
                    Có một số loại thuốc tiêu huyết khối được dùng với vai trò hạn chế tổn thương não, nhưng chúng cần được dùng trong vòng 3h – 4,5h ở một số người – sau khi họ biểu hiện các triệu chứng ban đầu và nguyên nhân là do máu đông gây tắc mạch máu não. Một khi các mô ở não bắt đầu hoại tử,
                    các bộ phận cơ thể do các mô này quản lý sẽ hoạt động không tốt.
                </div>
                <i>Đây là lý do tại sao nói đột quỵ là nguyên nhân hàng đầu gây ra tình trạng khuyết tật lâu dài.</i>
            </>
        ],
        hint: ["Đột quỵ thiếu máu cục bộ là gì","Đột quỵ xuất huyết não là gì "],
    },

    {
        questions: ["Đột quỵ thiếu máu cục bộ là gì"],
        answers: [
            <>


                <h6>
                    Đột quỵ thiếu máu cục bộ
                </h6>
                Là loại đột quỵ phổ biến nhất. 10 trường hợp đột quỵ thì có 9 trường hợp là đột quỵ thiếu máu cục bộ. Thủ phạm là một cục máu đông làm tắc nghẽn mạch máu bên trong não. Cục máu đông này có thể hình thành ngay ở não hoặc di chuyển trong mạch máu từ nơi khác đến não.
            </>
        ],
        hint: ["Phòng chống đột quỵ"],
    },
    {
        questions: ["Đột quỵ xuất huyết não là gì ?"],
        answers: [
            <>

                <b> Đột quỵ xuất huyết não</b> thường ít gặp hơn nhưng khả năng <b>gây tử vong cao hơn</b>.
                <div>
                    Đột quỵ xuất huyết não xảy ra khi một mạch máu trong não suy yếu đi và vỡ ra.
                    Hậu quả là bệnh nhân sẽ xuất huyết bên trong não và rất khó để ngăn chặn.
                </div>

            </>
        ],
        hint: ["Phòng chống đột quỵ","Nguyên nhân đột quỵ",],
    },
    {
        questions: ["Nguyên nhân đột quỵ", "Nguyên nhân gây ra đột quỵ"],
        answers: [
            "Khi trong trạng thái tốt nhất, nhịp tim là thể hiện sự co bóp đều đặn của trái tim giúp đẩy máu theo các mạch máu đi nuôi cơ thể, sau đó nhận lại máu trở lại để tuần hoàn. Tuy nhiên, có nhiều rối loạn nhịp tim làm ảnh hưởng đến hoạt động của tim, trong đó có chứng rung nhĩ. Đây cũng là nguyên nhân gây ra đột quỵ, khiến nhiều bệnh nhân bị suy tim và gặp biến chứng tim mạch nặng nề khác.",
        ],
        hint: ["Dấu hiệu đột quỵ", "Phòng chống đột quỵ"],
    },
    {
        questions: ["Dấu hiệu đột quỵ", "Nhận biết đột quỵ"],
        answers: [
            <>
                <h6>
                    BE FAST là cụm từ bao gồm 6 chữ cái, mỗi chữ mô tả một dấu hiệu nhận biết sớm đột quỵ:
                </h6>

                <ul>
                    <li>
                        <b>B (BALANCE):</b> Diễn tả triệu chứng khi bệnh nhân đột ngột mất thăng bằng, chóng mặt, đau đầu dữ dội và mất khả năng phối hợp vận động.
                    </li>
                    <li>
                        <b>E (EYESIGHT):</b> Thể hiện việc bệnh nhân bị mờ mắt (giảm thị lực) hoặc mất hoàn toàn thị lực của 1 hoặc cả 2 mắt.
                    </li>
                    <li>
                        <b>F (FACE):</b> Miêu tả sự biến đổi của khuôn mặt, bệnh nhân có thể bị liệt, méo miệng, nhân trung (đoạn nối giữa điểm dưới mũi đến môi trên) bị lệch, thể hiện rõ nhất khi bệnh nhân cười mở miệng lớn.
                    </li>
                    <li>
                        <b>A (ARM):</b>  Bệnh nhân cử động khó hoặc không thể cử động tay chân, tê liệt 1 bên cơ thể. Cách xác nhận nhanh chóng nhất là yêu cầu bệnh nhân giơ 2 tay lên và giữ lại cùng 1 lúc.
                    </li>
                    <li>
                        <b>S (SPEECH):</b> Bệnh nhân khó nói, phát âm không rõ, nói dính chữ, nói ngọng bất thường. Bạn có thể kiểm tra bằng cách yêu cầu người nghi ngờ bị đột quỵ lặp lại một câu đơn giản bạn vừa nói.
                    </li>
                    <li>
                        <b>T (TIME):</b> Khi xuất hiện đột ngột các triệu chứng trên hãy nhanh chóng gọi 115 hoặc đưa bệnh nhân đến cơ sở y tế gần nhất để được cấp cứu kịp thời.
                    </li>
                </ul>

            </>
        ],
        hint: ["Phòng chống đột quỵ"],
    },
    {
        questions: ["Phòng chống đột quỵ", "Phòng ngừa đột quỵ", "Tránh đột quỵ"],
        answers: [
            <>
                <h6>Thuốc kháng đông</h6>
                là loại thuốc điều trị hiệu quả nhất để ngăn ngừa hình thành cục máu đông ở bệnh nhân rung nhĩ có nguy cơ đột quỵ cao. Sử dụng các loại thuốc kháng đông có thể làm giảm nguy cơ đột quỵ do rung nhĩ đến 70%.
                <div>
                    <i>
                        Cần hỏi ý kiến bác sĩ khi sử dụng loại thuốc này
                    </i>
                </div>
            </>,
        ],
        hint:["Điều trị đột quỵ","Nguyên nhân đột quỵ"]

    },
    {
        questions: ["Điều trị đột quỵ", "Cách điều trị đột quỵ"],
        answers: [
            "Theo PGS.TS.BS Nguyễn Huy Thắng, Trưởng khoa Bệnh lý Mạch máu não, Bệnh viện Nhân dân 115, đột quỵ là bệnh có nguyên nhân, có thể phòng ngừa và điều trị. Do đó, mọi người có thể chủ động trong việc tự bảo vệ sức khỏe của chính mình."
        ],
    },
];
const defaultAnswers: string[] = ["Tôi không hiểu bạn nói gì hết 🤐🤐🤐", "Bộ não của tôi từ chối hiểu 😖😖😖", "Tôi không hiểu gì cả 😭😭😭, tất cả là tại dev của tui nó gà quá"];

function getAnswer(question: string): Message {
    let answers: Answer[] = [];
    let hint: string[] | undefined | null = [];
    let bestPoint = 0;
    for (let i = 0; i < listConversation.length; i++) {
        const conversation = listConversation[i];
        const point = getBestPointFromArr(question, conversation.questions);
        if (point > bestPoint) {
            bestPoint = point;
            answers = conversation.answers;
            hint = conversation.hint;
        }
    }

    const answer = bestPoint >= 1 ? getRandomAnswerFromArr(answers) : getRandomAnswerFromArr(defaultAnswers);
    const message: Message = {
        id: v4(),
        content: answer,
        isSender: false,
        hint: hint,
    };
    return message;
}

export default getAnswer;

function getPointOfQuestion(question: string, sample: string): number {
    let point = 0;
    const clearQuestion = removeAccents(question);
    const clearSample = removeAccents(sample);
    const questionArray = clearQuestion.trim().toLowerCase().split(" ");
    const sampleArray = clearSample.trim().toLowerCase().split(" ");

    for (let i = 0; i < questionArray.length; i++) {
        const questionLetter = questionArray[i];
        if (questionLetter != null || questionLetter != "") {
            if (sampleArray.includes(questionLetter)) {
                point++;
            }
        }
    }
    return point;
}

function removeAccents(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

function getBestPointFromArr(question: string, arr: string[]): number {
    let bestPoint = 0;
    for (let i = 0; i < arr.length; i++) {
        const sample = arr[i];
        const point = getPointOfQuestion(question, sample);
        if (point > bestPoint) {
            bestPoint = point;
        }
    }
    return bestPoint;
}

function getRandomAnswerFromArr(answers: Answer[]): Answer {
    const index = Math.floor(Math.random() * answers.length);
    return answers[index];
}
