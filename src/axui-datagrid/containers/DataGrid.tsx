import * as React from 'react';
import { DataGridStore, IDataGridState } from '../providers';
import { DataGridHeader } from '../components';
import { types } from '../stores';
import {
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  divideTableByFrozenColumnIndex,
  getPathValue,
} from '../utils';

interface IProps extends types.DataGrid {}
interface IState extends IDataGridState {}

class DataGrid extends React.Component<IProps, IState> {
  static defaultColumnKeys: types.DataGridColumnKeys = {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__',
  };
  static defaultHeader: types.DataGridOptionHeader = {
    display: true,
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true,
    sortable: true,
    enableFilter: true,
    clickAction: 'sort',
  };
  static defaultBody: types.DataGridOptionBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
  };
  static defaultPageButtons: types.DataGridOptionPageButton[] = [
    { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
  ];
  static defaultPage: types.DataGridOptionPage = {
    buttonsContainerWidth: 150,
    buttons: DataGrid.defaultPageButtons,
    buttonHeight: 16,
    height: 20,
  };
  static defaultScroller: types.DataGridOptionScroller = {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    disabledVerticalScroll: false,
  };
  static defaultOptions: types.DataGridOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 40,
    rowSelectorColumnWidth: 28,
    remoteSort: false,
    asidePanelWidth: 0,
    header: DataGrid.defaultHeader,
    body: DataGrid.defaultBody,
    page: DataGrid.defaultPage,
    scroller: DataGrid.defaultScroller,
    columnKeys: DataGrid.defaultColumnKeys,
  };
  static defaultStyles: types.DataGridStyles = {
    calculatedHeight: -1,
    asidePanelWidth: 0,
    frozenPanelWidth: 0,
    bodyTrHeight: 0,
    elWidth: 0,
    elHeight: 0,
    CTInnerWidth: 0,
    CTInnerHeight: 0,
    rightPanelWidth: 0,
    headerHeight: 0,
    bodyHeight: 0,
    frozenPanelHeight: 0,
    footSumHeight: 0,
    pageHeight: 0,
    verticalScrollerWidth: 0,
    horizontalScrollerHeight: 0,
    scrollContentContainerHeight: 0,
    scrollContentHeight: 0,
    scrollContentContainerWidth: 0,
    scrollContentWidth: 0,
    verticalScrollerHeight: 0,
    verticalScrollBarHeight: 0,
    horizontalScrollerWidth: 0,
    horizontalScrollBarWidth: 0,
    scrollerPadding: 0,
    scrollerArrowSize: 0,
    pageButtonsContainerWidth: 0,
  };

  state = {
    data: [],
    filteredList: [],
    scrollLeft: 0,
    scrollTop: 0,
    selectionRows: {},
    selectionCols: {},
    focusedRow: -1,
    focusedCol: -1,

    colGroup: [],
    colGroupMap: {},
    asideColGroup: [],
    leftHeaderColGroup: [],
    headerColGroup: [],
    asideHeaderData: {},
    leftHeaderData: {},
    headerData: {},
    asideBodyRowData: {},
    leftBodyRowData: {},
    bodyRowData: {},
    bodyRowMap: {},
    asideBodyGroupingData: {},
    leftBodyGroupingData: {},
    bodyGroupingData: {},
    bodyGroupingMap: {},
    options: DataGrid.defaultOptions,
    styles: DataGrid.defaultStyles,
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { options, styles } = state;
    let currentOptions: types.DataGridOptions = {
      ...(options || DataGrid.defaultOptions),
    };
    let currentStyles: types.DataGridStyles = {
      ...(styles || DataGrid.defaultStyles),
    };

    const optionHeader = (options && options.header) || DataGrid.defaultHeader;
    const optionBody = (options && options.body) || DataGrid.defaultBody;
    const optionPage = (options && options.page) || DataGrid.defaultPage;
    const optionScroll =
      (options && options.scroller) || DataGrid.defaultScroller;
    const optionColumnKeys =
      (options && options.columnKeys) || DataGrid.defaultColumnKeys;

    let changeState = false;
    let newState: IState = { ...state };

    if (props.data !== state.data) {
      changeState = true;
      newState.data = props.data || [];
      newState.filteredList = newState.data.filter(n => {
        return !n[optionColumnKeys.deleted];
      });
    }

    if (props.height !== state.height) {
      changeState = true;
      newState.height = props.height;
    }

    if (JSON.stringify(props.options) !== state.optionsString) {
      // convert options
      currentOptions = { ...(props.options || DataGrid.defaultOptions) };
    }

    if (JSON.stringify(props.columns) !== state.columnsString) {
      const frozenColumnIndex: number = getPathValue(
        currentOptions,
        ['frozenColumnIndex'],
        DataGrid.defaultOptions.frozenColumnIndex,
      );
      const columnHeight: number = getPathValue(
        currentOptions,
        ['body', 'columnHeight'],
        DataGrid.defaultBody.columnHeight,
      );

      let headerDividedObj, bodyDividedObj;

      // convert colGroup
      newState.headerTable = makeHeaderTable(props.columns, currentOptions);
      newState.bodyRowTable = makeBodyRowTable(props.columns, currentOptions);
      newState.bodyRowMap = makeBodyRowMap(
        newState.bodyRowTable,
        currentOptions,
      );

      // header를 위한 divide
      headerDividedObj = divideTableByFrozenColumnIndex(
        newState.headerTable,
        frozenColumnIndex || 0,
        currentOptions,
      );
      // body를 위한 divide
      bodyDividedObj = divideTableByFrozenColumnIndex(
        newState.bodyRowTable,
        frozenColumnIndex || 0,
        currentOptions,
      );

      newState.asideHeaderData = headerDividedObj.asideData;
      newState.leftHeaderData = headerDividedObj.leftData;
      newState.headerData = headerDividedObj.rightData;
      newState.asideColGroup = headerDividedObj.asideColGroup;

      newState.asideBodyRowData = bodyDividedObj.asideData;
      newState.leftBodyRowData = bodyDividedObj.leftData;
      newState.bodyRowData = bodyDividedObj.rightData;

      newState.leftHeaderColGroup = [];
      newState.headerColGroup = [];
      newState.colGroup = [];
      newState.colGroupMap = {};

      newState.bodyGrouping = [];

      // newState.bodyGroupingTable = {};
      newState.asideBodyGroupingData = {};
      newState.leftBodyGroupingData = {};
      newState.bodyGroupingData = {};
      newState.bodyGroupingMap = {};

      /*
      newState.footSumColumns = [];
      newState.footSumTable = {};
      newState.leftFootSumData = {};
      newState.footSumData = {};
      */

      // styles
      currentStyles.asidePanelWidth = headerDividedObj.asidePanelWidth;
      currentStyles.bodyTrHeight =
        newState.bodyRowTable.rows.length * columnHeight;

      newState.columnsString = JSON.stringify(props.columns);
    }

    return changeState ? newState : null;
  }

  public render() {
    // const { data: receiveData, options, columns, style, height } = this.props;
    const param = {
      data: this.state.data,
    };

    return (
      <DataGridStore.Provider {...param}>
        <DataGridHeader />
        <div>DATAGRID</div>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;