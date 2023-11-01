const fs = require('fs');
const express = require('express');
const expressMiddleWare = (router) => {
  router.get('/callback', (req, res) => {
    res.redirect(
      `/iframe.html?id=components-login--callback&viewMode=story&code=${req.query.code}&state=${req.query.state}`,
    );
    res.end();
  });
};
module.exports = expressMiddleWare;
