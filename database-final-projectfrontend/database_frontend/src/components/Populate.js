import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { populateDatabase } from '../db methods/dbAdmin';
import * as User from "../Users.js";

const Populate = () => {
  const history = useHistory();

  useEffect(() => {
    const populate = async () => {
      
      const uid = User.getUser('uid');
      //const uid = parseInt(uidString, 10);
      const password = User.getUser('password'); 

      await populateDatabase(uid, password);
      history.push('/dashboard');
    };
    populate();
  }, [history]);

  return <h2>Populating the database...</h2>;
};

export default Populate;
