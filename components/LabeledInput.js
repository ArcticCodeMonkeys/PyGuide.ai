import {ActivityIndicator, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {useState, useEffect} from 'react';
import Icon from '@expo/vector-icons/Feather';
import Label from './Label';
import Errors from './Errors';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import {useDebounce} from '@uidotdev/usehooks';
import {useAutoStyling} from 'app/Files/Contexts/AutoStylingContext';
import {useTranslation} from 'react-i18next';
import {ColourKeys, Fonts, FontSizes, Sizes} from 'app/Files/Constants/ThemeConstants';

const LabeledInput = ({style,
                       error,
                       label,
                       change,
                       height,
                       submit,
                       testID,
                       warning,
                       inputKey,
                       inputRef,
                       infoPress,
                       validator,
                       placeholder,
                       keyboardType,
                       placeholderIcon,
                       addButtonClicked,
                       accessibilityLabel,
                       text = '',
                       delay = 500,
                       loading = false,
                       disabled = false,
                       autoFocus = false,
                       multiline = false,
                       showBackground = true,
                       secureTextEntry = false
}) => {
  
  // Instance Variables
  
  const {t} = useTranslation();
  
  const {Colours, colorScheme, themedStyle} = useAutoStyling();
  const styles = themedStyle(allStyles);
  
  const [value, setValue] = useState(text);
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const debouncedText = useDebounce(value, delay);
  
  // Effects
  
  useEffect(() => {
    setValue(text);
  }, [text]);
  
  useEffect(() => {
    if(text !== value && change){
      change(debouncedText);
    }
  }, [debouncedText]);
  
  // Methods
  
  const updateValue = (aValue) => {
    let newValue = aValue;
    
    if(validator){
      newValue = validator(aValue);
    }
    if(newValue !== value){
      setValue(newValue);
    }
  };
  
  // Render
  
  return (
    <SafeAreaView style={style}
                  testID={testID}
                  accessibilityLabel={accessibilityLabel}>
      <Label style={styles.label}
             label={label}
      />
      
      <View style={styles.row}>
        <View style={[
          showBackground ? styles.container : styles.noContainer,
          {borderColor:(focused ? Colours.primary : Colours.black)}
        ]}>
          {placeholderIcon ?
            <View style={styles.placeholderIcon}>
              <Icon name={placeholderIcon}
                    size={23}
                    color={Colours.gray}
              />
            </View>
            :
            null
          }
          
          {/*TODO: MIKE - psuedoclass  :focus-visible, makes this not work, when active*/}
          
          <TextInput style={[styles.input,
                             (disabled ? styles.disabled : {}),
                             {borderColor:(focused ? Colours.clear : Colours.clear)},
                             (height ? {height:height} : {})
                            ]}
                     key={inputKey}
                     ref={inputRef}
                     value={value}
                     onBlur={() => setFocused(false)}
                     testID="labeled-input-text"
                     onFocus={() => setFocused(!disabled)}
                     editable={!disabled}
                     onChange={(aEvent) => updateValue(aEvent.target.value)}
                     autoFocus={autoFocus}
                     multiline={multiline}
                     placeholder={t(placeholder)}
                     keyboardType={keyboardType}
                     onSubmitEditing={submit}
                     secureTextEntry={secureTextEntry && !showPassword}
                     placeholderTextColor={Colours.grey}
          />
          
          {secureTextEntry ?
            <Icon.Button style={styles.eyeButton}
                         name={showPassword ? 'eye' : 'eye-off'}
                         size={20}
                         colour={Colours.text}
                         iconStyle={{color:Colours.text}}
                         onPressIn={() => setShowPassword(!showPassword)}
                         backgroundColor={'transparent'}
            />
            :
            null
          }
          
          {infoPress ?
            <Icon.Button style={styles.eyeButton}
                         name={'info'}
                         size={20}
                         colour={Colours.text}
                         iconStyle={{color:Colours.text}}
                         onPressIn={infoPress}
                         backgroundColor={'transparent'}
            />
            :
            null
          }
          
          {loading ?
            <ActivityIndicator style={styles.activityIndicator}
                               size="small"
                               color={Colours.text}
            />
            :
            null
          }
        </View>
        
        {addButtonClicked ?
          <MaterialIcon.Button style={styles.addButton}
                               name="add"
                               size={25}
                               color={Colours.text}
                               fontSize={30}
                               onPressIn={addButtonClicked}
                               borderRadius={0}
                               backgroundColor={Colours.clear}
          />
          :
          null
        }
      </View>
      
      <Errors error={error}
              warning={warning}
      />
    </SafeAreaView>
  );
};

export default LabeledInput;

const allStyles = StyleSheet.create({
  row:{
    width:'100%',
    flexDirection:'row'
  },
  input:{
    flex:1,
    fontFamily:Fonts.regular,
    fontSize:FontSizes.regular,
    padding:Sizes.smallPadding,
    borderColor:ColourKeys.black,
    borderWidth:0,
    width:'100%',
    borderRadius:Sizes.borderRadius,
    outlineStyle:'none'
  },
  label:{
    marginBottom:5
  },
  disabled:{
    backgroundColor:'rgba(235, 235, 235, 1)'
  },
  eyeButton:{
    color:ColourKeys.text
  },
  container:{
    flex:1,
    display:'flex',
    alignItems:'center',
    borderColor:ColourKeys.black,
    borderWidth:1,
    borderRadius:Sizes.borderRadius,
    flexDirection:'row'
  },
  addButton:{
    width:40,
    marginLeft:Sizes.smallMargin
  },
  noContainer:{
    flex:1,
    display:'flex',
    alignItems:'center',
    borderColor:ColourKeys.clear,
    borderWidth:0,
    borderRadius:Sizes.borderRadius,
    flexDirection:'row',
    backgroundColor:ColourKeys.clear
  },
  placeholderIcon:{
    padding:Sizes.smallPadding,
    marginLeft:Sizes.smallMargin
  },
  activityIndicator:{
    marginRight:Sizes.smallMargin
  }
});
