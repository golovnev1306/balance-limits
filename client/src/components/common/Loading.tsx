import CircularProgress from "@material-ui/core/CircularProgress"
import React, {FC} from "react"

const Loading: FC = () => {
    return (
        <div className={'loading-wrap'}>
            <CircularProgress/>
        </div>
    )
}

export default Loading