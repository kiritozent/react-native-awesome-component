import styled from 'styled-components/native'
import * as GlobalConst from '../global-const'
import PropTypes from 'prop-types';
import metrics from '../metrics'

const paddingType = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}

function getPadding(padded, padding, type, disableVerticalPadding, disableHorizontalPadding) {
  if (padded) {
    switch (type) {
      case paddingType.VERTICAL: {
        if (disableVerticalPadding) {
          return 0
        } else {
          return padding
        }
      }

      case paddingType.HORIZONTAL: {
        if (disableHorizontalPadding) {
          return 0
        } else {
          return padding
        }
      }

      default: {
        return padding;
      }
    }
  } else {
    return 0;
  }
}

export function checkIsCard(isCard) {
  if (isCard) {
    return `1px 1px 2px rgba(0, 0, 0, 0.25);`
  } else {
    return `0 0 0 rgba(0, 0, 0, 0.0);`
  }
}

const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${GlobalConst.getValue().SAFE_AREA_BACKGROUND_COLOR}
  padding-left: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-right: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-top: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-bottom: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
`;

const Container = styled.View`
  background-color: ${GlobalConst.getValue().BACKGROUND_COLOR}
  padding-left: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-right: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-top: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-bottom: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  box-shadow: ${props => checkIsCard(props.isCard)}
`;

const TouchableContainer = styled.TouchableOpacity`
  background-color: ${GlobalConst.getValue().BACKGROUND_COLOR}
  padding-left: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-right: ${props => getPadding(props.padded, props.padding, paddingType.HORIZONTAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-top: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  padding-bottom: ${props => getPadding(props.padded, props.padding, paddingType.VERTICAL, props.disableVerticalPadding, props.disableHorizontalPadding)};
  box-shadow: ${props => checkIsCard(props.isCard)}
`

Container.propTypes = {
  isCard: PropTypes.bool
}

Container.defaultProps = {
  isCard: false,
  padded: false,
  padding: GlobalConst.getValue().PADDING,
  disableVerticalPadding: false,
  disableHorizontalPadding: false
}

const FlexContainer = styled(Container)`
  flex: 1;
`

const StyledImage = styled.Image`
  box-shadow: ${props => checkIsCard(props.isCard)}
`

export const H1 = styled.Text`
  font-size: ${GlobalConst.getValue().H1}
`
export const H2 = styled.Text`
  font-size: ${GlobalConst.getValue().H2}
`
export const H3 = styled.Text`
  font-size: ${GlobalConst.getValue().H3}
`
export const H4 = styled.Text`
  font-size: ${GlobalConst.getValue().H4}
`
export const H5 = styled.Text`
  font-size: ${GlobalConst.getValue().H5}
`
export const H6 = styled.Text`
  font-size: ${GlobalConst.getValue().H6}
`
export const H7 = styled.Text`
  font-size: ${GlobalConst.getValue().H7}
`

export {
  SafeContainer,
  Container,
  FlexContainer,
  TouchableContainer,
  StyledImage
}