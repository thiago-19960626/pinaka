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
    Grid,
    Col,
    Button,
    Label
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';
import AlertCheck from '../../components/alertcheck/';
import { getInterests } from '../../actions';
import { API } from '../../constants/api';

class WelcomeScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            isDialog: false
        }

        var { dispatch } = this.props;

        getInterests()
        .then(interests => {
            dispatch({type: 'setinterest', data: interests});
        })
        .catch(err => {
            alert("Please check  wifi or internet.");
        });
    }

    onLogin(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'auth', params: { type: 'login' }}));
    }

    onSignup(){
        this.setState({
            isDialog: true
        });
    }

    onDone(ret){
         this.setState({
            isDialog: false
        });
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'auth', params: { type: 'signup',  interest: ret}}));
    }

    onCancel(){
        this.setState({
            isDialog: false
        });
    }

    render(){
        StatusBar.setBarStyle('light-content');
        return (
            <Container style={styles.container}>                
                <View style={styles.mainContainer}>
                    <Thumbnail square source={require('../../assets/logo_large.png')} style={styles.logo}/>
                    <Text style={styles.logoText}>Pinaka</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText1}>Here is some text</Text>
                    <Text style={styles.bottomText2}>Here is some text</Text>
                    <View style={styles.bottomBtnContainer}>                        
                        <Button style={styles.signupBtn} onPress={() => this.onSignup()}>
                            <Label style={styles.signupBtnText}>Sign Up</Label>
                        </Button>
                    
                        <Button style={styles.loginBtn} onPress={() => this.onLogin()}>
                            <Label style={styles.loginBtnText}>Log In</Label>
                        </Button>                        
                    </View>
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

export default connect(mapStateToProps)(WelcomeScreen);
