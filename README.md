### 👼최종 프로젝트 Helpus

도와주고, 도움받는 따뜻한 세상 누구나, <br>언제든지 따뜻한 손길이 필요할 때 **Helpus**

### 🍎공동작업 노션

<a href="https://potent-print-150.notion.site/Front-End-62d756cc7acd4898bb1846275f1cd964">Front-end Document</a>

### 👯‍♀️5조 팀원

👱‍♀️나지원(BE)
👱최지호(BE)
👱최한울(FE)
👱김수현(FE)
👱‍♀️권애경(FE)

### 💡 주요 기능

- 게시글 CRUD
- 내 위치 기반 게시글 검색
- 게시글 작성자와 채팅하기
- 채팅 알림
- 문의한 유저에게 초대장 전송
- 약속이 완료된 유저 상호 평점 기록
- 게시글 신고하기

### 🛠 프로젝트 아키텍쳐

![default](/src/asset/architecture.jpg)

### 📝 기술 스택

| **기술 스택**      | **사용이유**                                                                                                                                                                                                                                                                                                                                                                |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Redux Toolkit      | 컨포넌트 내에서 상태관리 함에 있어서 props drilling을 피하기 위해 전역으로 데이터 저장하는 방법으로 리덕스를 사용하기로 하였고, 기존 Redux만을 사용했을때 작성되는 보일러 플레이트 코드를 줄여주고 redux를 사용하기 위해 설치해야했던 immer, thunk 등 내부적으로 라이브러리가 포함되어 툴킷만 설치하여 개발환경을 빠르게 설정할 수 있었습니다.                              |
| 카카오 소셜 로그인 | 사용자들이 가장 많이 사용하고 있는 카카오 로그인을 적용하여 빠르고 간편하게 서비스를 이용할 수 있게 하였습니다.                                                                                                                                                                                                                                                             |
| 카카오 map api     | 사용자의 현재 주소를 받아오기 위해 kakao map api를 사용하였습니다.                                                                                                                                                                                                                                                                                                          |
| Axios              | json 데이터를 자동으로 변환해주고 XSRF Protection 보안 기능과 Request 취소 와 Request Timeout 설정 이 가능 instance를 통해 baseUrl, headers, timeout 등을 여러곳에서 반복해서 작성할 필요가 없었고 intercepter를 통해 토큰을 담는 등 반복되는 코드를 한번에 처리할 수 있었습니다.                                                                                           |
| Styled Components  | - CSS의 컴포넌트화로 스타일시트의 파일을 유지보수 할 필요가 없고 CSS-in-JS 방식으로 JavaSript 환경을 최대한 활용 할 수 있습니다. CSS 를 컴포넌트 단위로 쪼갤수 있어 사용 빈도가 높은 CSS를 재사용할수 있습니다. 번들크기가 커지고 동적인 요소가 많이 들어간 페이지의 경우 상대적으로 느려지지만 큰 프로젝트가 아닌 소규모 팀 프로젝트 styled-component 사용하기로 했습니다. |
| socket.io          | 실시간 통신을 위해 html5 에서 지원하는 Websocket과 socket.io 라이브러리가 있는데 namespace, room, broadcast 등 1:1 채팅을 구현하기위해 필요한 기능들을 socket.io에서 기본적을 제공해주고 연결이 끊어졌을 때 socket.io는 주기적으로 연결을 시도해주어 필수적으로 처리해주어야하는 기능들을 기본으로 제공해주어 사용하게 되었습니다.                                          |

### 🛠 STACK

<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/reduxToolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src= "https://img.shields.io/badge/axios-764ABC?style=for-the-badge&logo=axios&logoColor=white"/>
<img src= "https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
<img src= "https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-000000?style=for-the-badge&logo=Socket.io&logoColor=white""/>

### 💥Trouble Shooting(FE)

- [Document 바로가기](https://potent-print-150.notion.site/Trouble-shooting-6c4fdead6ea7427bb33141a54a917999)
