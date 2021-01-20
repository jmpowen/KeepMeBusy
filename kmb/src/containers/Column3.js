import { useContext } from 'react';

import AppContext from '../context/AppContext';

export default function Column3() {
  let appContext = useContext(AppContext);

  console.log(appContext.tasks)

  return (
    <div>
      <dl>
        {appContext.tasks.length > 0
          ? appContext.tasks.map((task) => (
            <>
              <dt>{task.task}</dt>
              <dd>{task.notes}</dd>
              <dd>{task.minutes}</dd>
            </>
            )) 
          : null}
        </dl>
    </div>
  )
}