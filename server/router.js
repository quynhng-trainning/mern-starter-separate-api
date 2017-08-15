'use strict';

const AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport'),
    constantRole = require('./util/constants/role');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


module.exports = function(app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        taskRoutes = express.Router();

    //=========================
    // Auth Routes
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);
    // Registration route
    authRoutes.post('/register', AuthenticationController.register);
    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // Set task routes as a subgroup/middleware to apiRoutes
    let taskController = require('./controllers/taskController');
    apiRoutes.use('/tasks', taskRoutes);
    // View user profile route
    taskRoutes.get('', requireAuth, taskController.findAll);
    taskRoutes.post('', requireAuth, taskController.create);
    taskRoutes.get('/:taskId', requireAuth, taskController.findById);
    taskRoutes.put('/:taskId', requireAuth, taskController.update);
    taskRoutes.delete('/:taskId', requireAuth, AuthenticationController.roleAuthorization(constantRole.ROLE_ADMIN), taskController.delete);

    // Set url for API group routes
    app.use('/api', apiRoutes);
};