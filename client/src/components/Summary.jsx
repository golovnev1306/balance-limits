import React from "react"
import {formatNumber} from "../helpers"
import Tooltip from "@material-ui/core/Tooltip"

const Summary = ({sum, isActual}) => {

    let style = Object.assign({textAlign: 'right', padding: '5px', borderRadius: '3px'}, isActual ? {'backgroundColor': '#efefff'} : {'backgroundColor': '#ffd0dd'})
    let title = isActual ? 'Итого' : 'Итоги посчитаны для всех данных, невзирая на фильтр, пожалуйста, обновите фильтр'
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5px', color: '#333'}}>
            <Tooltip title={title}>
            <div style={style}>
                {sum.sum ? <div>{`Сумма: ${formatNumber(sum.sum)}`}</div> : ''}
                {sum.balance ? <div>{`Остаток: ${formatNumber(sum.balance)}`}</div> : ''}
                {sum.balanceByPayments ? <div>{`Остаток по оплате: ${formatNumber(sum.balanceByPayments)}`}</div> : ''}
            </div>
            </Tooltip>
        </div>
    )
}

export default Summary