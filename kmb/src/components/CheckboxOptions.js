import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxOptions({ row, catchAllLabel, valueLabels, values, setValues }) {
  const handleChange = e => {
    if (e.target.name === catchAllLabel) {
      let newValues = {}
      valueLabels.forEach(vLabel => newValues[vLabel] = e.target.checked);
      setValues({
        ...values,
        ...newValues
      });
    } else {
      if (values[catchAllLabel]) {
        setValues({
          ...values,
          [catchAllLabel]: e.target.checked,
          [e.target.name]: e.target.checked
        });
      } else {
        setValues({
          ...values,
          [e.target.name]: e.target.checked
        })
      }
    }
  };

  return (
    <>
      <FormGroup row={row}>
        {valueLabels && valueLabels.map(vLabel => (
          <FormControlLabel
            control={<Checkbox checked={values[vLabel]} onChange={handleChange} name={vLabel}/>}
            label={vLabel}
          />
        ))}
      </FormGroup>
    </>
  )
}