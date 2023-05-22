# 누리로봇 서포터
<br>

### NURI ROBOT Supporter란?
NURI ROBOT에서 판매하는 RS485지원 모터 및 모터드라이버의 지원 프로그램입니다.
**프로그램은 다중 실행하는 것이 가능하지만, 매크로를 생성하거나 수정은 최초 시작된 프로그램에서만 가능합니다.**
다음의 설치위치에서 설치프로그램을 제공합니다.
<br>

### 설치 전 점검사항
#### 운영체제
프로그램 설치 실패 시 **Windows 업데이트** 여부를 확인하시기 바랍니다.

#### 하드웨어
* x86 또는 x64 기반의 Windows PC 혹은 노트북
* USB 혹은 내장 RS485 포트
<br>

### [누리로봇 서포터 다운로드 페이지](./publish.htm) 👈 

### 버전정보
##### 1.4.4
* 장비 검색 방식 변경
  * 모든 아이디에 대해서 검색하는 방식으로 변경
  * 485충돌 검출 문제로 제품 검색이 안되는 문제로 변경
<br>
<br> 
##### 1.4.3
* 감속비 소숫점 입력 가능하도록 수정
<br>
<br> 
##### 1.4.1
* 도달시간 관련 버그 수정
* 단독제어 상 스마트모터 메뉴 버그 수정
* 설치 시 이전 버전 삭제 기능 추가
<br>
<br> 
##### 1.4.0
* 로그 뷰 해제 시 로그 뷰 비활성화
* 가감속 속도 최소 0.1로 설정
* 장비 조회 시 검색 시만 연결 bps 속도 고정
* 체크섬 계산기 추가
* 에러 전문 표시 기능 추가(설정에서 제어 가능)
* 장비 아이디가 확인되어야 만 메뉴 표시
<br>
<br> 
##### 1.3.5
* 뷰 로딩 방식 변경(메모리 사용량 절감)
* 지시적 가베지 컬렉션 사용(메모리 사용량 절감)
* 장시간 사용이 가능하도록 수정
<br>
<br> 
##### 1.3.4
* 터미날 반복 처리시간 대기방식 변경
<br>
<br> 
##### 1.3.3
* 윈도우즈 11 지원
<br>
<br>
##### 1.3.2
* 터미날 기능 안정성 향상
<br>
<br>
##### 1.3.1
* 시리얼 터미날 기능 추가
* 전문 생성 기능 추가
* 안정성 향상
* 그래픽 하드웨어 가속 기능 제거(스크린 캡쳐, 원격지원 안정성 향상)
* 스마트 모터에 대한 매크로 지원 추가

##### 1.2.3
* 영문 메뉴 추가
* 상태 확인 기능 추가

##### 1.2.2 
* 스마트 모터 지원
* 프로토콜 복사 기능 추가
* 로그 복사 기능 추가(로그창을 클릭하고 Ctrl+C, 모든 로그 복사)
* 485컨버터 검색 기능 추가

##### 1.1.1 
* 모터 컨트롤러 지원
* 스마트 액츄에이터 지원

##### 지원 예정 기능
* 시리얼터미널

### 설치
설치프로그램은 윈도우가 연결된 상태에서 필요한 파일을 다운로드 받아서 설치합니다.(인터넷 연결이 필요합니다.)
만약 인터넷이 연결되지 않은 환경에서 설치를 위해서는 다음의 파일들이 필요합니다. 
해당 파일을 다운로드해서 순차적으로 설치하시기 바랍니다.

* .Net Framework 4.7.2
  * Windows (7, 8, 10, Server...) http://go.microsoft.com/fwlink/?linkid=863265
  * Windows 8.1 RT http://go.microsoft.com/fwlink/?LinkId=863276
* NURI ROBOT Supporter 오프라인 설치파일
  *  https://support.nurirobot.info/NurirobotSupporterSetup.msi

### Windows 설치 경고
![41_windowSetup](./Images/41_windowSetup.png)
추가정보를 눌러 설치를 진행할 수 있습니다.
![42_run](./Images/42_run.png)
<br>
<br>

![Start_popup](./Images/01_Startup.png)

### 지원대상
NURI ROBOT 제품중 RS485 제품군

##### 모터 컨트롤러
* [DCMC-200-RS485](http://www.nurirobot.com/shop/goods_view.php?gno=63&pid=119&cate1=11)
* [BLMC-200-RS485-H](http://www.nurirobot.com/shop/goods_view.php?gno=64&pid=119&cate1=11)
![se2_15787106814648](./Images/se2_15787106814648.jpg)


##### 스마트 모터
* [SM70-100-RS485](http://www.nurirobot.com/shop/goods_view.php?gno=67&pid=120&cate1=12)
* [SM70-200-RS485](http://www.nurirobot.com/shop/goods_view.php?gno=70&pid=120&cate1=12)
* [SM84-2-RS485](http://www.nurirobot.com/shop/goods_view.php?gno=71&pid=120&cate1=12)
* [SM109-12-RS485](http://www.nurirobot.com/shop/goods_view.php?gno=72&pid=120&cate1=12)
![se2_15794331401636](./Images/se2_15794331401636.jpg)

##### 스마트 액츄에이터
* [RSA70-100-RS485-H](http://www.nurirobot.com/shop/goods_view.php?gno=73&pid=121&cate1=13)
* RSA70-100-RS485-ZH
* [RSA70-200-RS485-H](http://www.nurirobot.com/shop/goods_view.php?gno=75&pid=121&cate1=13)
* RSA70-200-RS485-ZH
![se2_15794331544188](./Images/se2_15794331544188.jpg)

### 지원기능
* 모터 및 모터드라이버 설정
* 단일 모터 및 모터드라이버 동작 테스트
* 다중 모터 및 모터드라이버 동작 테스트
* 매크로를 이용한 프로토타입 개발
* 장비 조회
* 도움말
* 언어설정
* 통신 프로토콜 확인
* 프로토콜 생성기능
* 터미날 

#### 모터 및 모터드라이버 설정
설정 메뉴를 통한 제품을 세팅합니다.
![02_Setting](./Images/02_Setting.png)

#### 단일 모터 및 모터드라이버 제어
개별 모터나 모터드라이버의 동작을 제어합니다.
![03_Single](./Images/03_Single.png)

#### 다중 모터 및 모터드라이버 제어
다중 모터나 모터드라이버의 동작을 제어합니다.
![04_Multiple](./Images/04_Multiple.png)

#### 매크로를 이용한 프로토타입핑
설정이나 동작 메뉴에서 녹화한 기능 호출에 대해서 코드를 통해서 제어합니다.
![05_Macro](./Images/05_Macro.png)

#### 장비 조회
현재 연결된 comport에 대해서 하위 장비를 조회합니다.
(설정 정보를 모를 경우에 사용합니다.)
![06_Search](./Images/06_Search.png)

#### 터미날
시리얼 터미날을 직접 제어할 수 있는 시리얼 터미날을 제공합니다.
![45_terminal](./Images/45_terminal.png)

#### 도움말
현재 도움말 사이트 연결을 제공합니다.
시작 시 장비조회 팝업을 제거 할 수 있습니다.
화면 테마를 수정할 수 있습니다.
![07_Help](./Images/07_Help.png)

#### 언어설정
한글 또는 영문으로 프로그램 인터페이스 언어를 변경합니다.
![08_Locale](./Images/08_Locale.png)