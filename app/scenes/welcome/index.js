import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Title,
    Text,
    Header,
    Thumbnail,
    View,
    Grid,
    Col,
    Button
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';

class WelcomeScreen extends Component{
    static navigationOptions = {
        header: null
    };

    onLogin(){
        var  { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'Login', params: {type: 'login'}}));
    }

    onSignup(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'Interest'}));
    }

    render(){
        StatusBar.setBarStyle('light-content');
        return (
            <Container style={styles.container}>                
                <Thumbnail square source={require('../../assets/backgroundFull.png')} style={styles.background}>
                    <Text style={styles.welcomeText}>WELCOME TO</Text>
                    <Text style={styles.logoText}>PINAKA</Text>
                </Thumbnail>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText1}>Here is some text.</Text>
                    <Text style={styles.bottomText2}>Here is some text.</Text>
                    <Grid>
                        <Col style={styles.signupBtnContainer}>
                            <Button block style={styles.loginBtn} onPress={() => this.onSignup()}>
                                <Text style={styles.loginBtnText}>Sign Up</Text>
                            </Button>
                        </Col>
                        <Col style={styles.loginBtnContainer}>
                            <Button block style={styles.loginBtn} onPress={() => this.onLogin()}>
                                <Text style={styles.loginBtnText}>Log In</Text>
                            </Button>
                        </Col>
                    </Grid>
                </View>                
            </Container>
        );
    }
}

export default connect()(WelcomeScreen);