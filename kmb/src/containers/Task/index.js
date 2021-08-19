import { useParams } from 'react-router-dom';

export default function Task() {
    const { taskID } = useParams();

    return (
        <>
    <h1>{`${taskID}`}</h1>
        </>
    )
}