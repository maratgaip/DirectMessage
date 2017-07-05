import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-native';
import { connect } from 'react-redux';

import Conversations from './conversations';
import Chat from './chat';
import Create from './create';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
});


class DirectMessage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Route
          exact
          path="/"
          render={() => {
            const { initialView } = this.props;
            if (initialView === 'create') {
              return <Create />;
            } else if (initialView === 'chat') {
              return <Chat />;
            }
            return <Conversations />;
          }}
        />
        <Route exact path="/conversation/:id" render={() => (<Chat />)} />
        <Route exact path="/conversations" render={() => (<Conversations />)} />
        <Route exact path="/create" render={() => (<Create />)} />
      </View>
    );
  }
}

DirectMessage.propTypes = {
  initialView: PropTypes.string,
};

DirectMessage.defaultProps = {
  initialView: 'conversations',
};

const mapStateToProps = state => ({
  initialView: state.app.initialView,
});

export default withRouter(connect(mapStateToProps)(DirectMessage));
