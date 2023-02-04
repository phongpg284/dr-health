# Dr.Health  
Healthcare web application 

Created with [NestJS](https://nestjs.com/) and [Create-React-App](https://create-react-app.dev/)

Server using [Mosquitto](https://mosquitto.org/) for connect devices

## Table of contents
- [Requirements](#requirements)
- [Project structures](#project-structures)
- [Run development](#run-development)
- [MQTT API](#mqtt-api)

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [PostgresQL](https://www.postgresql.org/)
- [MQTT broker (Mosquitto)](https://mosquitto.org/)

## Project structures
**VS Code workspace**
- `ROOT`: root folder
- `SERVER`: server using Apollo Graphql
- `CLIENT`: client using Create-react-app
- `WEB`: web using ReactJS
- `ADMIN`: admin page using ReactJS
- `VIDEOSDK`: video call sdk using ReactJS

## Run development
- Run `SERVER`: 
  ```
  cd server
  yarn start
  ```
- Run `CLIENT`: 
  ```
  cd client
  yarn start
  ```
- Run `WEB` 
  ```
  cd web
  yarn start
  ```
- Run `ADMIN` 
  ```
  cd admin-dashboard
  yarn start
  ```
- Run `VIDEOSDK` 
  ```
  cd videosdk
  yarn start
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
