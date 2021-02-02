import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function TimeOfDay({ row, values, setValues }) {

  const handleTodChange = (e) => {
    if (e.target.name === 'anytime') {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
        'morning': e.target.checked,
        'afternoon': e.target.checked,
        'night': e.target.checked
      })
    } else if (e.target.name === 'morning' || e.target.name === 'afternoon' || e.target.name === 'night') {
      /* Interestesting case where if I had a setValues at the end (just as a statement that always ran for m, a, and n cases)
       The code would not work correctly and would not change the value for 'anytime' when it was true. Completely clueless as 
       to why this happened.
      */
      if (values.anytime) {
        setValues({
          ...values,
          'anytime': e.target.checked,
          [e.target.name]: e.target.checked,
        })
      } else {
        setValues({
          ...values,
          [e.target.name]: e.target.checked,
        })
      }
    } 
  }

  return (
    <>
      <FormGroup row={row}>
        <FormControlLabel
          control={<Checkbox checked={values.anytime} onChange={handleTodChange} name="anytime" />}
          label="Anytime"
        />
        <FormControlLabel
          control={<Checkbox checked={values.morning} onChange={handleTodChange} name="morning" />}
          label="Morning"
        />
        <FormControlLabel
          control={<Checkbox checked={values.afternoon} onChange={handleTodChange} name="afternoon" />}
          label="Afternoon"
        />
        <FormControlLabel
          control={<Checkbox checked={values.night} onChange={handleTodChange} name="night" />}
          label="Night"
        />
      </FormGroup>
    </>
  )
}