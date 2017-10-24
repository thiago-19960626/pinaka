import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Title,
    Label,
    Thumbnail,
    Button,
    Left,
    Header,
    Right,
    Icon,
    Form,
    Item,
    Input,
    View,
    Text,
    Grid,
    Col    
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import EDialog from '../../components/edialog';
import { API } from '../../constants/api';
import { emailSignup, sendCode, verifyCode } from '../../actions/';
import PLoading from '../../components/loading';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

class PhoneSignupScreen extends Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);

       this.state = {
            progress: 1,
            step: 0,
            hidePass: true,
            date: moment().format("YYYY-MM-D"),
            showDatePicker: false,
            gender: true,
            marital: false,
            kids: false,
            num1: "",
            num2: "",
            num3: "",
            num4: "",
            num5: "",
            num6: "",
            phone: "",
            email: "",
            zipcode: "",
            password: "",
            isError: false,
            errorText: "",
            isLoading: false,
            verifytoken: ""
        };
    }

    onBack(){
        if(this.state.step > 1){
            this.setState({
                progress: this.state.progress - 1,
                step: this.state.step - 1
            });
        }else if(this.state.step == 1){
            this.setState({
                step: this.state.step - 1
            });
        }else{
            var { dispatch } = this.props;
            dispatch(NavigationActions.back());
        }        
    }

    onNext(progress, step){
        if(this.state.step == 0){
            if(this.state.phone == "" || this.state.phone.trim() == ""){
                this.setState({
                    isError: true,
                    errorText: 'Pleae enter your phone number.'
                });
            }else{
                //show Indicator
                this.setState({
                    isLoading: true
                });

                sendCode(this.state.phone)
                .then(data => {
                    if(data.code != undefined){
                        if(data.code == API.RESPONSE.SENDCODE.INVALIDPHONE){
                            this.setState({
                               isLoading: false,
                               isError: true,
                               errorText: 'Invalid Phone number. Please try again.' 
                            });
                        }
                    }else{
                        //hide Indicator
                        this.setState({
                            isLoading: false,
                            verifytoken: data.token,
                            progress: this.state.progress + progress,
                            step: this.state.step + step
                        });
                    }                    
                })
                .catch(err => {
                    //hide Indicator
                    this.setState({
                        isLoading: false,
                        isError: true,
                        errorText: 'Invalid Code. Pleasey try again.'
                    });
                });
            }            
        }else if(this.state.step == 1){
            if(
                this.state.num1 == "" || this.state.num1.trim() == '' ||
                this.state.num2 == "" || this.state.num2.trim() == '' ||
                this.state.num3 == "" || this.state.num3.trim() == '' ||
                this.state.num4 == "" || this.state.num4.trim() == '' ||
                this.state.num5 == "" || this.state.num5.trim() == '' ||
                this.state.num6 == "" || this.state.num6.trim() == ''
            ){
                this.setState({
                    isError: true,
                    errorText: 'Please enter your code.'
                });
            }else{
                //show Indicator
                this.setState({
                    isLoading: true
                });

                var code = this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4 + this.state.num5 + this.state.num6;
                verifyCode(this.state.verifytoken, code)
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
                                });
                                break;
                        }
                    }else{
                        this.setState({
                            isLoading: false,
                            progress: this.state.progress + progress,
                            step: this.state.step + step
                        })
                    }
                })
                .catch(err => {
                    //hide Indiator
                    this.setState({
                        isLoading: false,
                        isError: true,
                        errorText: 'Please check your wifi or internet.'
                    })
                });
            }   
        }else if(this.state.step == 2){
            if(this.state.email == '' || this.state.email.trim() == ''){
                this.setState({
                    isError: true,
                    errorText: 'Please input your email address.'
                });
            }else if(this.state.zipcode == '' || this.state.zipcode.trim() == ''){
                this.setState({
                    isError: true,
                    errorText: 'Please input your zipcode.'
                });
            }else{
                this.setState({
                    progress: this.state.progress + progress,
                    step: this.state.step + step
                });
            }            
        }else{
            if(this.state.password == ''){
                this.setState({
                    isError: true,
                    errorText: 'Please input your password.'
                });
            }else{
                //sign up
                var { dispatch } = this.props;

                //show Indicator
                this.setState({
                    isLoading: true
                });

                var params = {
                    phone: this.state.phone,
                    email: this.state.email,
                    birthday: this.state.date,
                    zipcode: this.state.zipcode,
                    gender: this.state.gender,
                    marital: this.state.marital,
                    kids: this.state.kids,
                    password: this.state.password,
                    interests: this.props.navigation.state.params.interest
                };
                emailSignup(params)
                .then(data => {
                    //hide indicator
                    this.setState({
                        isLoading: false
                    })
                    if(data.code != undefined){
                        switch(data.code){
                            case API.RESPONSE.SIGNUP.DUPLICATEEMAIL:
                                this.setState({
                                    isError: true,
                                    errorText: 'This email already used, Please try again.',
                                    step: 2
                                });
                                break;
                            case API.RESPONSE.SIGNUP.DUPLICATEPHONE:
                                this.setState({
                                    isError: true,
                                    errorText: 'This phone number already used, Pleae try again.',
                                    step: 0
                                })
                                break;
                            case API.RESPONSE.SIGNUP.INVALIDEMAIL:
                                this.setState({
                                    isError: true,
                                    errorText: 'This email is invalid now. Please try again.',
                                    step: 2
                                });
                                break;
                            case API.RESPONSE.SIGNUP.INVALIDZIPCODE:
                                this.setState({
                                    isError: true,
                                    errorText: 'This zipcode is invalid now. Please try again',
                                    step: 2
                                });
                                break;
                        }
                    }else{
                        //save token
                        dispatch({type: 'login', data: data});
                        dispatch(NavigationActions.navigate({routeName: 'tab'}));
                    }                    
                })
                .catch(err => {
                    this.setState({
                        isError: true,
                        errorText: 'Plese check wifi or internet.'
                    });
                });                
            }            
        }
    }

    onLogin(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'auth', params: { type: 'login' }}));
    }

    togglePass(){
        this.setState({
            hidePass: !this.state.hidePass
        });
    }

    toggleGender(gender){
        this.setState({
            gender: gender
        });
    }

    toggleMarital(marital){
        this.setState({
            marital: marital
        })
    }

    toggleKids(kids){
        this.setState({
            kids: kids
        });
    }

    onChangeText(text, index){
        switch(index){
            case 1:
                this.setState({
                    num1: text.substring(text.length-1, text.length)
                });
                if(text.length > 0){
                    //this.refs[2].focus();
                }
                break;
            case 2:
                this.setState({
                    num2: text.substring(text.length-1, text.length)
                });
                if(text.length > 0){
                    //this.refs[3].focus();
                }
                break;
            case 3:
                this.setState({
                    num3: text.substring(text.length-1, text.length)
                });
                if(text.length > 0){
                    //this.refs[4].focus();
                }
                break;
            case 4:
                this.setState({
                    num4: text.substring(text.length-1, text.length)
                });
                if(text.length > 0){
                    //this.refs[5].focus();
                }
                break;
            case 5:
                this.setState({
                    num5: text.substring(text.length-1, text.length)
                });
                if(text.length > 0){
                    //this.refs[6].focus();
                }
                break;
            case 6:
                this.setState({
                    num6: text.substring(text.length-1, text.length)
                });
                break;
            case 'password':
                this.setState({
                    password: text
                });
                break;
            case 'email':
                this.setState({
                    email: text
                });
                break;
            case 'zipcode':
                this.setState({
                    zipcode: text
                });
                break;
            case 'phone':
                this.setState({
                    phone: text
                });
                break;
        }
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
                        <Title style={styles.title}>Sign Up</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.onLogin()}>
                            <Label style={styles.headerBtnText}>Log In</Label>
                        </Button>
                    </Right>
                </Header>
                {this.state.isError?
                <EDialog errorText={this.state.errorText} onClose={() => this.onErrorClose()}/>: null}
                <View style={styles.progressContainer}>
                    <View style={[styles.progress, { width: (width /3) * (this.state.progress ) }]}/>
                </View>
                {this.state.step == 0?
                <Content>
                    <Text style={styles.text}>Enter your phone number.</Text>
                    <Form style={styles.formContainer}>
                        <Item stackedLabel style={styles.formItem}>
                            <Label style={styles.formItemLabel}>NUMBER</Label>
                            <Input style={styles.formInput} keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.onChangeText(text, 'phone')}/>
                        </Item>
                    </Form>
                    <Text style={styles.text1}>
                        Tap Next to get an SMS confirmation from Account Kit powered by Facebook. <Text style={styles.linkText}>Learn more</Text>
                    </Text>
                    <Button style={styles.nextBtn} onPress={() => this.onNext(0, 1)}>
                        <Label style={styles.nextBtnText}>Next</Label>
                    </Button>
                </Content>:null}
                {this.state.step == 1?
                <Content>
                    <Text style={styles.text}>Enter your code.</Text>
                    <View style={styles.codeContainer}>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 1)} value={this.state.num1}/>
                        </View>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 2)} value={this.state.num2}/>
                        </View>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 3)} value={this.state.num3}/>
                        </View>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 4)} value={this.state.num4}/>
                        </View>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 5)} value={this.state.num5}/>
                        </View>
                        <View style={styles.codeItemContainer}>
                            <Input style={styles.codeItemInput} keyboardType="numeric" maxLength={2} onChangeText={(text) => this.onChangeText(text, 6)} value={this.state.num6}/>
                        </View>
                    </View>
                    <Text style={styles.sendBtnText}>Send New Code</Text>
                    <Text style={styles.descText}>
                        Tap Continue to accept Facebook’s <Text style={styles.linkText}>Terms, Data Policy, cookie use</Text> and the <Text style={styles.linkText}>Privacy Policy</Text> and <Text style={styles.linkText}>Terms of Service</Text> of Pinaka.
                    </Text>
                    <Button style={styles.nextBtn} onPress={() => this.onNext(1,1)}>
                        <Label style={styles.nextBtnText}>Continue</Label>
                    </Button>
                </Content>: null}
                {this.state.step == 2?
                <Content>
                    <Text style={styles.text}>
                        Please, enter your information.
                    </Text>
                    <Form style={styles.formContainer}>
                        <Item stackedLabel style={styles.formItemContainer}>
                            <Label style={styles.formItemLabel}>
                                EMAIL
                            </Label>
                            <Input style={styles.formInput} value={this.state.email} onChangeText={(text) => this.onChangeText(text, 'email')}/>
                        </Item>
                        <Grid style={styles.gridFormContainer}>
                            <Col style={styles.birthdayContainer}>
                                <Item stackedLabel style={styles.formItemContainer}>
                                    <Label style={styles.formItemLabel}>
                                        BIRTHDAY
                                    </Label>
                                    <View style={styles.birthdayWrapper}>
                                    <DatePicker 
                                        style={{width: 200}}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="Select your birthday"
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Done"
                                        cancelBtnText="Cancel"
                                        onDateChange={(date) => this.setState({date: date})}
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: styles.birthdayText,
                                            dateText: {
                                                color: 'white',
                                                fontFamily: 'Roboto',
                                                fontWeight: 'normal',
                                                fontSize: 16,
                                                lineHeight: 33
                                            }
                                        }}
                                        />
                                    </View>
                                </Item>
                            </Col>
                            <Col style={styles.zipcodeContainer}>
                                <Item stackedLabel style={styles.formItemContainer}>
                                    <Label style={styles.formItemLabel}>
                                        ZIP CODE
                                    </Label>
                                    <Input style={styles.formInput} keyboardType="numeric" value={this.state.zipcode} onChangeText={(text) => this.onChangeText(text, 'zipcode')}/>
                                </Item>
                            </Col>
                        </Grid>
                    </Form>
                    <View style={styles.additionalContainer}>
                        <View style={styles.additionalItem}>
                            <Text style={styles.additionalItemText}>GENDER</Text>
                            <View style={styles.additionBtnContainer}>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleGender(true)}>
                                    {this.state.gender?
                                    <Thumbnail square source={require('../../assets/femaleSelected.png')} style={styles.additionalBtnIcon}/>
                                    :
                                    <Thumbnail square source={require('../../assets/femaleNormal.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleGender(false)}>
                                    {this.state.gender?
                                    <Thumbnail square source={require('../../assets/maleNormal.png')} style={styles.additionalBtnIcon}/>:
                                    <Thumbnail square source={require('../../assets/maleSelected.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                            </View>
                        </View>
                        <View style={styles.additionalItem}>
                            <Text style={styles.additionalItemText}>MARITAL STATUS</Text>
                            <View style={styles.additionBtnContainer}>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleMarital(true)}>
                                    {this.state.marital?
                                    <Thumbnail square source={require('../../assets/marriedSelected.png')} style={styles.additionalBtnIcon}/>:
                                    <Thumbnail square source={require('../../assets/marriedNormal.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleMarital(false)}>
                                    {this.state.marital?
                                    <Thumbnail square source={require('../../assets/maleNormal.png')} style={styles.additionalBtnIcon}/>:
                                    <Thumbnail square source={require('../../assets/maleSelected.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                            </View>
                        </View>
                        <View style={styles.additionalItem}>
                            <Text style={styles.additionalItemText}>DO YOU HAVE KIDS?</Text>
                            <View style={styles.additionBtnContainer}>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleKids(true)}>
                                    {this.state.kids?
                                    <Thumbnail square source={require('../../assets/yesSelected.png')} style={styles.additionalBtnIcon}/>:
                                    <Thumbnail square source={require('../../assets/yesNormal.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                                <Button transparent style={styles.additionalBtn} onPress={() => this.toggleKids(false)}>
                                    {this.state.kids?
                                    <Thumbnail square source={require('../../assets/noNormal.png')} style={styles.additionalBtnIcon}/>:
                                    <Thumbnail square source={require('../../assets/noSelected.png')} style={styles.additionalBtnIcon}/>
                                    }
                                </Button>
                            </View>
                        </View>
                    </View>
                    <Button style={styles.nextBtn} onPress={() => this.onNext(1,1)}>
                        <Label style={styles.nextBtnText}>Continue</Label>
                    </Button>
                </Content>:null}
                {this.state.step == 3?
                <Content>
                    <Text style={styles.text}>Create a password.</Text>
                    <Text style={styles.text1}>Your password must include at least one symbol and be eight or more characters long</Text>
                    <Form style={styles.formContainer}>
                        <Item stackedLabel style={styles.formItemContainer}>
                            {this.state.hidePass?
                            <Label style={styles.showText} onPress={() => this.togglePass()}>
                                Show
                            </Label>:
                            <Label style={styles.showText} onPress={() => this.togglePass()}>
                                Hide
                            </Label>
                            }
                            <Label style={styles.formItemLabel}>
                                PASSWORD
                            </Label>
                            <Input style={styles.formInput} secureTextEntry={this.state.hidePass} value={this.state.password} onChangeText={(text) => this.onChangeText(text, 'password')}/>
                        </Item>
                    </Form>
                    <Button style={styles.nextBtn} onPress={() => this.onNext(1,1)}>
                        <Label style={styles.nextBtnText}>Sign Up</Label>
                    </Button>
                </Content>: null}
                {this.state.isLoading?<PLoading color="white"/>:null}  
            </Container>
        );
    }
}

export default connect()(PhoneSignupScreen);