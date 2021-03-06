import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Menu, {
  MenuOptions, 
  MenuOption, 
  MenuTrigger, 
  renderers
} from 'react-native-popup-menu'
const {SlideInMenu} = renderers;

const TagsMenu = (props) => {
  const [newTags, onChangeText] = React.useState('');

  const submitTags = async (value, tags) => {
    if (tags.length>0){
      if (value){
        if (props.oldTags) props.updateTags(props.oldTags + tags +', ')
        else props.updateTags(tags+', ')
        onChangeText('')
      }
    }
  }
  return (
    <Menu renderer={SlideInMenu} onSelect={value=>{submitTags(value, newTags)}}>
      <MenuTrigger>
        <Text>Add tags...</Text>
      </MenuTrigger>
      <MenuOptions>
        <View>
          <TextInput
            style={{
              height: 50,
              width: 350,
              paddingLeft: 4,
              marginLeft: 4,
              borderWidth: 1,
              borderColor: 'black'
            }}
            placeholder={'Enter new tags, separated by commas...'}
            value={newTags}
            onChangeText={text=>onChangeText(text)}
          />
        </View>
        <MenuOption 
          style={{height: 30}}
          value={true} text='Submit'/>
        <MenuOption 
          style={{height: 30}}
          value={false} text='Cancel'/>
      </MenuOptions>
    </Menu>
  )
}

export default TagsMenu
