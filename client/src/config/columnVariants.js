import {DEFAULT_CELL_CLASS} from "../constants";

const columnVariants = {
    'limits': [
        {field: 'name', headerName: 'Наименование', flex: 1, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvr', headerName: 'КВР', width: 90, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvfo', headerName: 'КВФО', width: 100, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'ok', headerName: 'Отраслевой код', width: 180, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: DEFAULT_CELL_CLASS, width: 150},
        {
            field: 'balance',
            headerName: 'Остаток по договорам',
            cellClassName: DEFAULT_CELL_CLASS,
            type: 'number',
            width: 150
        },
        {
            field: 'balanceByBids',
            headerName: 'С учетом заявок',
            cellClassName: DEFAULT_CELL_CLASS,
            type: 'number',
            width: 150
        },
        {
            field: 'balanceByPayments',
            headerName: 'Остаток по оплате',
            cellClassName: DEFAULT_CELL_CLASS,
            type: 'number',
            width: 150
        },
    ],
    'deals': [
        {field: 'number', headerName: 'Номер', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'date', headerName: 'Дата', type: 'date', width: 110, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'product', headerName: 'Продукт', flex: 1, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'partner', headerName: 'Партнер', width: 170, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvr', headerName: 'КВР', width: 90, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvfo', headerName: 'КВФО', width: 95, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'ok', headerName: 'Отраслевой код', width: 180, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: DEFAULT_CELL_CLASS, width: 150},
        {field: 'balance', headerName: 'Остаток', type: 'number', cellClassName: DEFAULT_CELL_CLASS, width: 150},
        {field: 'is_bid', width: 0},
    ],
    'bills': [
        {field: 'number', headerName: 'Номер', width: 150, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'partner', headerName: 'Партнер', flex: 1, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'date', headerName: 'Дата', type: 'date', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvr', headerName: 'КВР', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kosgu', headerName: 'КОСГУ', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvfo', headerName: 'КВФО', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: DEFAULT_CELL_CLASS, width: 150}
    ],
    'payments': [
        {field: 'number', headerName: 'Номер', width: 110, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'partner', headerName: 'Партнер', width: 200, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'date', headerName: 'Дата', type: 'date', width: 130, cellClassName: DEFAULT_CELL_CLASS},
        {
            field: 'purpose_of_payment',
            headerName: 'Назначение платежа',
            width: 320,
            cellClassName: DEFAULT_CELL_CLASS
        },
        {field: 'kvr', headerName: 'КВР', width: 100, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'kvfo', headerName: 'КВФО', width: 94, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: DEFAULT_CELL_CLASS},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: DEFAULT_CELL_CLASS, flex: 1}
    ]
}

export default columnVariants