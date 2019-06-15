const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Vote = require('../models/Vote');

module.exports = {
  /* *** GET ENDPOINTS *** */
  partyvote: (req, res) => {


    console.log('IN THE PARTY  VOTE');
    const newvote = new Vote({
              name: req.body.party,
              vote: 1
    });

    Vote.update({
            "name" : 'CONGRESS'}
            ,{
                $inc: { "vote" : 5}
        }, function (err, success) {
            console.log('hello vote update');
        });







    Vote.find()
        .then(partyDetails => {
          if (partyDetails) {
            console.log('partyDetails', partyDetails);
            res.send(partyDetails);
          }
        });


    Vote.update({_id: '5d032ad647f1df3ebdd2c4ed'} ,{
                $inc: { "vote" : 1}
        }, function (err, success) {
          console.log('partyVote');
          
        });
  }
};
