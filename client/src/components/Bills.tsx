import {connect} from "react-redux"
import {getSelectedBill, getSelectedPayment} from "../selectors"
import React, {FC, Fragment} from "react"
import CommonTable from "./common/CommonTable"
import {deleteBillThunk} from "../redux/bills-reducer"
import BillForm from "./common/forms/BillForm"
import {setSelectedBill, setSelectedPayment} from "../redux/app-reducer"
import {deletePaymentThunk} from "../redux/payments-reducer"
import {BillType, Nullable, PaymentType, StateType, TDispatch} from "../types";
import PaymentForm from "./common/forms/PaymentForm";

type MapStatePropsType = {
    selectedBill: Nullable<BillType>,
    selectedPayment: Nullable<PaymentType>
}

type MapDispatchPropsType = {
    deleteBill: (billId: number) => void,
    setSelectedBill: (selectedBill: BillType) => void,
    deletePayment: (paymentId: number) => void,
    setSelectedPayment: (selectedPayment: PaymentType) => void
}

type OwnPropsType = {
    billsResult: BillType[]
    title: string
    resetPage?: boolean
    setResetPage?: (isReset: boolean) => void
    isCompareMode?: boolean
}

const Bills: FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = ({deleteBill, deletePayment, selectedBill,
                                                                                selectedPayment, setSelectedBill,
                                                                                setSelectedPayment, billsResult,
                                                                                title, resetPage, setResetPage,
                                                                                isCompareMode}) => {

    const handleDeleteBill = () => {
        if (selectedBill)
        deleteBill(selectedBill.id)
    }

    const handleDeletePayment = () => {
        if (selectedPayment)
        deletePayment(selectedPayment.id)
    }

    return (
        <Fragment>
            {/*@ts-ignore*/}
            <CommonTable ChildrenForm={BillForm}
                         tableName={'bills'}
                         data={billsResult}
                         selectedItem={selectedBill}
                         title={title}
                         setSelectedItem={setSelectedBill}
                         modalTitlePostfix={'счет'}
                         handleDelete={handleDeleteBill}
                         resetPage={resetPage}
                         setResetPage={setResetPage}
                         isCompareMode={isCompareMode}
            />
            {isCompareMode && selectedBill?.id && (
                <Fragment>
                {/*@ts-ignore*/}
                <CommonTable ChildrenForm={PaymentForm}
                             tableName={'payments'}
                             data={selectedBill.available ? selectedBill.available : []}
                             title={'Cвободная оплата, совпавшая по кодам'}
                             modalTitlePostfix={'оплату'}
                             handleDelete={handleDeletePayment}
                             selectedItem={selectedPayment}
                             setSelectedItem={setSelectedPayment}
                />
                </Fragment>
            )}
        </Fragment>

    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => (
    {
        selectedBill: getSelectedBill(state),
        selectedPayment: getSelectedPayment(state)
    })
const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        deleteBill: (billId: number) => dispatch(deleteBillThunk(billId)),
        setSelectedBill: (selectedBill: BillType) => {
            dispatch(setSelectedBill(selectedBill))
        },
        deletePayment: (paymentId: number) => dispatch(deletePaymentThunk(paymentId)),
        setSelectedPayment: (selectedPayment: PaymentType) => {
            dispatch(setSelectedPayment(selectedPayment))
        }
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(mapStateToProps, mapDispatchToProps)(Bills)