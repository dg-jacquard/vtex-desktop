
const express = require('express');
const path = require('path');
const gmailAPI = require('node-gmail-api');
const app = express();
const moment = require('moment');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

const clientId = '629808205065-jc5mjqjovqm6lofqm5pg11ou8goprcr9.apps.googleusercontent.com';
const clientSecret = 'ndmbOhtNwIpu5MksDmq1XFvO';

const matchSubject = 'Sua chave de acesso é';
const matchFrom = 'noreply@vtexcommerce.com.br';
const messagesDate = '1d';
// https://support.google.com/mail/answer/7190
const messagesFilter = `subject:${matchSubject} from:${matchFrom} newer_than:${messagesDate}`;

const accessToken = 'ya29.GlvCBQIPTKGJuPSZ9-NOkPbFEOHJB93IPPn8tYezMbXXSe50UFfx36QbOeUQWVaUoAWWriMs2fZQ6GhAMENyN95iWGvNVl443mwp0DlZZKQYfog9SmiHBsb4aJ1O';

server.listen(port, function () {
  console.log('[server] listening at port %d', port);
});

io.on('connection', function (socket) {

  console.log(' (#' + socket + ')');

  socket.on('refresh', function (data, ack) {
    getNewMessages();
  });

  socket.on('disconnect', function () {
    console.log(' (#' + socket + ')');
  });

  function getNewMessages() {

    var gmail = new gmailAPI(accessToken);
    var inbox = gmail.messages(messagesFilter, {max: 10});
    var data = [];

    inbox.on('data', function (d) {

      let subject = d.payload.headers.find(x => x.name === 'Subject').value.match(/\s(\d+)/);
      let date = moment(d.payload.headers.find(x => x.name === 'Date').value);

      if(subject && subject.length == 2) {
        console.log('code', subject[1], date.format('DD/MM/YYYY HH:mm'));
        data.push({
          code: subject[1],
          date: date.format('DD/MM/YYYY H:m')
        });
      }

      // console.log(util.inspect(d, false, null));

    });

    inbox.on('end', function() {
      socket.emit('codeList', data);
    });

    setTimeout(getNewMessages, 1000 * 30);

  }

  getNewMessages();

});
