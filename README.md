# NoRoad: Aplicación de mensajería anónima y segura

NoRoad es una aplicación web de mensajería instantánea diseñada para proporcionar una experiencia de comunicación segura y anónima a sus usuarios. La aplicación fue desarrollada utilizando React en el front-end y Node.js en el back-end, garantizando una alta velocidad y rendimiento en la experiencia del usuario.

En NoRoad, los usuarios pueden registrarse sin proporcionar información personal. Al registrarse, se generan dos claves, una pública y una privada. La clave pública se almacena en la base de datos de MongoDB y la clave privada es responsabilidad del usuario mantenerla en un lugar seguro.

La aplicación permite a los usuarios crear chats con otros usuarios conocidos por su ID. Una vez creado el chat, todos los mensajes enviados se encriptan utilizando la clave pública del destinatario. Solo el destinatario será capaz de desencriptar los mensajes recibidos con su clave privada.

En resumen, NoRoad es una aplicación web segura y anónima diseñada para proporcionar a sus usuarios una experiencia de mensajería instantánea sin preocupaciones sobre la privacidad de su información. Únete hoy mismo y experimenta la comunicación segura y anónima que ofrece NoRoad.
