import { Steps } from "antd";

const { Step } = Steps;

interface SetStepsProps {
  current: number;
  steps: string[];
  backFunc: (() => void)[];
}

const SetSteps = ({ current, steps, backFunc }: SetStepsProps) => {
  return (
    <Steps size="default" current={current}>
      {steps.map((step: string, index: number) => {
        return <Step title={step} key={index} onClick={backFunc[index]} />;
      })}
    </Steps>
  );
};

export default SetSteps;
