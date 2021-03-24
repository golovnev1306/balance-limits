
import {connect} from "react-redux";
import {getSelectedBill} from "../selectors";
import React from "react";
import CommonTable from "./common/CommonTable";
import {deleteBillThunk} from "../redux/bills-reducer";
import BillForm from "./common/forms/BillForm";
import {setSelectedBill} from "../redux/app-reducer";


const Bills = ({deleteBill, selectedBill, setSelectedBill, billsResult, title, resetPage, setResetPage}) => {

    const handleDelete = () => {
        deleteBill(selectedBill.id)
    }

    return (
        <CommonTable ChildrenForm={BillForm}
                     tableName={'bills'}
                     data={billsResult}
                     selectedItem={selectedBill}
                     title={title}
                     setSelectedItem={setSelectedBill}
                     modalTitlePostfix={'счет'}
                     handleDelete={handleDelete}
                     resetPage={resetPage}
                     setResetPage={setResetPage}
        />
    )
}

const mapStateToProps = state => ({selectedBill: getSelectedBill(state)})
const mapDispatchToProps = dispatch => {
    return {
        deleteBill: billId => dispatch(deleteBillThunk(billId)),
        setSelectedBill: selectedBill => {
            dispatch(setSelectedBill(selectedBill))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills)