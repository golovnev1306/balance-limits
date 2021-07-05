import React, {CSSProperties, FC, Fragment} from "react"
import {formatNumber} from "../helpers"
import Tooltip from "@material-ui/core/Tooltip"
import {Nullable, SumsType} from '../types'

type PropsType = {
    sums: SumsType
    isActual: boolean
}

const Summary: FC<PropsType> = ({sums, isActual}) => {
    let style: CSSProperties = Object.assign({
        textAlign: 'right' as const,
        padding: '5px', borderRadius: '3px'
    }, isActual ? {'backgroundColor': '#efefff'} : {'backgroundColor': '#ffd0dd'})
    let title = isActual ? 'Итого' : 'Итоги посчитаны для всех данных, невзирая на фильтр, пожалуйста, обновите фильтр'
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5px', color: '#333'}}>
            <Tooltip title={title}>
            <div style={style}>
                <SummaryItem value={sums.sum} title={'Сумма'}/>
                <SummaryItem value={sums.balanceByDeals} title={'Остаток'}/>
                <SummaryItem value={sums.balanceByDealsWithBids} title={'С учетом заявок'}/>
                <SummaryItem value={sums.balanceByPayments} title={'Остаток по оплате'}/>
                <SummaryItem value={sums.economy} title={'Экономия'}/>
            </div>
            </Tooltip>
        </div>
    )
}

type SummaryItemPropsType = {
    value: Nullable<number>
    title: string
}

const SummaryItem: FC<SummaryItemPropsType> = ({value, title}) => {
    return <Fragment>
        {value !== null ? <div className={'summary__item-wrap'}>
            <span className={'summary__item'}>{title}:</span>
            <span>{` ${formatNumber(value)}`}</span>
        </div> : ''}
    </Fragment>
}

export default Summary