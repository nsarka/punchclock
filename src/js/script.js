$(function() {
    var app = new Vue({
        el: '#app',
        data: {
            userHours: {
                allWorkSessions: {
                    one: {
                        approved: true,
                        date: "123",
                        in: "456",
                        out: "789",
                        hours: "9999"
                    },

                    two: {
                        approved: false,
                        date: "123",
                        in: "456",
                        out: "789",
                        hours: "9999"
                    }
                }
            },

            punchStatus: {
                punchedIn: false,
                lastPunch: "3:37 pm"
            },

            hoursToApprove: {
                user1: {
                    info: {
                        name: "Rick",
                        allUnapprovedWorkSessions: {
                            one: {
                                date: "123",
                                in: "456",
                                out: "789",
                                hours: "9999"
                            },

                            two: {
                                date: "123",
                                in: "456",
                                out: "789",
                                hours: "9999"
                            }
                        }
                    }
                },

                user2: {
                    info: {
                        name: "Joe",
                        allUnapprovedWorkSessions: {
                            one: {
                                date: "123",
                                in: "456",
                                out: "789",
                                hours: "9999"
                            },
                            
                            two: {
                                date: "123",
                                in: "456",
                                out: "789",
                                hours: "9999"
                            }
                        }
                    }
                }
            },

            name: "Rick",
            supervisor: true
        },

        methods: {
            punchTheClock: function() {
                //socket.emit('punch', this.userHours);
                this.punchStatus.punchedIn = !this.punchStatus.punchedIn; //testing
            },

            buttonDown: function() {
                $('#bigRedButton').attr('src', 'images/button-down.png')
            },

            buttonUp: function() {
                $('#bigRedButton').attr('src', 'images/button-up.png')
            }
        }
    });

    // Sockets
    var socket = io();

    socket.on('punch accepted', function(){

    });
    
    socket.on('user hours', function(data){
        app.userHours = data
    });

});