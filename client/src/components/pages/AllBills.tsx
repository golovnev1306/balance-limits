import {connect} from "react-redux"
import {getBillsComparedWithPayments, getProblemsBills} from "../../selectors"
import React, {FC, Fragment, useState} from "react"
import Bills from "../Bills"
import Switch from "@material-ui/core/Switch"
import {BillType, StateType} from "../../types";

type MapStatePropsType = {
    bills: BillType[],
    problemsBills: BillType[]
}

const AllDeals: FC<MapStatePropsType> = ({bills, problemsBills}) => {
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
            <Bills billsResult={isOnlyProblems ? problemsBills : bills} title={'Все счета'} isCompareMode={isCompareMode}/>
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

export default connect<MapStatePropsType, {}, {}, StateType>((state: StateType) => ({
    bills: getBillsComparedWithPayments(state),
    problemsBills: getProblemsBills(state)
}))(AllDeals)