import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';



export default function Steppers(props) {

  const steps = ['Personal Particulars', 'Test Trail', 'Part A', 'Part B','Yay Completed!'];

  return (
      <Stepper activeStep={props.activeStep} alternativeLabel className={`${props.className}`}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}