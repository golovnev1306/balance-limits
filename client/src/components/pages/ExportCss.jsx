import React, {useEffect, useState} from "react"
import Button from "@material-ui/core/Button"
import ReactExport from 'react-data-export'
import {getBills, getDealsWithBalances, getLimitsWithBalances, getPayments} from "../../selectors"
import {connect} from "react-redux"
import {convertToExcelData} from "../../helpers";

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet


const ExportCss = ({limits, deals, bills, payments}) => {
    const [DataSet, setDataSet] = useState({})

    useEffect(() => {

        const Limits = convertToExcelData(limits, 'limits')
        const Deals = convertToExcelData(deals, 'deals')
        const Bills = convertToExcelData(bills, 'bills')
        const Payments = convertToExcelData(payments, 'payments')
        setDataSet({Limits, Deals, Bills, Payments})
    }, [limits, deals, bills, payments])


    return (
        <ExcelFile filename={'export_' + new Date().toLocaleDateString()} element={<Button variant={'outlined'} color="primary">Экспортировать все</Button>}>
            <ExcelSheet dataSet={DataSet.Limits} name="Лимиты"/>
            <ExcelSheet dataSet={DataSet.Deals} name="Договоры"/>
            <ExcelSheet dataSet={DataSet.Bills} name="Счета"/>
            <ExcelSheet dataSet={DataSet.Payments} name="Оплата"/>
        </ExcelFile>
    )
}

const mapStateToProps = state => {
    return {
        limits: getLimitsWithBalances(state),
        deals: getDealsWithBalances(state),
        bills: getBills(state),
        payments: getPayments(state)
    }
}

export default connect(mapStateToProps)(ExportCss)