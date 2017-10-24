import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Text,
    Button,
    Title,
    Thumbnail,
    Header,
    Left,
    Form,
    Item,
    Label,
    View,
    Grid,
    Col,
    List,
    ListItem,
    Icon,
    Right,
    CheckBox,
    Footer
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar } from 'react-native';
import { API } from '../../constants';
import PLoading from '../../components/loading';
import { createReservation } from '../../actions';
import moment from 'moment';
import EDialog from '../../components/edialog';

class PaymentScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            peoples: 1,
            lines: 1,
            paymentmethod: 0,
            isLoading: false,
            isError: false,
            errorText: ""
        };
    }

    onBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    onAddCredit(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'AddCredit', params: {action: 'add'}}));
    }

    onCalPeople(delta){
        if(this.state.peoples + delta  > 0){
            this.setState({
                peoples: this.state.peoples + delta
            });
        }
    }

    onCalLines(delta){
        if(this.state.lines + delta > 0){
            this.setState({
                lines: this.state.lines + delta
            });
        }
    }

    onPaymentMethod(index){
        this.setState({
            paymentmethod: index
        });
    }

    onPay(){
        if(this.props.user.creditcards.length > 0){
            //show Indicator
            this.setState({
                isLoading: true
            });

            var { token, dispatch } = this.props;
            var params = {
                feed_id: this.props.navigation.state.params.feed._id,
                people_count: this.state.peoples,
                lane_count: this.state.lines,
                booking_time: moment(this.props.navigation.state.params.date).format('YYYY-MM-D') + " " + (17 + (this.props.navigation.state.params.hours[0]==true?0:(this.props.navigation.state.params.hours[1]==true?1:(this.props.navigation.state.params.hours[2]==true?2:3))))+ ":00:00",
                purchase_amount: this.props.navigation.state.params.feed.discounted_cost,
                number: this.props.user.creditcards[this.state.paymentmethod].number,
                cvv: this.props.user.creditcards[this.state.paymentmethod].cvv,
                expired_m: this.props.user.creditcards[this.state.paymentmethod].expired_m,
                expired_y: this.props.user.creditcards[this.state.paymentmethod].expired_y
            };

            console.log(params);

            createReservation(token, params)
            .then(data => {
                if(data.code != undefined){
                    switch(data.code){
                        case API.RESPONSE.RESERVATION.INVALIDCARDINFO:
                            this.setState({
                                isError: true,
                                errorText: "Invalid Credit Card Information. Please try again."
                            });
                            break;
                    }
                    this.setState({
                        isLoading: false
                    });
                }else{
                    this.setState({
                        isLoading: false
                    });
                    var reservationDATA = JSON.parse(JSON.stringify(data));
                    reservationDATA['feed_id'] = this.props.navigation.state.params.feed;
                    console.log(reservationDATA);
                    dispatch(NavigationActions.navigate({routeName: 'ReservationDetail', params: { reservation: reservationDATA }}));
                }                
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorText: "Please check wifi or internet."
                });
            });
        }else{
            this.setState({
                isError: true,
                errorText: "Please select a credit card to pay."
            });
        }
    }

    showDate(){
        return moment(this.props.navigation.state.params.date).format('dddd, D MMMM, YYYY');
    }

    onErrorClose(){
        this.setState({
            isError: false,
            errorText: ""
        });
    }

    render(){
        StatusBar.setBarStyle('dark-content');
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.onBack()}>
                            <Thumbnail square source={require('../../assets/icNavBackBlack1.png')} style={styles.backBtnIcon}/>
                        </Button>
                    </Left>
                </Header>
                {this.state.isError?
                <EDialog errorText={this.state.errorText} onClose={() => this.onErrorClose()}/>: null}
                <Content style={styles.content}>
                    <Grid>
                        <Col style={styles.basicContainer}>
                            <Text style={styles.nameText}>{this.props.navigation.state.params.feed.heading}</Text>
                            <Text style={styles.locationText}>Boronia St & Anzac Parade, NSW 2033</Text>
                            <Text style={styles.phoneText}>+61 123 456 678</Text>
                        </Col>
                        <Col style={styles.imageContainer}>
                            <Thumbnail square source={{uri: API.SERVER + this.props.navigation.state.params.feed.image}} style={styles.image}/>
                        </Col>
                    </Grid>
                    <Text style={styles.datetimeText}>Data & Time</Text>
                    <Text style={styles.dateText}>{this.showDate()}</Text>
                    {this.props.navigation.state.params.hours[0]?
                    <Text style={styles.timeText}>{API.BOOKINGTIME[0]}</Text>: null}
                    {this.props.navigation.state.params.hours[1]?
                        <Text style={styles.timeText}>{API.BOOKINGTIME[1]}</Text>: null}
                    {this.props.navigation.state.params.hours[2]?
                    <Text style={styles.timeText}>{API.BOOKINGTIME[2]}</Text>: null}
                    {this.props.navigation.state.params.hours[3]?
                    <Text style={styles.timeText}>{API.BOOKINGTIME[3]}</Text>: null}
                    <List style={styles.list}>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text>Number of people</Text>
                            </Body>
                            <Right style={styles.right}>
                                <Button transparent onPress={() => this.onCalPeople(-1)}>
                                    <Icon name="remove-circle" style={styles.listItemIcon}/>
                                </Button>
                            </Right>
                            <Right style={styles.right}>
                                <View style={styles.countTextContainer}>
                                    <Text style={styles.countText}>{this.state.peoples}</Text>
                                </View>
                            </Right>
                            <Right style={styles.right}>
                                <Button transparent onPress={() => this.onCalPeople(1)}>
                                    <Icon name="add-circle" style={styles.listItemIcon}/>
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text>Bowling lines</Text>
                            </Body>
                            <Right style={styles.right} >
                                <Button icon transparent onPress={() => this.onCalLines(-1)}>
                                    <Icon name="remove-circle"style={styles.listItemIcon}/>
                                </Button>
                            </Right>
                            <Right style={styles.right}>
                                <View style={styles.countTextContainer}>
                                    <Text style={styles.countText}>{this.state.lines}</Text>
                                </View>
                            </Right>
                            <Right style={styles.right}>
                                <Button icon transparent onPress={() => this.onCalLines(1)}>
                                    <Icon name="add-circle" style={styles.listItemIcon}/>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                    <Text style={styles.paymentText}>Payment Method</Text>
                    <List style={styles.list}>
                        {this.props.user.creditcards.map((card, index) => {
                            return (
                                <ListItem style={styles.listItem} onPress={() => this.onPaymentMethod(index)} key={index}>  
                                    <Body style={styles.paymentListItemBody}>                          
                                        <Thumbnail square source={require('../../assets/payment/mastercard.png')} style={styles.paymentIcon}/>
                                        <Text>{card.number}</Text>
                                    </Body>                            
                                    <Right>
                                        {this.state.paymentmethod == index?
                                        <Icon name="checkmark" style={styles.checkIcon}/>: <View style={{height: 37.33}}/>}
                                    </Right>
                                </ListItem>
                            );
                        })}
                        <ListItem style={styles.listItem} onPress={() => this.onAddCredit()}>                            
                            <Body style={styles.paymentListItemBody}>
                                <Icon name="add-circle" style={styles.addPaymentIcon}/>
                                <Text style={styles.addPaymentText}>Add credit card</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <View style={{height: 40}}/>
                </Content>
                <Footer style={styles.footer}>
                    <View>
                        <Text style={styles.footerPriceText}>${this.props.navigation.state.params.feed.discounted_cost.toFixed(2)}</Text>
                        <Text style={styles.footerLineText}>for {this.state.lines} lines</Text>
                    </View>
                    <Button style={styles.payBtn} onPress={() => this.onPay()}>
                        <Text>Pay</Text>
                    </Button>
                </Footer>
                {this.state.isLoading?<PLoading color="white"/>:null}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    token: state.user.token,
    user: state.user
});

export default connect(mapStateToProps)(PaymentScreen);