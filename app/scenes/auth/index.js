import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Title,
    Text,
    Thumbnail,
    View,
    Header,
    Left,
    Right,
    Icon,
    Button,
    Label
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';
import AlertCheck from '../../components/alertcheck/';

class AuthScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            isDialog: false
        }
    }

    onEmailLogin(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            dispatch(NavigationActions.navigate({routeName: 'emaillogin'}));
        }else{
            dispatch(NavigationActions.navigate({routeName: 'emailsignup', params: {interest: this.props.navigation.state.params.interest}}));
        }       
    }

    onPhoneLogin(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            dispatch(NavigationActions.navigate({routeName: 'phonelogin'}));
        }else{
            dispatch(NavigationActions.navigate({routeName: 'phonesignup', params: {interest: this.props.navigation.state.params.interest}}));
        }
    }

    onBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    onAction(){
        var { dispatch } = this.props;
        if(this.props.navigation.state.params.type == 'login'){
            this.setState({
                isDialog: true
            });
        }else{
            dispatch(NavigationActions.navigate({routeName: 'auth', params: {type: 'login'}}));
        }
    }

    onCancel(){
        this.setState({
            isDialog: false
        });
    }

    onDone(ret){
        this.setState({
            isDialog: false
        });

        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'auth', params: {type: 'signup', interest: ret}}));
    }

    render(){
        StatusBar.setBarStyle('light-content');
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.onBack()}>
                            <Icon name="arrow-back" style={styles.headerIcon}/>
                        </Button>
                    </Left>
                    <Body>
                        {this.props.navigation.state.params.type == 'login'?
                        <Title style={styles.title}>Log In</Title>:
                        <Title style={styles.title}>Sign Up</Title>
                        }
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.onAction()}>
                            {this.props.navigation.state.params.type == 'login'?
                            <Label style={styles.headerBtnText}>Sign Up</Label>:
                            <Label style={styles.headerBtnText}>Log In</Label>
                            }
                        </Button>
                    </Right>
                </Header>
                <View style={styles.mainContainer}>
                    <Thumbnail square source={require('../../assets/logo_large.png')} style={styles.logo}/>
                    {this.props.navigation.state.params.type == 'login'?
                    <Text style={styles.text}>
                        Welcome back.
                    </Text>:
                    <Text style={styles.text}>
                        Your choice, we’re flexible.
                    </Text>}
                    <Button style={styles.fbBtn}>
                        <Thumbnail square style={styles.fbBtnIcon} source={require('../../assets/ic_facebook.png')}/>
                        <Label style={styles.fbBtnText}>Facebook</Label>
                    </Button>
                    <Button style={styles.phoneBtn} onPress={() => this.onPhoneLogin()}>
                        <Icon name="call"/>
                        <Label style={styles.fbBtnText}>Phone Number</Label>
                    </Button>
                    <Text style={styles.bottomText}>
                        Actually, I’ll use <Label style={styles.emailBtnText} onPress={() => this.onEmailLogin()}>Email</Label>                        
                    </Text>
                </View>
                {this.state.isDialog?
                <AlertCheck list={this.props.interests} onCancel={() => this.onCancel()} onDone={(ret) => this.onDone(ret)}/>: null}
            </Container>
        );
    }
}

var mapStateToProps = state => ({
    interests: state.interest.list
})

export default connect(mapStateToProps)(AuthScreen);