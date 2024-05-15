import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dropDatabase } from '../db methods/dbAdmin';
import * as User from "../Users.js";

const Drop = () => {
  const history = useHistory();

  useEffect(() => {
    const drop = async () => {
      const uid = User.getUser('uid');
      //const uid = parseInt(uidString, 10);
      const password = User.getUser('password'); 

      await dropDatabase(uid, password);

      history.push('/dashboard');
    };
    drop();
  }, [history]);

  return <h2>Dropping the database...</h2>;
};

export default Drop;
