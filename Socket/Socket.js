const rootSocket = (io) => {
    // LISTE DES USERS CONNECTES
    let currentSession = {};

    io.on('connection', (socket) => {
        
        socket.on('startSession', (data) => {

            currentSession = data;
            io.emit('newSessionCode', currentSession.code);
            io.emit('setResp', currentSession.resp);
            io.emit('startSessionResponse', currentSession);
        });

        socket.on('getSessionCode', () => {
            io.emit('newSessionCode', currentSession.code);
        });

        socket.on('getResp', () => {
            io.emit('setResp', currentSession.resp);
        });
        
        socket.on('newUser', (data) => {
            //Adds the new user to the list of users
            currentSession.voters.push(data);
            //Sends the list of users to the client
            io.emit('newUserResponse', currentSession);
        });
    
        socket.on('disconnect', () => {
            //Updates the list of users when a user disconnects from the server
            currentSession.voters && (currentSession.voters = currentSession.voters.filter((user) => user.socketID !== socket.id));
            //Sends the list of users to the client
            io.emit('newUserResponse', currentSession);
            socket.disconnect();
        });
    });
};

module.exports = rootSocket;