import React from 'react';
import { connect } from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers
} from 'react-navigation';

import WelcomeScreen from '../scenes/welcome/';
import LoginScreen from '../scenes/login/';
import EmailLoginScreen from '../scenes/emaillogin/';
import PhoneLoginScreen from '../scenes/phonelogin/';
import EnterCodeScreen from '../scenes/entercode/';
import ForgotScreen from '../scenes/forgot/';
import InterestScreen from '../scenes/interest/';
import PhoneSignupScreen from '../scenes/phonesignup/';
import EmailSignupScreen from '../scenes/emailsignup/';
import TabScreen from '../scenes/tab/';
import DetailScreen from '../scenes/detail/';
import ScheduleViewScreen from '../scenes/scheduleview/';
import PaymentScreen from '../scenes/payment/';
import AddCreditScreen from '../scenes/addcredit/';
import ShareScreen from '../scenes/share/';
import PaymentMethodScreen from '../scenes/paymentmethod/';
import CreditDetailScreen from '../scenes/creditdetail/';
import EditProfileScreen from '../scenes/editprofile/';
import ReservationDetailScreen from '../scenes/reservationdetail/';
import ChangePasswordScreen from '../scenes/changepassword/';

export const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Welcome: { screen: WelcomeScreen },
    EmailLogin: { screen: EmailLoginScreen },
    PhoneLogin: { screen: PhoneLoginScreen },
    EnterCode: { screen: EnterCodeScreen },
    Forgot: { screen: ForgotScreen },
    Interest: { screen: InterestScreen },
    PhoneSignup: { screen: PhoneSignupScreen },
    EmailSignup: { screen: EmailSignupScreen },
    Tab: { screen: TabScreen },
    Detail: { screen: DetailScreen },
    ScheduleView: { screen: ScheduleViewScreen },
    AddCredit: { screen: AddCreditScreen },
    Payment: { screen: PaymentScreen },
    Share: { screen: ShareScreen },
    PaymentMethod: { screen: PaymentMethodScreen },
    CreditDetail: { screen: CreditDetailScreen },
    EditProfile: { screen: EditProfileScreen },
    ReservationDetail: { screen: ReservationDetailScreen },
    ChangePassword: { screen: ChangePasswordScreen }
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);