import React, { Component } from 'react';
import { FlatList, FlatListProps, View, ScrollView, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
// import { CustomFlatListStyle } from '../Components/styled/custom-flatlist.styled'
import { getConnectionStatus } from '../connection-handler/connection-error-helper'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import * as Obj from '../method/object'
import * as GlobalConst from '../global-const'

class CustomFlatList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchFunction: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderEmpty: PropTypes.func,
    renderNoConnection: PropTypes.func,
    renderError: PropTypes.func,
    meta: PropTypes.shape({
      current_page: PropTypes.number,
      next_page: PropTypes.number,
    }),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholderCount: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,

    disableRenderNoConnection: PropTypes.bool,
    disableRenderEmpty: PropTypes.bool,
    disableRenderError: PropTypes.bool,
    isLoadmore: PropTypes.bool,
    initialNumToRender: PropTypes.number,
  }

  static defaultProps = {
    data: [],
    renderItem: () => null,
    style: {},
    contentContainerStyle: {},
    placeholderCount: 9,
    loading: false,
    error: false,
    disableRenderNoConnection: false,
    disableRenderEmpty: false,
    disableRenderError: false,
    isLoadmore: true,
    initialNumToRender: 20,
  }

  constructor(props) {
    super(props)

    const { placeholderCount } = props;

    const placeholderItems = [];

    for (let index = 0; index < placeholderCount; index++) {
      placeholderItems.push({ id: index + 1, loading: true });
    }

    this.state = {
      flatListData: [],
      loadingData: placeholderItems
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    const { loadingData } = this.state;

    this.setState({ flatListData: loadingData },
      () => this.onRefresh())
  }

  componentWillReceiveProps(nextProps) {
    const { data, loading, meta } = nextProps
    let { flatListData, loadingData } = this.state

    if (!loading && data && meta) {
      flatListData = data
    }

    if (loading && data.length === 0) {
      flatListData = loadingData
    }

    this.setState({ flatListData })
  }

  onRefresh() {
    const { fetchFunction } = this.props
    fetchFunction({ page: 1 })
  }

  forceRefresh(isReset = false) {
    const { fetchFunction } = this.props
    fetchFunction({ page: 1, isReset })
  }

  onLoadMore() {
    const { fetchFunction, meta } = this.props
    if (meta && meta.next_page) {
      fetchFunction({ page: meta.next_page })
    }
  }

  render() {
    const { data, renderItem, error, loading,
      renderEmpty, renderNoConnection, renderError,
      style, contentContainerStyle, meta,
      disableRenderNoConnection, disableRenderEmpty, placeholderCount,
      disableRenderError, isLoadmore, initialNumToRender } = this.props
    const { flatListData } = this.state

    const isConnected = getConnectionStatus()
    if (!isConnected && !disableRenderNoConnection) {
      if (renderNoConnection) {
        return renderNoConnection({ onRefresh: this.onRefresh })
      } else {
        let GlobalNoConnection = GlobalConst.getValue().FLATLIST_NO_CONNECTION_CONTAINER
        GlobalNoConnection = Obj.appendPropsToView(GlobalNoConnection, 'onRefresh', this.onRefresh)
        return GlobalNoConnection
      }
    }

    if (!loading && (data.length === 0) && error && !disableRenderError) {
      if (renderError) {
        return renderError({ onRefresh: this.onRefresh })
      } else {
        let GlobalErrorContainer = GlobalConst.getValue().FLATLIST_ERROR_CONTAINER
        GlobalErrorContainer = Obj.appendPropsToView(GlobalErrorContainer, 'onRefresh', this.onRefresh)
        return GlobalErrorContainer
      }
    }

    if (!loading && (data.length === 0) && !disableRenderEmpty) {
      if (renderEmpty) {
        return renderEmpty({ onRefresh: this.onRefresh })
      } else {
        let GlobalEmptyContainer = GlobalConst.getValue().FLATLIST_EMPTY_CONTAINER
        GlobalEmptyContainer = Obj.appendPropsToView(GlobalEmptyContainer, 'onRefresh', this.onRefresh)
        return GlobalEmptyContainer
      }
    }

    return (
      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={[style]}
        contentContainerStyle={[{ paddingBottom: getBottomSpace() }, contentContainerStyle]}
        onEndReached={isLoadmore && this.onLoadMore}
        onRefresh={this.onRefresh}
        refreshing={loading}
        initialNumToRender={initialNumToRender}
        // ListFooterComponent={() => loading && flatListData.length > placeholderCount && <ActivityIndicator />}
      />
    )
  }
}

export default CustomFlatList