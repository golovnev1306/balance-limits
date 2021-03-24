import {connect} from "react-redux";
import {getBills, getDeals, getDealsByLimit, getSelectedDeal} from "../selectors";
import Bills from "./Bills";
import React, {useEffect, useState} from "react";
import CommonTable from "./common/CommonTable";
import DealForm from "./common/forms/DealForm";
import {deleteDealThunk} from "../redux/deals-reducer";
import {countBalances, setSelectedDeal} from "../redux/app-reducer";
import BillsByDeal from "./BillsByDeal";


const Deals = ({deleteDeal, setSelectedDeal, selectedDeal, dealsResult, title, resetPage, setResetPage}) => {

    const handleDelete = () => {
        deleteDeal(selectedDeal.id)
    }

    return (
        <CommonTable resetPage={resetPage}
                     setResetPage={setResetPage}
                     ChildrenForm={DealForm}
                     setSelectedItem={setSelectedDeal}
                     selectedItem={selectedDeal}
                     data={dealsResult}
                     tableName={'deals'}
                     ChildComponent={BillsByDeal}
                     title={title}
                     modalTitlePostfix={'договор'}
                     handleDelete={handleDelete}
        />
    )
}

const mapStateToProps = state => ({
    selectedDeal: getSelectedDeal(state),
})
const mapDispatchToProps = dispatch => {
    return {
        deleteDeal: dealId => dispatch(deleteDealThunk(dealId)),
        setSelectedDeal: selectedDeal => dispatch(setSelectedDeal(selectedDeal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals)