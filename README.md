# NoRoad: Anonymous and secure messaging application

NoRoad is an instant messaging web application designed to provide a secure and anonymous communication experience to its users. The application was developed using React on the front-end and Node.js on the back-end, ensuring high speed and performance in the user experience.

In NoRoad, users can register without providing personal information. When registering, two keys are generated, a public and a private key. The public key is stored in the MongoDB database and the private key is the responsibility of the user to keep in a secure location.

The application allows users to create chats with other users known by their ID. Once the chat is created, all messages sent are encrypted using the recipient's public key. Only the recipient will be able to decrypt the messages received with their private key.

In summary, NoRoad is a secure and anonymous web application designed to provide its users with an instant messaging experience without concerns about the privacy of their information. Join today and experience the secure and anonymous communication that NoRoad offers.
