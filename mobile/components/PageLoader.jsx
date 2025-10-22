import {View, ActivityIndicator} from 'react-native'
import {styles} from '../assets/styles/home.styles'
import {COLORS} from '../constants/colors'

// step238: No props are passed here, as it’s just a simple loader of spinner only, this is a stateless component, therefore no need to create a class for it here below now so, thus here below.
const PageLoader = () => {
    return (
        <View style={styles.loadingContainer}>
            {/* step239: so we use ActivityIndicator component from react-native which will show a loading spinner or loader on the screen there, thus here below. */}

            {/* step240: see the next steps in index.jsx file now there. */}
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}

export default PageLoader