// step245: start to get the boilerplate using rnfe first here below.
import { View, Text } from 'react-native'
import { styles } from '../assets/styles/home.styles'
import { COLORS } from '../constants/colors'
import React from 'react'

// step246: lets pass the summary prop it was taking, now here below.

export const BalanceCard = ({summary}) => {
  return (
    <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{parseFloat(summary.balance).toFixed(2)}</Text>
        <View style={styles.balanceStats}>
            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Income</Text>

                {/* step247: we give styles using array of styles here below ; which will start applying the styles in order form left to right in the array ; so all the styles of the array will be applied together there, starting from left to the right, so it will be of color as COLORS.income and style as "balanceStatAmount", thus here below. */}
                <Text style={[styles.balanceStatAmount, {color: COLORS.income}]}>
                    +₹{parseFloat(summary.income).toFixed(2)}
                </Text>
            </View> 
            <View style={[styles.balanceStatItem, styles.statDivider]} />
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Expenses</Text>
                    <Text style={[styles.balanceStatAmount, {color: COLORS.expense}]}>

                        {/* step248: we use "abs" to keep the absolute value of the number ; ensures the amount is always positive ; even if it is a negative number so that -- is ot printed there as expense itself is in - , so putting one more "-" below will look bad there ; and toFixed(2) to round the number to 2 decimal places, thus here below. */}

                        {/* step249: see the next steps in index.js file now there. */}
                        -₹{Math.abs(parseFloat(summary.expenses)).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
  );
};