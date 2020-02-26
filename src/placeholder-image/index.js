import React, { Component } from 'react'
import { Image, ImagePropsBase, ImageStyle, ImageBackground, View } from 'react-native'
import PropTypes from 'prop-types'
import { StyledImage } from '../styled/share.styled'
import Placeholder, { Media } from 'rn-placeholder'
import Colors from '../colors'
import * as GlobalConst from '../global-const'
import { isEmptyOrSpaces } from '../method/helper'

class PlaceholderImage extends Component {
  StyledImageRef;

  static propTypes = {
    uri: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    radius: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    defaultSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizeMethod: PropTypes.oneOf(["auto", "resize", "scale"]),
    resizeMode: PropTypes.oneOf(["cover", "contain", "stretch", "repeat", "center"]),
    isCard: PropTypes.bool,
    disableAnimation: PropTypes.bool,
    animation: PropTypes.bool,
  }

  static defaultProps = {
    // uri: '',
    resizeMethod: 'resize',
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderWidth: 0,
    borderColor: '#000000',
    defaultSource: require('./image-placeholder.png'),
    isCard: true,
    disableAnimation: false,
    animation: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false
    }
    this.onLoadStart = this.onLoadStart.bind(this)
    this.onError = this.onError.bind(this)
    this.onLoadEnd = this.onLoadEnd.bind(this)
    this.checkImageURL = this.checkImageURL.bind(this)
  }

  onLoadStart() {
    this.setState({ loading: true, error: false })
  }

  onError() {
    this.setState({ loading: false, error: true })
  }

  onLoadEnd() {
    this.setState({ loading: false, error: false })
  }

  componentDidMount() {
    this.checkImageURL()
  }

  async checkImageURL() {
    const { uri } = this.props

    try {
      this.onLoadStart()
      const resp = await fetch(uri)
      if (resp.status >= 200 && resp.status < 300) {
        this.onLoadEnd()
      } else {
        this.onError()
      }
    } catch(err) {
      this.onError()
    }
  }

  render() {
    const {
      uri,
      resizeMethod,
      resizeMode,
      defaultSource,
      width,
      height,
      radius,
      borderWidth,
      borderColor,
      isCard,
      disableAnimation,
      loading: loadingProps,
      animation,
    } = this.props

    console.tron.warn({loadingProps})

    const { loading, error } = this.state
    const placeholderAnimation = typeof animation === 'boolean' ? animation : GlobalConst.getValue().PLACEHOLDER_ANIMATION

    return (
      <View>
        {(loadingProps || (loading && !error)) ? (
          <View style={{ width, height }}>
            <Placeholder
              animation={placeholderAnimation ? 'shine' : null}
            >
              <Media
                style={{
                  width,
                  height,
                  borderWidth,
                  borderColor,
                  borderRadius: radius,
                }}
              />
            </Placeholder>
          </View>
        ) : (
          <StyledImage
            source={{ uri }}
            resizeMethod={resizeMethod}
            resizeMode={resizeMode}
            style={{
              width,
              height,
              borderWidth,
              borderColor,
              borderRadius: radius,
            }}
            defaultSource={defaultSource}
            isCard={isCard}
          />
        )}
      </View>
    )
  }
}

export default PlaceholderImage