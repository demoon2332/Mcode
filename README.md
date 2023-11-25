# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Notice:

1. npx create-react-app mcode --use-npm --> maybe require install create-react-app module
2. npm install react-router-dom,....
3. create folder structure
4. npm install --save @fortawesome/fontawesome-svg-core
5. npm install --save @fortawesome/free-solid-svg-icons
6. npm install --save @fortawesome/react-fontawesome
7. npm install --save jwt-decode --> decode jwt at client, reduce server's effort
8. npm audit fix --force
9. npm install --save react-cookie (16:43 20/11/2023) --> then call npm audit fix --force (be careful with this --force option)
10. after call audit fix --force, project go crazy :< when npm start --> delete node_modules --> run npm install
    ) npm start
11. npm install i18next react-i18next
12. npm install react-select --save

- sau khi đăng nhập thì đã đồng bộ ở các tab, tuy nhiên sau khi hết 1p hơn tí (do set expiration time của token là 1 phút)
  thì bật tab thứ 2, access token và refresh token mất hết.
  --> vấn đề trên đã đc giải quyết, chỉ là ở file useRefreshToken, nếu truy cập tới cái biến auth, setAuth, login thì sẽ bị null, nên
  hiện tại tốt nhất nên để useRefreshToken làm việc độc lập 1 tí
  - vì dùng cả accessToken (lưu ở local) và refreshToken lưu ở cookies (nên có thể việc useRefreshToken sẽ đc làm độc lập)
    --> cân nhắc nên để useRefreshToken tự truy cập tới storage, cookies lấy hay pass qa từ auth provider , hmmmm
  - !!! NHớ set http only cho cookie để tăng bảo mật, hạn chế người dùng truy cập vào cookie trực tiếp qa Javascript
