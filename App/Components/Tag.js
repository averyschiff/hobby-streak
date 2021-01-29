import React from 'react'
import {View, Text} from 'react-native'
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

const Tag = (props) => {
  return(
    <Menu onSelect={
      value=>{
        if (value) {
          props.deleteTag(props.tag)
        }
      }
      }>
      <MenuTrigger>
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
          <Text>{props.tag}</Text>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={true} text='Delete' />
        <MenuOption value={false} text='Cancel'/>
      </MenuOptions>
    </Menu>
  )
}

export default Tag
