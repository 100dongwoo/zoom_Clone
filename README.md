# Zoom Clone Coding

Zoom Clone using NodeJs,WebRTC AND Websockets (javaScript)

#### MVP CSS 사용법

![img.png](Image/img.png)

#### Nodemon : 프로젝트를 살펴고 변경사항 있을시 서버를 재시작해주는 프로그램 ( 서버 재시작 대신 아래 이미지 컴파일)

![img1.png](Image/img1.png)

#### public 폴더를 유저에게 공개

![img2.png](Image/img3.png)

####          

![img4.png](Image/img2.png)

## WEBSOCKETS

- HTTP VS WebSocket ( 서버가 사용자 기억이 가능 ) <br/>
  ![img_1.png](Image/img_1.png) <br/><br/>
- WebSocket Messages (back-end) <br/>
  ![img_2.png](Image/img_2.png) <br/><br/>
- 다른 브라우저에서 (크롬, 엣지 등등) socket 전송위한 소스 (forEach)<br/>
  ![img_3.png](Image/img_3.png) <br/><br/>
- 백엔드에서는 다양한 프로그래밍언어 사용 자바스크립트 object 보내면 안됨 (문자열로 변경)   <br/>
  ![img_4.png](Image/img_4.png) <br/><br/>
- socket안에 정보를 저장 할 수있다 object이기 때문 <br/>
  ![img_5.png](Image/img_5.png)

## Socket.IO

- socket.on 받는거 / socket.emit 보내는느낌
- Socket.io는 webSocket 의부가기능이 아니며, socketIo는 가끔 webSocket 사용하는 FrameWork
- Socket.io는 webSocket + 다른것도 사용
- webSocket은 object 전송 x , string 변환시키고 string 전송
- socket.io는 어떤 event도 전송가능 / object 전송가능 / 서버에서 호출하는 function이 들어갈수있음 (callback함수)
- back-end에서 function을 호출 하지만 fuction은 front-end에서 실행됨 <br/>
  ![img_6.png](Image/img_6.png) <br/><br/>
- socket.IO는 room.id를 제공(join을 통한 room 접속가능 ) <br/>
  ![img_7.png](Image/img_7.png) <br/><br/>
- 서버와 프론트에서 주고 받는 방법 <br/>
  ![img_8.png](Image/img_8.png) <br/><br/>
- 소켓전체에 뿌려주기위한 <br/>
  ![img_9.png](Image/img_9.png) <br/><br/>
- npm i @socket.io/admin-ui [admin-ui](https://admin.socket.io) <br/>

## WebRTC

- webRtc = p2p 방식 (서버 필요 없이 연결이 되있는 형식(직접연결))
- javaScript 카메라 track 컨트롤
  ![img_10.png](Image/img_10.png) <br/><br/>
- 카메라 옵션을 통한 정보 가져오기
  ![img_11.png](Image/img_11.png) <br/><br/>
-

<br/><br/>

### 라이브러리

[ws:Node.js WebSocket](https://www.npmjs.com/package/ws) <br/>

- server.js socket : 연결된 브라우저
- front(app).js socket:  서버로의 연결
- webRtc logic 
![img_12.png](Image/img_12.png) <br/><br/>
- 아래 두 소스의 실행되는 브라우저가 다르다. (offer 주고 받는 차이 )
![img_13.png](Image/img_13.png) <br/><br/>
- Ice Candidate : 브라우저가 서로 소통할 수 있게 해주는 방법
- npm install localtunnel (url 일시적으로준다) lt --port 3000
- STUN server : 장치에 공용주소를 알려주는 서버
- DataChannel 통한 peer to peer 교환(각각 DataChannel 생성해줘야한다= 변수 정의하는 곳이 다름)
- 이 변수를 양쪽 브라우저에 모두 정의 해야함  (myDataChannel.send("")= 테스트방법)
![img_14.png](Image/img_14.png)

[comment]: <> (https://nomadcoders.co/noom/lectures/3077)

