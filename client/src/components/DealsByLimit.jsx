import {connect} from "react-redux"
import React from "react"
import Deals from "./Deals"
import {getDealsByLimit} from "../selectors"

const DealsByLimit = ({deals, resetPageChildTable, setResetPageChildTable}) => {

    return (
        <Deals resetPage={resetPageChildTable} setResetPage={setResetPageChildTable} dealsResult={deals} title={'Договоры по выбранному лимиту'}/>
    )
}

export default connect(state => ({deals: getDealsByLimit(state)}))(DealsByLimit)