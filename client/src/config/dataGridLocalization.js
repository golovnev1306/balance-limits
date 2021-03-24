export const localizationDataGrid = {
  // Root
  rootGridLabel: 'Таблица',
  noRowsLabel: 'Нет строк',
  errorOverlayDefaultLabel: 'Произошла ошибка.',

  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компактно',
  toolbarDensityStandard: 'Стандартно',
  toolbarDensityComfortable: 'Комфортно',

  // Columns selector toolbar button text
  toolbarColumns: 'Колонки',
  toolbarColumnsLabel: 'Показать выбор колонок',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать Фильтры',
  toolbarFiltersTooltipHide: 'Скрыть Фильтры',
  toolbarFiltersTooltipShow: 'Показать Фильтры',
  toolbarFiltersTooltipActive: (count) => `${count} активных фильтров`,

  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать как CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Найти столбец',
  columnsPanelTextFieldPlaceholder: 'Название столбца',
  columnsPanelDragIconLabel: 'Изменить порядок столбца',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Скрыть все',

  // Filter panel text
  filterPanelAddFilter: 'Добавить Фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelOperators: 'Операторы',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Столбец',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать колонки',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть',
  columnMenuUnsort: 'Убрать сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `${count} активных фильтров`,
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',

  // Rows selected footer text
  footerRowSelected: (count, wd) =>
    count !== 1
      ? `${count.toLocaleString()} строк выбрано`
      : `${count.toLocaleString()} строка выбрана`,

  // Total rows footer text
  footerTotalRows: 'Общее кол-во строк:',

  // Pagination footer text
  footerPaginationRowsPerPage: 'Строк на странице:',
};