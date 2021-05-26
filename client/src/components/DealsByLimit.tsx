import {connect} from "react-redux"
import React, {FC} from "react"
import Deals from "./Deals"
import {getDealsByLimit} from "../selectors"
import {DealType, StateType} from "../types"

type MapStatePropsType = {
    deals: DealType[]
}

type OwnPropsType = {
    resetPageChildTable: boolean
    setResetPageChildTable: (isReset: boolean) => void
}

const DealsByLimit: FC<MapStatePropsType & OwnPropsType> = ({deals, resetPageChildTable, setResetPageChildTable}) => {

    return (
        <Deals resetPage={resetPageChildTable} setResetPage={setResetPageChildTable} dealsResult={deals} title={'Договоры по выбранному лимиту'}/>
    )
}

export default connect<MapStatePropsType, {}, OwnPropsType, StateType>((state: StateType) => ({deals: getDealsByLimit(state)}))(DealsByLimit)