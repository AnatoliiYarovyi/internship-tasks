# *Vacation grouping task*

На входе есть JSON, в котором есть разработчики. У каждого уникальный айдишник, имя, а также разные периоды отпусков и прочая информация. Тебе предстоит буквально «причесать» этот JSON в другой, более удобный и универсальный вид.

В исходном JSON в ситуации, когда у пользователя **несколько периодов** отпусков, эта информация выводится **отдельным объектом для с повторением имени пользователя.** Вот:

![Untitled](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F96528f01-c8d5-49d7-a4be-262c97980c52%2FUntitled.png?table=block&id=33e03917-efba-489b-b1f2-f73b30d3112d&spaceId=2055905c-b0a9-4a70-840e-652fb3ddf0d4&width=2000&userId=&cache=v2)

**Но нам так не надо — мы топим за оптимизацию и удобство. Поэтому:**

Напиши алгоритм, который будет **из исходного JSON** делать более аккуратный и красивый, в котором:

1. Не будет «лишних» полей вроде Status, usedDays, _id заявки.
2. Периоды отпусков будут выводиться в виде массива в красивой и понятной форме.
3. Сам пользователь при этом будет встречаться в JSON один раз независимо от количества взятых отпусков.

Вот вариант, который было бы идеально получить тебе:

![kasd.jpg](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d963f7b-8373-42e1-bb2d-c653efe05eb7%2Fkasd.jpg?table=block&id=f8acb19e-ed74-4db5-9317-85a4a02d0d7b&spaceId=2055905c-b0a9-4a70-840e-652fb3ddf0d4&width=2000&userId=&cache=v2)

Забирай исходный JSON и смело в бой:

- 🧾 JSON с отпусками:
    
    ```jsx
    [
      {
        "_id": "617660a44c4250001275c807",
        "user": {
          "_id": "5fff07b70c6f5f594b03d54c",
          "name": "Yevhenii Ishchenko"
        },
        "usedDays": 1,
        "startDate": "2021-11-02",
        "endDate": "2021-11-02"
      },
      {
        "_id": "6177b1884c4250001275d6f8",
        "user": {
          "_id": "5f57b9b3b642eb0017808882",
          "name": "Dmitry Marchenko"
        },
        "usedDays": 5,
        "startDate": "2021-11-15",
        "endDate": "2021-11-19"
      },
      {
        "_id": "61823e97ac15350011f7fcea",
        "user": {
          "_id": "602291efca744a001259baee",
          "name": "Snezhana Riazantseva"
    
        },
        "usedDays": 2,
        "startDate": "2021-11-04",
        "endDate": "2021-11-05"
    
      },
      {
        "_id": "618d2e6eac15350011f833eb",
        "user": {
          "_id": "602666c98465030011abd896",
          "name": "Oleksii Martynenko"
        },
        "usedDays": 10,
        "startDate": "2021-11-29",
        "endDate": "2021-12-10"
      },
      {
        "_id": "619394943a8533001285e7fb",
        "user": {
          "_id": "603e4a14b2ab3400117a2bd4",
          "name": "Anastasiia Koval"
        },
        "usedDays": 1,
        "startDate": "2021-11-22",
        "endDate": "2021-11-22"
      },
      {
        "_id": "619434303a8533001285f100",
        "user": {
          "_id": "5f57b892b642eb0017808876",
          "name": "Dan Kochetov"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-11-22",
        "endDate": "2021-11-22"
      },
      {
        "_id": "619602f13a8533001285fb95",
        "user": {
          "_id": "5fff08fc0c6f5f594b03d54d",
          "name": "Maksym Simonov"
        },
        "usedDays": 3,
        "startDate": "2021-12-01",
        "endDate": "2021-12-05"
      },
      {
        "_id": "6196a33a3a853300128602eb",
        "user": {
          "_id": "602671015fe2cc0011b9f989",
          "name": "Ivan Pugach"
        },
        "usedDays": 3,
        "startDate": "2021-11-19",
        "endDate": "2021-11-23"
      },
      {
        "_id": "61a3c3bb3a85330012864b5b",
        "user": {
          "_id": "60b7c1f04df06a0011ef0e76",
          "name": "Vladimir Kuzin"
        },
        "usedDays": 2,
        "startDate": "2021-12-09",
        "endDate": "2021-12-10"
      },
      {
        "_id": "61a63af23a853300128672fa",
        "user": {
          "_id": "60be18161af932001237584b",
          "name": "Ruslan Kaniuk"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-12-01",
        "endDate": "2021-12-01"
      },
      {
        "_id": "61b11cfc3a8533001286e862",
        "user": {
          "_id": "604e26d9aed6010012a038f1",
          "name": "Dzianis Stayehlazau"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-12-10",
        "endDate": "2021-12-10"
      },
      {
        "_id": "61b36ff43a853300128734fb",
        "user": {
          "_id": "60c331ff1f37230011191058",
          "name": "Roman Nahryshko"
        },
        "usedDays": 1,
        "startDate": "2021-12-14",
        "endDate": "2021-12-14"
      },
      {
        "_id": "61b3700b3a85330012873568",
        "user": {
          "_id": "6113c7e519e5740011288e40",
          "name": "Kyrylo Usichenko"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-12-14",
        "endDate": "2021-12-14"
      },
      {
        "_id": "61b653863a853300128767a0",
        "user": {
          "_id": "602291efca744a001259baee",
          "name": "Snezhana Riazantseva"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-12-13",
        "endDate": "2021-12-13"
      },
      {
        "_id": "6196a33a3a853300128602eb",
        "user": {
          "_id": "602671015fe2cc0011b9f989",
          "name": "Ivan Pugach"
        },
        "usedDays": 3,
        "startDate": "2021-12-10",
        "endDate": "2021-12-12"
      },
      {
        "_id": "61b36ff43a853300128734fb",
        "user": {
          "_id": "60c331ff1f37230011191058",
          "name": "Roman Nahryshko"
        },
        "usedDays": 1,
        "startDate": "2021-12-14",
        "endDate": "2021-12-14"
      },
      {
        "_id": "619434303a8533001285f100",
        "user": {
          "_id": "5f57b892b642eb0017808876",
          "name": "Dan Kochetov"
        },
        "usedDays": 3,
        "status": "approved",
        "startDate": "2021-10-20",
        "endDate": "2021-10-22"
      },
      {
        "_id": "619434303a8533001285f100",
        "user": {
          "_id": "5f57b892b642eb0017808876",
          "name": "Dan Kochetov"
        },
        "usedDays": 1,
        "status": "approved",
        "startDate": "2021-12-01",
        "endDate": "2021-12-01"
      }
    ]
    ```
    

Удачи!
