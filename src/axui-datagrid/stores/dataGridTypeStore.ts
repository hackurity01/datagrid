export type DataGridSelection = {
  x?: number;
  y?: number;
};

export type DataGridRect = {
  x?: number;
  y?: number;
  width: number;
  height?: number;
};

export type DataGridColumnKeys = {
  selected: string;
  modified: string;
  deleted: string;
  disableSelection: string;
};

export type DataGridColumn = {
  key?: string;
  width?: number;
  label?: string;
  align?: string | ColTextAlign;
  formatter?: () => void | string;
  colSpan?: number;
  rowSpan?: number;
  rowIndex?: number;
  colIndex?: number;
  hidden?: boolean;
  columns?: DataGridColumn[];
  depth?: number;
};

export type DataGridColumnTableMapRow = {
  cols: DataGridColumn[];
};

export type DataGridColumnTableMap = {
  rows: DataGridColumnTableMapRow[];
};

export type DataGridCol = {
  key?: string;
  label?: string;
  width?: number | string;
  align?: string | ColTextAlign;
  colIndex?: number;
  rowIndex?: number;
  colSpan?: number;
  rowSpan?: number;
  formatter?: string | Function;
  _ex?: number;
  _sx?: number;
  _width?: number;
};

export type DataGridOptionHeader = {
  display?: boolean;
  align?: string | ColTextAlign;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  selector?: boolean;
  sortable?: boolean;
  enableFilter?: boolean;
  clickAction?: string;
};

export type DataGridOptionBody = {
  align?: string | ColTextAlign;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  grouping?: boolean;
  mergeCells?: boolean;
};

export type DataGridOptionPageButton = {
  className: string;
  onClick: string | Function;
  width?: number;
};

export type DataGridOptionPage = {
  buttonsContainerWidth?: number;
  buttons?: DataGridOptionPageButton[];
  buttonHeight?: number;
  height?: number;
};

export type DataGridOptionScroller = {
  size?: number;
  arrowSize?: number;
  barMinSize?: number;
  padding?: number;
  disabledVerticalScroll?: boolean;
};

export type DataGridOptions = {
  frozenColumnIndex?: number;
  frozenRowIndex?: number;
  showLineNumber?: boolean;
  showRowSelector?: boolean;
  multipleSelect?: boolean;
  columnMinWidth?: number;
  lineNumberColumnWidth?: number;
  rowSelectorColumnWidth?: number;
  remoteSort?: boolean;
  asidePanelWidth?: number;
  header?: DataGridOptionHeader;
  body?: DataGridOptionBody;
  page?: DataGridOptionPage;
  scroller?: DataGridOptionScroller;
  columnKeys: DataGridColumnKeys;
  footSum?: boolean;
};

export type DataGridStyle = {
  calculatedHeight: number;
  asidePanelWidth: number;
  frozenPanelWidth: number;
  bodyTrHeight: number;
  elWidth: number;
  elHeight: number;
  CTInnerWidth: number;
  CTInnerHeight: number;
  rightPanelWidth: number;
  headerHeight: number;
  bodyHeight: number;
  frozenPanelHeight: number;
  footSumHeight: number;
  pageHeight: number;
  verticalScrollerWidth: number;
  horizontalScrollerHeight: number;
  scrollContentContainerHeight: number;
  scrollContentHeight: number;
  scrollContentContainerWidth: number;
  scrollContentWidth: number;
  verticalScrollerHeight: number;
  verticalScrollBarHeight: number;
  horizontalScrollerWidth: number;
  horizontalScrollBarWidth: number;
  scrollerPadding: number;
  scrollerArrowSize: number;
  pageButtonsContainerWidth: number;
};

export type DataGridFormatterData = {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: DataGridOptions;
};

export type DataGridEditingCell = {
  row?: number;
  col?: number;
  editor?: any;
};

// todo : enum으로 키 타입 정의가 왜 안되는지 확인 필요.
export enum ColTextAlign {
  'Left' = 'left',
  'Center' = 'center',
  'Right' = 'right',
}
