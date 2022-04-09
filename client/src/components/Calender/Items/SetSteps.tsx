import { Steps } from 'antd';

const { Step } = Steps;

export default function SetSteps(props: any) {
    return (
        <Steps size="default" current={props?.current}>
            {props?.steps.map((step: string, index: number) => {
                return <Step title={step} key={index} onClick={props?.backFunc[index]} />
            })}
        </Steps>
    )
}
