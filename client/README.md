## 사용툴

react.js react-redux socket.io node.js

## 구현내용

- CRA, 라우터를 사용하여 구현했습니다.
- 페이지는 채팅 목록, 채팅방으로 이루어져 있습니다.
- client 폴더 안에서 npm install 후 npm run start 하면 실행하면 됩니다.

## 접근 가능한 URL

- https://ahyoung21.github.io/list/

## 폴더 트리

```
├── App.js
├── common
│   └── theme.js // 자주 쓰는 컬러 값, 미디어 쿼리 등 공통으로 사용할 수 있는 요소가 있는 컴포넌트입니다.
├── components
│   ├── Chat.js // 채팅방입니다. 소캣 연결 및 소캣을 통해 메시지를 보내는 역할을 하는 컴포넌트입니다.
│   ├── ChatLists.js // 채팅 목록입니다. ChatList.json을 가져와 목록을 뿌려주고 있습니다.
│   ├── Header.js // 채팅 목록, 채팅방에서 쓰이는 헤더 컴포넌트입니다. type으로 구분하여 보여주고 있습니다.
│   ├── Input.js // 채팅방에 하단 메시지 인풋, send 버튼이 있는 컴포넌트입니다.
│   ├── Message.js // 채팅방의 메시지 컴포넌트입니다. 유저를 비교하여 type을 통해 스타일을 주고 있습니다.
│   ├── Messages.js // messages를 받는 컴포넌트입니다. 날짜 구분선, 한 사람이 1분 동안 메시지를 연속해서 보낸다면, 마지막 메시지만 전송 시간을 표시해 주고 있습니다.
│   └── Upload.js // 파일업로드 아이콘을 눌렀을 때 노출되는 컴포넌트입니다.
├── data
│   └── ChatList.json
├── images
│   ├── ico_back@3x.png
│   ├── ico_menu@3x.png
│   ├── ico_person@3x.png
│   ├── ico_search@3x.png
│   ├── ico_send@3x.png
│   └── ico_upload@3x.png
├── index.js
├── store
│   ├── index.js
│   └── modules
│   └── user.js
└── styles
  	└── global-styles.js
```

### 채팅목록

- 목록 : ChatList.json 파일에서 목록 데이터를 가져와서 화면에 뿌려줬습니다.
- 애니메이션 : CSS keyframe을 사용하여 구현하였습니다.
- 시간 표기 : 표시되는 시간의 경우 YYYY-MM-SS HH:MM:SS 로 받아와서 하루를 넘길 경우 DAY로 하루 전일 경우 시간을 표시해 줬습니다.

### 채팅방

- 메시지 전송 시간 : moment 사용. 미국 서버를 사용하여 moment-timezone을 이용하여 아시아 시간으로 변경했습니다.
- 메시지 시간 예외 처리 : 한 사람이 1분 동안 메시지를 연속해서 보낸다면 자바스크립트로 조건처리를 하여 구현하였습니다.
- 날짜가 바뀌면 구분선 추가 작업은 moment에서 해당 날짜를 가져와서 자바스크립트로 처리하여 구현하였습니다.
- 사진 전송 기능은 socketio-file-upload를 이용하여 버튼 클릭 후 파일을 첨부하는 거까지는 구현하였는데 목록에서 사진을 클릭하자마자 그 사진이 첨부되는 기능은 구현하지 못했습니다.

## 고민되었던 부분

1. 통신했던 대화 기록들을 db에 보관해야 하는지 고민이 되었습니다.
2. 리덕스를 어디까지 적용할 것인가에 대해 고민이 되었습니다.
