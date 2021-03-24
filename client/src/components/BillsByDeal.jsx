import {connect} from "react-redux";
import React from "react";
import {getBillsByDeal} from "../selectors";
import Bills from "./Bills";

const BillsByDeal = ({bills, resetPageChildTable, setResetPageChildTable}) => {

    return (
        <Bills resetPage={resetPageChildTable} setResetPage={setResetPageChildTable} billsResult={bills} title={'Счета по выбранному договору'}/>
    )
}

const mapStateToProps = state => ({bills: getBillsByDeal(state)})


export default connect(mapStateToProps)(BillsByDeal)