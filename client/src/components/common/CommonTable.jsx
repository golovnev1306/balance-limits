import {DataGrid} from "@material-ui/data-grid"
import React, {useEffect, useMemo, useState} from "react"
import columnVariants from "../../config/columnVariants"
import Tooltip from "@material-ui/core/Tooltip"
import TransitionsModal from "./TransitionsModal"
import AlertDialogSlide from "./AlertDialogSlide"
import {localizationDataGrid} from "../../config/dataGridLocalization"
import Moment from "react-moment"
import Summary from "../Summary"
import {formatNumber} from "../../helpers"
import {getPageSizes} from "../../selectors"
import {connect} from "react-redux"
import {setPageSizes} from "../../redux/app-reducer"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";


const renderCell = params => {
    let value
    switch (params.colDef.type) {
        case 'date':
            value = (<Moment format="DD.MM.YYYY">
                {params.value}
            </Moment>)
            break
        case 'number':
            value = formatNumber(params.value)
            break
        default:
            value = params.value
    }

    return (<Tooltip title={value} placement="bottom-start">
        <span>{value}</span>
    </Tooltip>)
}


const CommonTable = ({
                         title, selectedItem, setSelectedItem, tableName, data, ChildComponent, modalTitlePostfix,
                         handleDelete, ChildrenForm, resetPage, setResetPage, pageSizes, setPageSize,
                         isCompareMode, isDeals, showModeDeals, setShowModeDeals
                     }) => {

    const memoizedColumns = useMemo(() => {
        const columns = columnVariants[tableName]
        columns.map(column => {
            column.renderCell = renderCell
            if (isCompareMode) {
                column.cellClassName = ({row}) => {
                    return Object.keys(row.found).length === 0 ? 'not-comparing' : 'comparing'
                }
            } else {
                delete column.cellClassName
            }

            if (isDeals) {
                column.cellClassName = ({row}) => {
                    return row.is_bid ? 'is-bid' : ''
                }
            }
        })
        return [...columns]
    }, [isCompareMode])


    const [sums, setSums] = useState({})

    // костылек, предупреждающий о том, что итоги могут не соответствовать действительности,
    // в случае, если стоит фильтрация и происходит изменение данных в этой таблицы.
    // Требует доработки (необходимо разобраться в api фильтров material ui)
    // по-хорошему, нужно пилить свою фильтрацию
    const [isFiltering, setIsFiltering] = useState(false)
    const [isActual, setIsActual] = useState(true)

    //даем знать дочерней таблице, что нужно обнулить page
    const [resetPageChildTable, setResetPageChildTable] = useState(false)

    const [page, setPage] = useState(0)

    useEffect(() => {
        if (resetPage) {
            setPage(0)
            setResetPage(false)
        }
    }, [resetPage])

    useEffect(() => {
        countSummary(data)
        if (isFiltering) {
            setIsActual(false)
        }
    }, [data])


    const countSummary = data => {
        let sum = 0
        let balance = 0
        let balanceByPayments = 0
        data.map(i => {
            sum += i.summ
            balance += i.balance
            balanceByPayments += i.balanceByPayments
        })

        setSums({
            sum, balance, balanceByPayments
        })
    }

    const pageChangeHandler = params => {
        setPage(params.page)
    }

    const pageSizeChangeHandler = params => {
        setPageSize({[tableName]: params.pageSize})
    }

    const rowSelectedHandler = params => {
        setSelectedItem(params.data)
        setResetPageChildTable(true)
    }

    const filterModelChange = filterModel => {
        if (!filterModel.filterModel.items[0].value) {
            setIsFiltering(false)
        } else {
            setIsFiltering(true)
        }

        countSummary(filterModel.visibleRows)
        setIsActual(true)
    }

    return (
        <div style={{margin: '25px 0'}}>
            <h3>{title}</h3>
            <div style={{margin: '15px 0'}}>
                <TransitionsModal ChildrenForm={ChildrenForm}
                                  mode={'add'}
                                  selectedItem={selectedItem}
                                  color="primary"
                                  title={'Добавить'}
                                  modalTitlePostfix={modalTitlePostfix}
                />
                {selectedItem?.id && (
                    <>
                        <TransitionsModal ChildrenForm={ChildrenForm}
                                          mode={'copy'}
                                          selectedItem={selectedItem}
                                          style={{marginLeft: '10px'}}
                                          color="primary"
                                          title={'Скопировать'}
                                          modalTitlePostfix={modalTitlePostfix}
                        />


                        <TransitionsModal ChildrenForm={ChildrenForm}
                                          mode={'update'}
                                          selectedItem={selectedItem}
                                          style={{marginLeft: '10px'}}
                                          title={'Изменить'}
                                          modalTitlePostfix={modalTitlePostfix}
                                          withButton={true}
                        />
                    </>)}
                {selectedItem?.id && (
                    <AlertDialogSlide selectedItem={selectedItem} style={{marginLeft: '10px'}}
                                      handleDelete={handleDelete}
                                      modalTitlePostfix={modalTitlePostfix}/>)}
            </div>

            <DataGrid
                onPageSizeChange={pageSizeChangeHandler}
                onPageChange={pageChangeHandler}
                rowHeight={35}
                headerHeight={50}
                hideFooterSelectedRowCount
                columns={memoizedColumns}
                rows={data}
                localeText={localizationDataGrid}
                showCellRightBorder
                autoHeight
                pageSize={pageSizes[tableName]}
                page={page}
                rowsPerPageOptions={[10, 50, 100, 10000]}
                onRowSelected={rowSelectedHandler}
                onFilterModelChange={filterModelChange}
            />
            <Grid container>
                {isDeals && <Grid item sm={4} xs={12}>
                    <Select fullWidth onChange={value => {setShowModeDeals(value.target.value)}} value={showModeDeals}>
                        <MenuItem value="all">Все</MenuItem>
                        <MenuItem value="onlyDeals">Только договоры</MenuItem>
                        <MenuItem value="onlyBids">Только заявки</MenuItem>
                    </Select></Grid>}
                <Grid item sm={isDeals ? 8 : 12} xs={12}><Summary sums={sums} isActual={isActual}/></Grid>
            </Grid>


            {selectedItem?.id && ChildComponent && (
                <ChildComponent resetPageChildTable={resetPageChildTable}
                                setResetPageChildTable={setResetPageChildTable} selectedItem={selectedItem}/>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        pageSizes: getPageSizes(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPageSize: pageSizeObj => dispatch(setPageSizes(pageSizeObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonTable)