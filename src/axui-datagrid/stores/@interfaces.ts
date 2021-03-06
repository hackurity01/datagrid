import * as types from './@types';

export interface IPosition {
  x?: number;
  y?: number;
}

export interface IRect extends IPosition {
  width: number;
  height?: number;
}

export interface ICol {
  key?: string;
  label?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right' | string;
  colSpan?: number;
  rowSpan?: number;
}

export interface IDataGridEditingCell {
  rowIndex?: number;
  colIndex?: number;
  editor?: any;
}

export interface IDataGridFormatterData {
  data?: any;
  item?: any;
  index?: number;
  key?: string;
  value?: any;
  options?: any;
}

export type formatterFunction = (
  formatterData: types.DataGridFormatterData,
) => any;

export type editorFunction = (editorData: types.DataGridFormatterData) => void;

export type userCallBackFunction = (param?: any) => void;

export interface IDataGridFormatter {
  [key: string]: formatterFunction;
}

export interface IDataGridCol extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  editor?: editorFunction | string | { type?: string };
  _ex?: number;
  _sx?: number;
  _width?: number;
  columnAttr?: string;
}

export interface IDataGridColumn extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  editor?: editorFunction | string | { type?: string };
  hidden?: boolean;
  columns?: IDataGridColumn[];
  depth?: number;
}

export interface IDataGridColumnKeys {
  selected?: string;
  modified?: string;
  deleted?: string;
  disableSelection?: string;
}

export interface IDataGridMoving {
  active?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}
