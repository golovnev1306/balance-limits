import {connect} from "react-redux"
import {getSelectedBill, getSelectedPayment} from "../selectors"
import React, {FC, Fragment} from "react"
import CommonTable from "./common/CommonTable"
import {setSelectedBill, setSelectedPayment} from "../redux/app-reducer"
import {deletePaymentThunk} from "../redux/payments-reducer";
import PaymentForm from "./common/forms/PaymentForm";
import BillForm from "./common/forms/BillForm";
import {deleteBillThunk} from "../redux/bills-reducer";
import {BillType, Nullable, PaymentType, StateType, TDispatch} from "../types";


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
    paymentsResult: PaymentType[]
    title: string
    resetPage?: boolean
    setResetPage?: (isReset: boolean) => void
    isCompareMode?: boolean
}

const PaymentsByLimit: FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = ({deletePayment, deleteBill,
      setSelectedPayment, selectedPayment, selectedBill, setSelectedBill,
      paymentsResult, title, resetPage, setResetPage, isCompareMode}) => {

    const handleDelete = () => {
        if (selectedPayment)
        deletePayment(selectedPayment.id)
    }

    const handleDeleteBill = () => {
        if (selectedBill)
        deleteBill(selectedBill.id)
    }

    return (
        <Fragment>
            {/*@ts-ignore*/}
        <CommonTable ChildrenForm={PaymentForm}
                     setSelectedItem={setSelectedPayment}
                     selectedItem={selectedPayment}
                     data={paymentsResult}
                     tableName={'payments'}
                     title={title}
                     modalTitlePostfix={'оплату'}
                     handleDelete={handleDelete}
                     resetPage={resetPage}
                     setResetPage={setResetPage}
                     isCompareMode={isCompareMode}
        />
            {isCompareMode && selectedPayment?.id && (
                <Fragment>
                {/*@ts-ignore*/}
                <CommonTable ChildrenForm={BillForm}
                             tableName={'bills'}
                             data={selectedPayment.available ? selectedPayment.available : []}
                             selectedItem={selectedBill}
                             title={'Свободные счета совпавшие по кодам'}
                             setSelectedItem={setSelectedBill}
                             modalTitlePostfix={'счет'}
                             handleDelete={handleDeleteBill}
                /></Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({selectedBill: getSelectedBill(state), selectedPayment: getSelectedPayment(state)})
const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        deleteBill: billId => dispatch(deleteBillThunk(billId)),
        setSelectedBill: selectedBill => {
            dispatch(setSelectedBill(selectedBill))
        },
        deletePayment: paymentId => dispatch(deletePaymentThunk(paymentId)),
        setSelectedPayment: selectedPayment => {
            dispatch(setSelectedPayment(selectedPayment))
        }
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(mapStateToProps, mapDispatchToProps)(PaymentsByLimit)