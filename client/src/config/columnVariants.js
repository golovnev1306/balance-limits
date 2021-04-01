const columnVariants = {
    'limits': [
        {field: 'name', headerName: 'Наименование', flex: 1, cellClassName: 'super-app-theme--cell'},
        {field: 'kvr', headerName: 'КВР', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'kvfo', headerName: 'КВФО', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: 'super-app-theme--cell', width: 150},
        {
            field: 'balance',
            headerName: 'Остаток по договорам',
            cellClassName: 'super-app-theme--cell',
            type: 'number',
            width: 180
        },
        {
            field: 'balanceByPayments',
            headerName: 'Остаток по оплате',
            cellClassName: 'super-app-theme--cell',
            type: 'number',
            width: 180
        },
    ],
    'deals': [
        {field: 'number', headerName: 'Номер', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'date', headerName: 'Дата', type: 'date', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'product', headerName: 'Продукт', width: 150, cellClassName: 'super-app-theme--cell'},
        {field: 'partner', headerName: 'Партнер', width: 170, cellClassName: 'super-app-theme--cell'},
        {field: 'kvr', headerName: 'КВР', width: 110, cellClassName: 'super-app-theme--cell'},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'kvfo', headerName: 'КВФО', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: 'super-app-theme--cell', width: 150},
        {field: 'balance', headerName: 'Остаток', type: 'number', cellClassName: 'super-app-theme--cell', width: 150}
    ],
    'bills': [
        {field: 'number', headerName: 'Номер', width: 150, cellClassName: 'super-app-theme--cell'},
        {field: 'partner', headerName: 'Партнер', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'date', headerName: 'Дата', type: 'date', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'kvr', headerName: 'КВР', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'kosgu', headerName: 'КОСГУ', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'kvfo', headerName: 'КВФО', width: 130, cellClassName: 'super-app-theme--cell'},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: 'super-app-theme--cell', flex: 1}
    ],
    'payments': [
        {field: 'number', headerName: 'Номер', width: 110, cellClassName: 'super-app-theme--cell'},
        {field: 'partner', headerName: 'Партнер', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'date', headerName: 'Дата', type: 'date', width: 130, cellClassName: 'super-app-theme--cell'},
        {
            field: 'purpose_of_payment',
            headerName: 'Назначение платежа',
            width: 320,
            cellClassName: 'super-app-theme--cell'
        },
        {field: 'kvr', headerName: 'КВР', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'kosgu', headerName: 'КОСГУ', width: 100, cellClassName: 'super-app-theme--cell'},
        {field: 'kvfo', headerName: 'КВФО', width: 94, cellClassName: 'super-app-theme--cell'},
        {field: 'ok', headerName: 'Отраслевой код', width: 200, cellClassName: 'super-app-theme--cell'},
        {field: 'summ', headerName: 'Сумма', type: 'number', cellClassName: 'super-app-theme--cell', flex: 1}
    ]
}

export default columnVariants