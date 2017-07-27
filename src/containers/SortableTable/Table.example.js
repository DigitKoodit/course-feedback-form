import React, { PureComponent } from 'react';
import { AutoSizer, Column, Table, SortDirection, SortIndicator } from 'react-virtualized';

export default class TableExample extends PureComponent {
  // static contextTypes = {
  // list: PropTypes.instanceOf(Immutable.List).isRequired
  // };

  constructor(props) {
    super(props);

    this.state = {
      disableHeader: false,
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 10,
      scrollToIndex: undefined,
      sortBy: 'index',
      sortDirection: SortDirection.DESC,
      useDynamicRowHeight: false
    };

    const { list } = this.props;

    this._getRowHeight = this._getRowHeight.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._rowClassName = this._rowClassName.bind(this);
    this._sort = this._sort.bind(this);
  }

  _getDatum(list, index) {
    return list.get(index % list.size);
  }

  _getRowHeight({ index }) {
    const { list } = this.props;

    return this._getDatum(list, index).size;
  }

  _headerRenderer({ dataKey, sortBy, sortDirection }) {
    return (
      <div>
        Full Name
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  _isSortEnabled() {
    return true;
  }

  _noRowsRenderer() {
    return <div className={'noRows'}>No rows</div>;
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({ rowCount });
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;
    let scrollToIndex = Math.min(
      rowCount - 1,
      parseInt(event.target.value, 10)
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.setState({ scrollToIndex });
  }

  _rowClassName({ index }) {
    if (index < 0) {
      return 'headerRow';
    } else {
      return index % 2 === 0 ? 'evenRow' : 'oddRow';
    }
  }

  _sort({ sortBy, sortDirection }) {
    this.setState({ sortBy, sortDirection });
  }

  _updateUseDynamicRowHeight(value) {
    this.setState({
      useDynamicRowHeight: value
    });
  }

  render() {
    const {
      disableHeader,
      headerHeight,
      height,
      hideIndexRow,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      useDynamicRowHeight
    } = this.state;

    const { list } = this.props;
    const sortedList = this._isSortEnabled()
      ? list
        .sortBy(item => item[sortBy])
        .update(
        list =>
          sortDirection === SortDirection.DESC ? list.reverse() : list
        )
      : list;

    const rowGetter = ({ index }) => this._getDatum(sortedList, index);

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) =>
            <Table
              ref='Table'
              disableHeader={disableHeader}
              headerClassName={'headerColumn'}
              headerHeight={headerHeight}
              height={height}
              noRowsRenderer={this._noRowsRenderer}
              overscanRowCount={overscanRowCount}
              rowClassName={this._rowClassName}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              rowGetter={rowGetter}
              rowCount={rowCount}
              scrollToIndex={scrollToIndex}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
            >
              {!hideIndexRow &&
                <Column
                  label='Index'
                  cellDataGetter={({ rowData }) => rowData.index}
                  dataKey='index'
                  disableSort={!this._isSortEnabled()}
                  width={60}
                />}
              <Column
                dataKey='name'
                disableSort={!this._isSortEnabled()}
                headerRenderer={this._headerRenderer}
                width={110}
              />
              <Column
                width={210}
                disableSort
                label='The description label is really long so that it will be truncated'
                dataKey='random'
                className={'exampleColumn'}
                cellRenderer={({ cellData }) => cellData}
                flexGrow={1}
              />
            </Table>}
        </AutoSizer>
      </div>
    );
  }
}
