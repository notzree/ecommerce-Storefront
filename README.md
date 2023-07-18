
# About
 This is the Repo for a Technical take-home assessment tasked to create a fullstack, functional e-commerce application. You can visit it here: [APPLICATION LINK](https://main.d2uire0dhku2fz.amplifyapp.com/)

# The application:
Click here for rough architecture diagram: [Excalidraw link](https://excalidraw.com/#room=aa5027f257348b5297c2,MhH1YDqNhUHEkzXLI3eqQA)
## Back-end
The code for the Backend aws lambda functions are located in another repo: [LINK](https://github.com/notzree/jitto_lambda_functions).
The backend was designed to overcome 2 major problems, User Authentication, and handling orders. It consists of AWS Lambda functions routed with AWS Api gateway, and a DynamoDB NoSQL Database. 

### User Auth
I implemented a custom JWT Solution without any external libraries (except ones to interact with the token itself). I send over the hashed password to the lambda function and compare the hashed password with the stored hashed password. If they are equal, I sign a JWT token with an expiry date and return it to the front-end. To protect my API routes, each Lambda function verifies the provided JWT token. If the token is invalid, it will return an Error.
### Handling orders / Database setup. 
I'm using 2 tables, Users, and Orders. The users store all the authentication info and user info, and the ordesr store the orders and items. For the purpose of this project, the number of items the store carries are limited so a third table was not needed. DynamoDB Query requires a known primary key, in my use case, I only read the order data when I have the UserId, so the table UserID as the primary key and the orderID as the sortkey, this enables faster readtimes, O(1) query vs O(N) scan.

## Front-end 
Built using  Next.js App styled using TailwindCSS. Utilized Next.js to take advantage of middleware that enables me to easily secure my front-end and prevent flashes of restricted content.
I created 3 custom hooks to handle authentication:
### useLogin: 
 - Invokes the login API which returns the JWT Token
 - Sets a cookie with the user object containing username, expiry date, and the token
 - Redirects the user according to the register page if they are not registered
 ### useRegister:
- Invokes the register API and redirects the user if successful
### useLogout:
- Deletes the cookie and redirects the user

### Shopping cart logic
All the logic for the shopping cart is done within StateContext.tsx. This is beause other components often need access to other variables like showCart, setShowCart, as well as the cart item manipulation functions. Using a StateContext allows me to easily pass all of these vars/functions to other components. 


 
