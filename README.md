# Zoom Clone Coding

Zoom Clone using NodeJs,WebRTC AND Websockets (javaScript)

#### MVP CSS 사용법
![img.png](img.png)
  
#### Nodemon : 프로젝트를 살펴고 변경사항 있을시 서버를 재시작해주는 프로그램 ( 서버 재시작 대신 아래 이미지 컴파일)
![img1.png](img1.png)
  
#### public 폴더를 유저에게 공개
![img2.png](img3.png)

#### 
![img4.png](img2.png) 

## WEBSOCKETS
- HTTP VS WebSocket ( 서버가 사용자 기억이 가능 )
![img_1.png](img_1.png) <br/><br/>
- WebSocket Messages (back-end) 
![img_2.png](img_2.png) <br/><br/>
- 다른 브라우저에서 (크롬, 엣지 등등) socket 전송위한 소스 (forEach)
![img_3.png](img_3.png) <br/><br/>
- 백엔드에서는 다양한 프로그래밍언어 사용 자바스크립트 object 보내면 안됨 (문자열로 변경)  
![img_4.png](img_4.png) <br/><br/>
- socket안에 정보를 저장 할 수있다 object이기 때문
![img_5.png](img_5.png)


### 라이브러리
[ws:Node.js WebSocket](https://www.npmjs.com/package/ws) <br/>
- server.js socket : 연결된 브라우저
- front(app).js socket:  서버로의 연결

[comment]: <> (https://nomadcoders.co/noom/lectures/3072)

