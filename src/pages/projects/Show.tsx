import { useParams } from "react-router-dom";


function Show() {
    const { id } = useParams<any>();
    return (
        <div>
            {id}
        </div>
    )
}

export default Show
