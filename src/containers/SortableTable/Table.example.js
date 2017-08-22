import React, { PureComponent } from 'react';
import { AutoSizer, Column, Table, SortDirection, SortIndicator } from 'react-virtualized';

export default class TableExample extends PureComponent {
  // static contextTypes = {
  // list: PropTypes.instanceOf(Immutable.List).isRequired
  // };

  constructor(props) {
    super(props);
    const { list } = this.props;

    this.state = {
      list,
      disableHeader: false,
      headerHeight: 30,
      height: 800,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: list.size,
      scrollToIndex: undefined,
      sortBy: 'id',
      sortDirection: SortDirection.DESC,
      useDynamicRowHeight: false
    };

    this._getRowHeight = this._getRowHeight.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._rowClassName = this._rowClassName.bind(this);
    this._sort = this._sort.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.list) {
      this.setState(
        {
          list: nextProps.list,
          rowCount: nextProps.list.size
        });
    }
  }

  _getDatum(list, index) {
    return list.get(index);
  }

  _getRowHeight({ index }) {
    const { list } = this.state;

    return this._getDatum(list, index).size;
  }

  _headerRenderer({ dataKey, sortBy, sortDirection }) {
    return (
      <div className='align-left header-key'>
        {dataKey}
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

    const { onItemClicked } = this.props;

    const { list } = this.state;
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
              onRowClick={onItemClicked}
              scrollToIndex={scrollToIndex}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
            >
              {!hideIndexRow &&
                <Column
                  label="ID"
                  cellDataGetter={({ rowData }) => rowData.id}
                  headerRenderer={this._headerRenderer} // here just as an example
                  dataKey="id"
                  disableSort={!this._isSortEnabled()}
                  className={'align-left exampleColumn'}
                  width={width}
                />}
              <Column
                dataKey="name"
                disableSort={!this._isSortEnabled()}
                headerRenderer={this._headerRenderer} // here just as an example
                className={'align-left exampleColumn'}
                width={width}
              />
              <Column
                disableSort={!this._isSortEnabled()}
                label="Kommentteja"
                dataKey="feedback"
                className={'exampleColumn'}
                cellRenderer={({ cellData }) => cellData}
                width={width}
                flexGrow={0}
              />
            </Table>}
        </AutoSizer>
      </div>
    );
  }
}
