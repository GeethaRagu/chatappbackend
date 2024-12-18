import express from 'express';
import { getUsers } from '../Controllers/userController.js';
import { protectRoute } from '../Middleware/protectRoute.js';

const route = express.Router();

route.get('/getusers',protectRoute,getUsers)

export default route;