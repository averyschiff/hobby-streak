import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Menu, {MenuOptions, MenuOption, MenuTrigger, renderers} from 'react-native-popup-menu'
const {SlideInMenu} = renderers;

const TagsMenu = (props) => {
  const [newTags, onChangeText] = React.useState('');

  const submitTags = (value, tags) => {
    if (value){
      props.updateTags(props.oldTags + tags)
      onChangeText('')
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
              height: 30,
              width: 350,
              borderWidth: 1,
              borderColor: 'black'
            }}
            placeholder={'Enter new tags, separated by commas...'}
            value={newTags}
            onChangeText={text=>onChangeText(text)}
          />
        </View>
        <MenuOption value={true} text='Submit'/>
        <MenuOption value={false} text='Cancel'/>
      </MenuOptions>
    </Menu>
  )
}

export default TagsMenu
