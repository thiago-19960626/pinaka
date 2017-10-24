import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  
    Container,
    Content,
    Body,
    Text,
    Button,
    Header,
    Title,
    Thumbnail,
    Left,
    Right
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';

class LoginScreen extends Component{
    static navigationOptions = {
        header: null
    };

    onBack(){
        var  { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    onEmailLogin(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            dispatch(NavigationActions.navigate({routeName: 'EmailLogin'}));
        }else{
            dispatch(NavigationActions.navigate({routeName: 'EmailSignup', params: {interest: this.props.navigation.state.params.interest}}));
        }
    }

    onPhoneLogin(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            dispatch(NavigationActions.navigate({routeName: 'PhoneLogin'}));
        }else{
            dispatch(NavigationActions.navigate({routeName: 'PhoneSignup', params: {interest: this.props.navigation.state.params.interest}}));
        }
    }

    onSignup(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            dispatch(NavigationActions.navigate({routeName: 'Interest'}));
        }else{
            dispatch(NavigationActions.navigate({routeName: 'Login', params: { type: 'login' }}));
        }
    }

    render(){
        StatusBar.setBarStyle('light-content');
        return (
            <Container style={styles.container}>
                <Thumbnail square source={this.props.navigation.state.params.type == 'login'?require('../../assets/bgLogin.png'): require('../../assets/bgSignup.png')} style={styles.background}>
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={() => this.onBack()}>
                                <Thumbnail square source={require('../../assets/icNavBackBlack.png')} style={styles.backBtnIcon}/>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.onSignup()}>
                                {this.props.navigation.state.params.type == 'login'?
                                <Text style={styles.signupBtnText}>Sign Up</Text>:
                                <Text style={styles.signupBtnText}>Log In</Text>
                                }
                            </Button>
                        </Right>
                    </Header>
                    <Content style={styles.content}>
                        {this.props.navigation.state.params.type == 'login'?
                        <Text style={styles.loginText}>Log In</Text>:
                        <Text style={styles.loginText}>Sign Up</Text>
                        }
                        {this.props.navigation.state.params.type == 'login'?
                        <Text style={styles.welcomeText}>Welcome back</Text>:
                        <Text style={styles.welcomeText}>Your choice, we’re flexible.</Text>
                        }
                        <Button block style={styles.fbBtn}>
                            <Thumbnail square source={require('../../assets/icFacebbok.png')} style={styles.fbBtnIcon}/>
                            <Text style={styles.fbBtnText}>Facebook</Text>
                        </Button>
                        <Button block style={styles.phoneBtn} onPress={() => this.onPhoneLogin()}>
                            <Thumbnail square source={require('../../assets/icPhoneNumber.png')} style={styles.phoneBtnIcon}/>
                            <Text style={styles.phoneBtnText}>Phone Number</Text>
                        </Button>
                        <Text style={styles.bottomText}>
                            Actually, I’ll use <Text style={styles.bottomEmailBtn} onPress={() => this.onEmailLogin()}>Email</Text>
                        </Text>
                    </Content>
                </Thumbnail>                
            </Container>
        );
    }
}

export default connect()(LoginScreen);