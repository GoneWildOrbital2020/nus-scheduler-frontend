import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { url } from './constant';
import { light } from '../colors';
import { toggleLogin } from '../redux/actions';

const useStyles = makeStyles(() => ({
  loader: {
    width: '100%',
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Authenticate = (props) => {
  const { email, token, dispatch, ...routeProps } = props;
  const { history } = routeProps;
  const classes = useStyles();

  useEffect(() => {
    const data = {
      email,
    };
    fetch(`${url}/users/activate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((json) => {
        dispatch(
          toggleLogin(
            json.email,
            json.token,
            json.username,
            json.avatar,
            Date.parse(json.logout_time),
          ),
        );
        window.localStorage.setItem('email', json.email);
        window.localStorage.setItem('token', json.token);
        window.localStorage.setItem('username', json.username);
        window.localStorage.setItem('avatar', json.avatar);
        window.localStorage.setItem('isLoggedIn', true);
        window.localStorage.setItem('logoutTime', Date.parse(json.logout_time));
        history.push('/', {
          fromAuthenticate: true,
        });
      })
      .catch(() => {
        history.push('/login', {
          fromAuthenticate: true,
        });
      });
  }, []);

  return (
    <div className={classes.loader}>
      <Loader type="ThreeDots" color={light} height={80} width={80} />
    </div>
  );
};

Authenticate.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Authenticate));
