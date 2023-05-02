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

<details>
<summary> 1️⃣ Redux-persist 적용 </summary>
<div markdown="1">
<br>
❗️ 문제 상황<br>
redux에 저장되있는 전역상태는 새로고침시 모두 초기화가 이루어지기 때문에 정보를 유지할 수 있는 캐시 기능의 구현이 필요했습니다.
<br><br>
💡 해결방안<br>
기존에는 새로고침시에 로그인이 풀리지 않도록 하기 위해서 LocalStorage에 사용자 인증 상태를 확인하기 위한 토큰을 저장하고 불러와서 사용하고는 했습니다. 하지만 그 토큰에 페이지의 많은 상태 값이 의존하고 있고, LocalStorage에 매번 접근하여 인증 정보를 가져오는 것보다 store로 통합해서 관리하는 것이 더 낫다고 판단하여 redux-persist 를 사용하여 해결하였습니다.
<br>
<br>
</details>
<details>
<summary>2️⃣ Refrash Token</summary>
<div markdown="2">  
<br>  
❗️ 문제 상황<br>
리프레시 토큰을 적용하면서 인증인가 처리에 대한 인터셉터 로직이 추가되어야 했습니다.
페이지 내에서 API요청을 여러개를 해야하는 경우가 있었는데 모든 요청이 비동기로 실행되어 인증, 인가가 제대로 이루어 지지 않는 현상이 발생했습니다.
<br><br>
💡 해결방안<br>
useEffect안의 dispatch() 에 async await를 걸어주어 동기적 처리를 하고, 요청이 차례대로 가게 하였고 axios의 인터셉터에서 모든 인가에 대한 에러메세지를 받았습니다. 엑세스 토큰이 만료되었을때 리프레쉬 토큰을 보내어 인증을 다시 받아 토큰을 발급 받고 이전의 API요청을 다시 처리하게 구현되었습니다. 내부적으로 인가에 대한 문제가 발생 되었지만 사용자는 어떤 문제가 발생했는지 모르게 처리되었습니다.  두 토큰이 모두 만료 되었을때는 모든 토큰 값을 지우고 로그인창으로 유도 시킵니다.
</div>
</details>
