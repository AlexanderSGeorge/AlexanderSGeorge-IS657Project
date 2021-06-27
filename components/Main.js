import React, { Component } from 'react'
import {View, Text} from 'react-native'

import {bindActionCreators} from'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();

    }
    render() {
        const {currentUser } = this.props;

        console.log()
        if (currentUser==undefined){
            return (
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    Current User is Signed In and Underfined</View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <Text>Current User is Signed In</Text>
            </View>
        )
    }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser}, dispatch);

export default connect(null, mapDispatchProps)(Main);