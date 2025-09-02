import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 97,
    height: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 3,
    marginHorizontal: 5,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E2128',
  },
  focusCell: {
    borderBottomColor: '#6568EB',
    borderBottomWidth: 3,
  },
  filledCell: {
    borderBottomWidth: 0,
  },
});
