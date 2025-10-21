// step136: type "rnfe" and get the boilerplate for now here below.

import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@/constants/colors'

// step137: now we take the "children" in this function as a prop i.e. whatever this component wraps will be its children ; thus we can wrap other components inside it , and they become its children, thus here below.
const SafeScreen = ({children}) => {

    // step138: lets use the hook from react-native-safe-area-context that provides the safe area insets of the device (top, bottom, left, right). Useful for devices with notches, rounded corners, or home indicators.

    // step139: so the insets variable now holds the safe area insets of the device ; like : insets.top, insets.bottom, insets.left, insets.right ; which will provide the required padding for the top, bottom, left, and right edges of the screen and makes the content appear correctly on devices with notches, rounded corners, or home indicators thus here below.
    const insets = useSafeAreaInsets();
    return (

        // step140: so this renders the {children} i.e. all the components it wraps wherever and applies the following classes on it like ensures content is pushed below the status bar / notch of the mobile i.e the top bar in mobile that has time battery and all there, thus here below.

        // step141: thus whatever is wrapped inside this will be within the safe screen thus here below ; and will be visible clearly thus here below.

        // step142: we can use "paddingBottom: insets.bottom" to provide the required padding for the bottom edge of the screen if needed too ; and similarly for top, left, and right edges thus here below too if needed; but for now lets use only the paddingTop with value equal to insets.top i.e. the value provided by the package we installed when installing "expo" pacakge by default there named "react-native-safe-area-context", which provides appropriate padding to keep the contents inside the safe area view, thus here below.

        // step143: see the next steps in _layout.jsx file now there.
        <View style={{paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background}}>
        {children}
        </View>
    )
}

export default SafeScreen