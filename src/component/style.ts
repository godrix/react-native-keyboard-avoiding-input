import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  input: {
    height: 50,
    width:'85%',
    fontSize: 18,
    paddingLeft: 6,
    paddingTop: 0,
  },
  action: {
    fontSize: 18,
    marginTop: 15,
    marginRight: 15,
  },
  actionLabel: {
    fontSize: 18,
    color:"#24a0ed"
  },
  outside: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    width:'100%',
    justifyContent:'space-between',
    flex: Platform.OS === 'ios' ? 1 : 0,
    flexDirection:'row',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  wrapperFixKeyboardType: {
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row',
    flex: Platform.OS === 'ios' ? 0.75 : 0,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 5,
  },
});
