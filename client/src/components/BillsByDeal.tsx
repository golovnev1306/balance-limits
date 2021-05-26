import {connect} from "react-redux"
import React, {FC} from "react"
import {getBillsByDeal} from "../selectors"
import Bills from "./Bills"
import {BillType, Nullable, PaymentType, StateType} from "../types";

type MapStatePropsType = {
    bills: BillType[]
}

type OwnPropsType = {
    resetPageChildTable: boolean
    setResetPageChildTable: (isReset: boolean) => void
}

const BillsByDeal: FC<MapStatePropsType & OwnPropsType> = ({bills, resetPageChildTable, setResetPageChildTable}) => {

    return (
        <Bills resetPage={resetPageChildTable}
               setResetPage={setResetPageChildTable}
               billsResult={bills}
               title={'Счета по выбранному договору'}
        />
    )
}

const mapStateToProps = (state: StateType) => ({bills: getBillsByDeal(state)})


export default connect(mapStateToProps)(BillsByDeal)