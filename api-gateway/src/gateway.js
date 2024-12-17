const express = require('express');
const cors = require('cors');
const axios = require('axios');
const kafka = require('kafka-node');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Error in Kafka Producer:', error);
});

app.post('/api/send-email', async (req, res) => {
    try {
        const payloads = [{ topic: 'email-topic', messages: JSON.stringify(req.body) }];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message to Kafka:', err);
                res.status(500).json({ error: 'Error sending message to Kafka' });
            } else {
                res.json({ success: true, data });
            }
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Error sending email' });
    }
});

app.post('/api/send-sms', async (req, res) => {
    try {
        const payloads = [{ topic: 'sms-topic', messages: JSON.stringify(req.body) }];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message to Kafka:', err);
                res.status(500).json({ error: 'Error sending message to Kafka' });
            } else {
                res.json({ success: true, data });
            }
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Error sending SMS' });
    }
});

app.get('/api/no-disturb-list', async (req, res) => {
    try {
        const response = await axios.get('http://no-disturb-api:3001/no-disturb-list');
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Error fetching no-disturb list' });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});