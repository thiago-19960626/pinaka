import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Title,
    Text,
    Label,
    Thumbnail,
    Button,
    Left,
    Right,
    Header,
    Icon,
    Input,
    View
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';
import EDialog from '../../components/edialog';
import { API } from '../../constants/api';
import { loginCode } from '../../actions/';
import PLoading from '../../components/loading';

class PhoneCodeScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            num1: "",
            num2: "",
            num3: "",
            num4: "",
            num5: "",
            num6: "",
            token: this.props.navigation.state.params.token,
            isError: false,
            errorText: "",
            isLoading: false
        };
    }

    onBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    onSignup(){
       
    }

    onLogin(){
        if(
            this.state.num1 == "" || this.state.num1.trim() == "" ||
            this.state.num2 == "" || this.state.num2.trim() == "" ||
            this.state.num3 == "" || this.state.num3.trim() == "" ||
            this.state.num4 == "" || this.state.num4.trim() == "" ||
            this.state.num5 == "" || this.state.num5.trim() == "" ||
            this.state.num6 == "" || this.state.num6.trim() == ""
        ){
            this.setState({
                isError: true,
                errorText: 'Please input verify code.'
            });
        }else{
            var { dispatch } = this.props;

            //show Indicator
            this.setState({
                isLoading: true
            });

            var code = this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4 + this.state.num5 + this.state.num6;
            loginCode(this.state.token, code)
            .then(data => {
                if(data.code != undefined){
                    switch(data.code){
                        case API.RESPONSE.VERIFYCODE.INVALIDCODE:
                            this.setState({
                                isLoading: false,
                                isError: true,
                                errorText: 'Invalid code. Please try again.'
                            });
                            break;
                        default:
                            this.setState({
                                isLoading: false,
                                isError: true,
                                errorText: 'Unknown Error.'
                            })
                            break;
                    }
                }else{
                    //save token
                    dispatch({type: 'setprofile', data: data});
                    dispatch(NavigationActions.navigate({routeName: 'tab'}));
                }
            })
            .catch(err => {
                //hide Indicator
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorText: 'Please check your wifi or internet.'
                });
            });  

        }        
    }

    onChangeText(text, index){
        switch(index){
            case 1:
                this.setState({
                    num1: text.substring(text.length-1, text.length)
                });
                if(text.length >  0){
                    
                }
                break;
            case 2:
                this.setState({
                    num2: text.substring(text.length-1, text.length)
                });
                if(text.length >  0){
                    //this.refs.t3.focus();
                }
                break;
            case 3:
                this.setState({
                    num3: text.substring(text.length-1, text.length)
                });
                if(text.length >  0){
                    //this.refs.t4.focus();
                }
                break;
            case 4:
                this.setState({
                    num4: text.substring(text.length-1, text.length)
                });
                if(text.length >  0){
                    //this.refs.t5.focus();
                }
                break;
            case 5:
                this.setState({
                    num5: text.substring(text.length-1, text.length)
                });
                if(text.length >  0){
                    //this.refs.t6.focus();
                }
                break;
            case 6:
                this.setState({
                    num6: text.substring(text.length-1, text.length)
                });
                break;
        };
    }

    onErrorClose(){
        this.setState({
            isError: false,
            errorText: ""
        });
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
                        <Title style={styles.title}>Log In</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Label style={styles.headerBtnText}>Sign Up</Label>
                        </Button>
                    </Right>
                </Header>
                {this.state.isError?
                <EDialog errorText={this.state.errorText} onClose={() => this.onErrorClose()}/>: null}
                <Content>
                    <Text style={styles.text}>
                        Enter your code.
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="next" value={this.state.num1} onChangeText={(text) => this.onChangeText(text, 1)}/>
                        </View>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="next" value={this.state.num2} onChangeText={(text) => this.onChangeText(text, 2)}/>
                        </View>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="next" value={this.state.num3} onChangeText={(text) => this.onChangeText(text, 3)}/>
                        </View>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="next" value={this.state.num4} onChangeText={(text) => this.onChangeText(text, 4)}/>
                        </View>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="next" value={this.state.num5} onChangeText={(text) => this.onChangeText(text, 5)}/>
                        </View>
                        <View style={styles.inputItemContainer}>
                            <Input style={styles.input}  maxLength={2} keyboardType="numeric" returnKeyType="done" value={this.state.num6} onChangeText={(text) => this.onChangeText(text, 6)}/>
                        </View>
                    </View>
                    <Text style={styles.resendBtnText}>Send New Code</Text>
                    <Text style={styles.descText}>
                        Tap Continue to accept Facebook’s <Text style={styles.linkText}>Terms, Data Policy, cookie use</Text> and the <Text style={styles.linkText}>Privacy Policy</Text> and <Text style={styles.linkText}>Terms of Service</Text> of Pinaka.
                    </Text>
                    <Button style={styles.sendBtn} onPress={() => this.onLogin()}>
                        <Label style={styles.sendBtnText}>Continue</Label>
                    </Button>
                </Content>
                {this.state.isLoading?<PLoading color="white"/>: null}
            </Container>
        );
    }
}

export default connect()(PhoneCodeScreen);