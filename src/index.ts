import amqplib from 'amqplib';
import axios from 'axios'; 

const initBroker = async () => {
    try {
        let connection = await amqplib.connect('amqp://44.219.171.72');
        let ch = await connection.createChannel();
    
        ch.consume('payments', async (msg: any) => {
            try {
                const datos = msg.content.toString();
                console.log(datos);

                const response = await axios.post('http://44.219.171.72/pagado', { datos});

                console.log('Respuesta de la API:', response.data);
            } catch (error) {
                console.error('Error al enviar los datos a la API:', error);
            }

            ch.ack(msg);
        });

        console.log('El broker ha iniciado correctamente');
    } catch (error) {
        console.log('Hubo un error al iniciar el broker', error);
    }
}

initBroker();
