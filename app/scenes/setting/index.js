import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Body,
    Button,
    Title,
    Thumbnail,
    Header,
    Left,
    Right,
    Label,
    List,
    ListItem,
    Text,
    View,
    Icon
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { StatusBar,Switch } from 'react-native';

class SettingScreen extends Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);

        this.state = {
            notification: false
        }
    }

    onValueChange(value){
        this.setState({
            notification: value
        })
    }

    onChangePassword(){
        
    }

    onLogout(){
        var { dispatch } = this.props;
        dispatch({type: 'logout'});
        dispatch(NavigationActions.navigate({routeName: 'welcome'}));
    }

    render(){
        StatusBar.setBarStyle('light-content');
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Body>
                        <Title style={styles.title}>Settings</Title>
                    </Body>
                </Header>
                <Content style={styles.content}>
                    <List>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text style={styles.listItemText}>Notifications</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.notification} onValueChange={(value) => this.onValueChange(value)}/>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text style={styles.listItemText}>Currency</Text>
                            </Body>
                            <Right>
                                <Text style={styles.currencyText}>USD($)</Text>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem} onPress={() => this.onChangePassword()}>
                            <Body>
                                <Text style={styles.listItemText}>Change Password</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text style={styles.listItemText}>About Us</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text style={styles.listItemText}>Terms of Service</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Body>
                                <Text style={styles.listItemText}>Version 1.2.0</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.listItem} onPress={() => this.onLogout()}>
                            <Body>
                                <Text style={styles.listItemText}>Log Out</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default connect()(SettingScreen);
