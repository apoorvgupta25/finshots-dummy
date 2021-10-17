const express = require('express')
const router = express.Router()

const {getSubscriberById, createSubscriber, getSubscriber, getAllSubscriber, removeSubscriber} = require('../controllers/subscriber')

router.param('subscriberId', getSubscriberById);

router.post('/add/subscriber', createSubscriber);

router.get('/subscriber/:subscriberId', getSubscriber);
router.get('/all/subscribers', getAllSubscriber);

router.delete('/remove/subscriber/:subscriberId', removeSubscriber);

module.exports = router;
