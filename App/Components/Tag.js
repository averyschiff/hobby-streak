import React from 'react'
import {View} from 'react-native'
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

const Tag = (props) => {
  return(
    <View
      style={{
        padding: 3,
        margin: 3,
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
    <Menu onSelect={
      value=>{
        if (value) {
          props.deleteTag(props.tag)
        }
      }
      }>
      <MenuTrigger text={props.tag}/>
      <MenuOptions>
        <MenuOption value={true} text='Delete' />
        <MenuOption value={false} text='Cancel'/>
      </MenuOptions>
    </Menu>
    </View>
  )
}

export default Tag

/*

      <TouchableOpacity
      onPress={()=>{console.log('pressed')}}>
        <Text style={{
          paddingHorizontal: 2
        }}>x</Text>
      </TouchableOpacity>
      */
