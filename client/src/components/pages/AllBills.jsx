import {connect} from "react-redux"
import {getBillsComparedWithPayments, getProblemsBills} from "../../selectors"
import React, {Fragment, useState} from "react"
import Bills from "../Bills"
import Switch from "@material-ui/core/Switch";

const AllDeals = ({bills, promlemsBills}) => {
    const [isCompareMode, setIsCompareMode] = useState(false)
    const onChangeHandler = () => {
        setIsCompareMode(!isCompareMode)
        setIsOnlyProblems(false)
    }

    const [isOnlyProblems, setIsOnlyProblems] = useState(false)
    const onChangeHandlerIsOnlyProblems = () => {
        setIsOnlyProblems(!isOnlyProblems)
    }

    return (
        <Fragment>
            <Bills billsResult={isOnlyProblems ? promlemsBills : bills} title={'Все счета'} isCompareMode={isCompareMode}/>
            <Switch
                color="primary"
                checked={isCompareMode}
                onChange={onChangeHandler}
            /> Режим сравнения с оплатой
            {isCompareMode && (
                <Fragment>
                    <Switch
                        color="primary"
                        checked={isOnlyProblems}
                        onChange={onChangeHandlerIsOnlyProblems}
                    /> Показать только проблемные
                </Fragment>
            )}

        </Fragment>
    )
}

export default connect(state => ({
    bills: getBillsComparedWithPayments(state),
    promlemsBills: getProblemsBills(state)
}))(AllDeals)