# GTC(Growtopaia Community) Project
그로우토피아 게임의 웹 커뮤니티 프로젝트입니다.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `rewire 사용시 필수 설정`

{project-name}/node-modules/babel-preset-react-app 경로의
create.js 파일 133번째 줄 false 값을 { legacy: true } 로 변경하면
mobx에서 사용하는 방식의 데코레이터를 사용할 수 있음.
+ 현재 rewired 패키지를 통해 필요없어짐.

## 개발환경

- node v10.16.0
- MariaDB
- CRAv2 (create-react-app v2)
- IDE ( WebStorm )
 
## 사용한 기술 스택 및 라이브러리, 프레임워크, 아키텍쳐

- react
- code-splitting
- express
- mobx
- react-router
- styled-components
- reactstrap
- material-ui
- axios
- SPA
- react-hooks
- mysql
- prop-types
- nodeJs
- es6
- es-lint (airbnb)
- customize-cra
- babel
- webpack
- http-proxy-middleware
- npm-run-all
