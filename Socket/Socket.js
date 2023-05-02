const rootSocket = (io) => {
    // LISTE DES USERS CONNECTES
    let users = [];

    io.on('connection', (socket) => {
        console.log(`New visitor ⚡: ${socket.id}`);
    
        //Listens when a new user joins the server
        socket.on('newUser', (data) => {
            //Adds the new user to the list of users
            users.push(data);
            //Sends the list of users to the client
            io.emit('newUserResponse', users);
        });
    
        socket.on('disconnect', () => {
            console.log('🔥A user disconnected');
            //Updates the list of users when a user disconnects from the server
            users = users.filter((user) => user.socketID !== socket.id);
            //Sends the list of users to the client
            io.emit('newUserResponse', users);
            socket.disconnect();
        });
    });
};

module.exports = rootSocket;