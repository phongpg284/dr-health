# Dr.Health  
Web application connect patients and doctors
Created with [Apollo](https://www.apollographql.com/) and [Create-React-App](https://create-react-app.dev/)

Server using [MongoDB](https://www.mongodb.com/) and [Mosquitto](https://mosquitto.org/)
## Table of contents
- [Project structures](#project-structures)
- [Requirements](#requirements)
- [Development install](#development-install)
- [Development configs](#development-configs)
- [Run development project](#run-development-project)
- [MQTT API](#mqtt-api)
## Project structures
**VS Code workspace**
- `ROOT`: root folder
- `SERVER`: server using Apollo Graphql
- `CLIENT`: client using Create-react-app

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [MQTT broker (Mosquitto)](https://mosquitto.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Development install
```
git clone https://github.com/tpw284/stroke-medical.git
cd stroke-medical
#Install all dependencies(from root folder)
yarn
```

## Development configs
- Run `yarn` or `npm install` at `ROOT`, `SERVER` and `CLIENT` to install all dependencies(no need if run script above).
- At `SERVER` and `WEB` to create `.env`: 
```
cp .env.example .env
``` 
- Add key/value to `.env`:
  - `SERVER`:
    - `NODE_ENV=development`: NodeJS environment(`development` or `production`) 
    - `PORT=3001` : Port running server (Default: `3001`)
    - `DB_ENDPOINT=mongodb://localhost:27017` : MongoDB url (Default: `mongodb://localhost:27017`)
    - `DB_USERNAME=username`: MongoDB username (Default: `none`)
    - `DB_PASSWORD=password`: MongoDB password (Default: `none`)
    - `JWT_KEY=somestring` : JWT private key
  - `CLIENT`:
    - `PORT=3000`: Port running client (Default: `3000`)
    - `REACT_APP_GRAPHQL_URI=http://localhost:3001/graphql` : URI connect to server (Default: `http://localhost:3001/graphql`)
    - `REACT_APP_GRAPHQL_URI=ws://localhost:3001/graphql` : Websocket URL connect to server (Default: `ws://localhost:3001/graphql`)
    - `REACT_APP_GAME_FILES_URL=http://localhost:3001/game-files` : Game files endpoint
## Run development project
- Run `SERVER`:
  - At `/server` to start server run 
  ```
  yarn dev
  ```
- Run `CLIENT`:
  - At `/client` to start client run 
  ```
  yarn dev
  ```
- Run both `SERVER` and `CLIENT`:
  - At root folder `/` to start both server and client concurrently run
  ```
  yarn dev
  ```


## MQTT API
### MQTT Topic List for Device

| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`deviceID_0002`/$name  | Device Name                                | stroke_medical                                         |
| `mandevices`/`deviceID_0002`/$state | Device State                         | `init`, `ready`, `disconnected`, `sleeping`, `lost`, `alert` |
| `mandevices`/`deviceID_0002`/$homie | Homie Version                             | 4.0.0                                                        |
| `mandevices`/`deviceID_0002`/$nodes | Node list | human                                          |

- Device used in this project is `stroke_medical`

### MQTT Topic List for Nodes

| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/$name  | Node Name                                | human                                         |
| `mandevices`/`stroke-medical`/`human`/$type | Node Type                         |  |
| `mandevices`/`stroke-medical`/`human`/$property | Node list, separated by `,`                             | SpO2, Heart_Rate, Body_Temp, Position, Medicine, SpO2_Threshold, Heart_threshold, Temp_Threshold                                                        |
- Nodes used in this project is `human`

### MQTT Topic List for Properties
- #### SpO2 Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`SpO2`/$name  | Property Name                                | Độ bão hòa Oxy                                         |
| `mandevices`/`stroke-medical`/`human`/`SpO2`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`SpO2` | Payload
| `mandevices`/`stroke-medical`/`human`/`SpO2`/$unit | Property Unit                         | % |
- #### Heart_Rate Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Heart_Rate`/$name  | Property Name                                | Nhịp tim                                         |
| `mandevices`/`stroke-medical`/`human`/`Heart_Rate`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`Heart_Rate` | Payload
| `mandevices`/`stroke-medical`/`human`/`Heart_Rate`/$unit | Property Unit                         | bpm |
- #### Body_Temp Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Body_Temp`/$name  | Property Name                                | Nhiệt độ cơ thể                                         |
| `mandevices`/`stroke-medical`/`human`/`Body_Temp`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`Body_Temp` | Payload
| `mandevices`/`stroke-medical`/`human`/`Body_Temp`/$unit | Property Unit                         | °C |
- #### Position Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Position`/$name  | Property Name                                | Vị trí                                         |
| `mandevices`/`stroke-medical`/`human`/`Position`/$datatype | Property Type                         | Geo |
| `mandevices`/`stroke-medical`/`human`/`Position` | Payload
| `mandevices`/`stroke-medical`/`human`/`Position`/$unit | Property Unit, separated by `,`                         | °N, °S |
- #### Medicine Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Medicine`/$name  | Property Name                                | Y tế                                         |
| `mandevices`/`stroke-medical`/`human`/`Medicine`/$datatype | Property Type                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Medicine` | Payload
| `mandevices`/`stroke-medical`/`human`/`Medicine`/$settable | Property Settability                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Medicine`/$retained | Property Retainment                         | Boolean |

Note:

* Property command topic: `mandevices`/`stroke-medical`/`human`/`Medicine`/ **`set`**

* `$settable`: 
```java
mandevices/stroke-medical/human/Medicine/$settable ← "true"
```
* `$retained`:
```java
mandevices/stroke-medical/human/Medicine/$retained ← "false"
```
- #### SpO2_Threshold Property
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$name  | Property Name                                | Ngưỡng bão hòa Oxy                                         |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold` | Payload
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$unit | Property Unit                         | % |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$settable | Property Settability                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$retained | Property Retainment                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/$format | Property Format                         | `0:100` |

Note:

* Property command topic: `mandevices`/`stroke-medical`/`human`/`SpO2_Threshold`/ **`set`**

* `$settable`: 
```java
mandevices/stroke-medical/human/SpO2_Threshold/$settable ← "true"
```
* `$retained`:
```java
mandevices/stroke-medical/human/SpO2_Threshold/$retained ← "false"
```
- #### Heart_Threshold Property 
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$name  | Property Name                                | Ngưỡng nhịp tim                                         |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold` | Payload
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$unit | Property Unit                         | bpm |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$settable | Property Settability                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$retained | Property Retainment                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/$format | Property Format                         | `40:160` |

Note:

* Property command topic: `mandevices`/`stroke-medical`/`human`/`Heart_Threshold`/ **`set`**

* `$settable`: 
```java
mandevices/stroke-medical/human/Heart_Threshold/$settable ← "true"
```
* `$retained`:
```java
mandevices/stroke-medical/human/Heart_Threshold/$retained ← "false"
```
- #### Temp_Threshold Property 
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$name  | Property Name                                | Ngưỡng nhiệt độ                                        |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$datatype | Property Type                         | Float |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold` | Payload
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$unit | Property Unit                         | °C |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$settable | Property Settability                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$retained | Property Retainment                         | Boolean |
| `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/$format | Property Format                         | `30:45` |

Note:

* Property command topic: `mandevices`/`stroke-medical`/`human`/`Temp_Threshold`/ **`set`**

* `$settable`: 
```java
mandevices/stroke-medical/human/Temp_Threshold/$settable ← "true"
```
* `$retained`:
```java
mandevices/stroke-medical/human/Temp_Threshold/$retained ← "false"
```
- Property used in this project 

|Node|Property|Datatype|Note|
|----|--------|--------|----|
|`human`|SpO2|Float|
||Heart_Rate|Float|
||Body_Temp|Float|
||SpO2_threshold|Float|Command Topic|
||Heart_threshold|Float|Command Topic|
||Temp_Threshold|Float|Command Topic|
||Position|Geo|
||Medicine|Boolean|Command Topic|

### Datatype for property payload

1. Json Format with following keys 

    | Key |Data Type|Meaning|
    |-----------|---------|-------|
    |long |Float |Longitude|
    |lat |Float |Latitude|

1. String
1. Integer
1. Float
1. Percent
1. Boolean
1. Enum
1. Color


### Data Analysis

> **Note:** Name of topic depends on the ordinal number of the appendix *(in document/document.pdf - page 62)*

- #### AI part
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`Stroke`/`1b`/$datatype  | Property Value                                |0 or 1 or 2                                 |
| `mandevices`/`stroke-medical`/`human`/`Stroke`/`4`/$datatype | Property Value                         | 0 or 1 or 2 or 3 |


### physicalTherapy


- #### initial value

float ***d*** : long from **shoulder** to **elbow**

float ***d'***: long from **eblow** to **wrist**

| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`calculateStats`/`$dValue,$d'Value` | d and d'value                               |Float |



- #### Exercise
| Topic                               | Meaning                                     | Value                                                        |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `mandevices`/`stroke-medical`/`human`/`physicalTherapy`/$datatype  |    Exercise Data                             | JSON.Stringify

>Important: Always sent as string (by stringify convert object/json

>Note: 
1. elbow coordinate

2. wrist coordinate

**shoulder always have coordinates is (0,0,0)** (both left and right hand)



> `mandevices`/`stroke-medical`/`human`/`physicalTherapy`/

> Payload: 
```ymal{
{
   "id": string,
   "exerciseKey": number,
   "step": number,
   "leftHand": [[number, number, number], [number, number, number]],
   "rightHand": [[number, number, number], [number, number, number]]
}
```

> Note:

- id: random uuid for 1 exercise session
- exerciseKey: exercise ID 
- step: exercise step ID
- leftHand: coordinates of 2 points (x, y, z)
- rightHand: coordinates of 2 points (x, y, z)

> Example:`mandevices`/`stroke-medical`/`human`/`physicalTherapy`/

>Payload:
```ymal{
{
   "id": "uuid_123",
   "exerciseKey": 1,
   "step": 3,
   "leftHand": [[0, 1, 2], [1, 2, 3]],
   "rightHand": [[1, 2, 1], [1, 2, 4]]
}
```

***Explain:***
- Exercise number 1
- 6th step of exercise
- Left hand:
  1. coordinate of elbow is (0, 1, 2)
  2. coordinate of wrist is (1, 2, 3)

- Right hand:
  1. coordinate of elbow is (1, 2, 1)
  2. coordinate of wrist is (1, 2, 4)
All formula: [bt_dotquy.doc](document/bt_dotquy.doc)
