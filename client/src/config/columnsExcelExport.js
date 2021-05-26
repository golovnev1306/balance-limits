const columnsExcelExport = {
    'limits': [
        {title: 'Наименование', width: {wch: 45}},
        {title: 'КВР'},
        {title: 'КОСГУ'},
        {title: 'КВФО'},
        {title: 'Отраслевой код', width: {wch: 20}},
        {title: 'Сумма'},
        {title: 'Остаток по договорам',  width: {wch: 15}},
        {title: 'Включая заявки',  width: {wch: 15}},
        {title: 'Остаток по оплате',  width: {wch: 15}},
    ],
    'deals': [
        {title: 'Номер', width: {wch: 15}},
        {title: 'Дата'},
        {title: 'Продукт', width: {wch: 20}},
        {title: 'Партнер', width: {wch: 30}},
        {title: 'КВР'},
        {title: 'КОСГУ'},
        {title: 'КВФО'},
        {title: 'Отраслевой код', width: {wch: 20}},
        {title: 'Сумма'},
        {title: 'Остаток'},
        {title: 'Является заявкой', width: {wch: 16}}
    ],
    'bills': [
        {title: 'Номер', width: {wch: 17}},
        {title: 'Партнер', width: {wch: 30}},
        {title: 'Дата'},
        {title: 'КВР'},
        {title: 'КОСГУ'},
        {title: 'КВФО'},
        {title: 'Отраслевой код', width: {wch: 20}},
        {title: 'Сумма'}
    ],
    'payments': [
        { title: 'Номер', width: {wch: 17}},
        { title: 'Партнер', width: {wch: 30}},
        { title: 'Дата'},
        { title: 'Назначение платежа', width: {wch: 45}},
        { title: 'КВР'},
        { title: 'КОСГУ'},
        { title: 'КВФО'},
        { title: 'Отраслевой код', width: {wch: 20}},
        { title: 'Сумма'}
    ]
}

export default columnsExcelExport