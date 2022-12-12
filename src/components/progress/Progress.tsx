import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import './styles.css';

const ProgressDemo = (props:any) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(props.value + 1), 300);
    return () => clearTimeout(timer);
  }, [props.value]);

  return (
    <Progress.Root className="ProgressRoot" value={progress}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress*5}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressDemo;