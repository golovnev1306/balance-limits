import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Loading = () => {
    return (
        <div className={'loading-wrap'}>
            <CircularProgress/>
        </div>
    )
}

export default Loading