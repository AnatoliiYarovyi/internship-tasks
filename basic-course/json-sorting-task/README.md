# json-sorting-task

![Untitled](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcb85bf60-196a-4333-832e-3bec1fc93aa9%2FUntitled.png?table=block&id=15b28c57-4125-4e65-97b9-4ea4f7fbb7f1&spaceId=2055905c-b0a9-4a70-840e-652fb3ddf0d4&width=2000&userId=&cache=v2)

Итак, есть список из **20 ендпоинтов**. Вот они:

```jsx
https://jsonbase.com/lambdajson_type1/793
https://jsonbase.com/lambdajson_type1/955
https://jsonbase.com/lambdajson_type1/231
https://jsonbase.com/lambdajson_type1/931
https://jsonbase.com/lambdajson_type1/93
https://jsonbase.com/lambdajson_type2/342
https://jsonbase.com/lambdajson_type2/770
https://jsonbase.com/lambdajson_type2/491
https://jsonbase.com/lambdajson_type2/281
https://jsonbase.com/lambdajson_type2/718
https://jsonbase.com/lambdajson_type3/310
https://jsonbase.com/lambdajson_type3/806
https://jsonbase.com/lambdajson_type3/469
https://jsonbase.com/lambdajson_type3/258
https://jsonbase.com/lambdajson_type3/516
https://jsonbase.com/lambdajson_type4/79
https://jsonbase.com/lambdajson_type4/706
https://jsonbase.com/lambdajson_type4/521
https://jsonbase.com/lambdajson_type4/350
https://jsonbase.com/lambdajson_type4/64
```

Каждый из них возвращает response в разном формате и с различными парами ключ/значение. Но все их объединяет одно общее — абсолютно на все GET-запросы возвращается JSON у которого есть ключ `isDone` с булевым значением. Запросы разделены на три типа, в которых искомая вами пара ключ/значение находится на разных уровнях вложенности.

Задача:

- Написать приложение, которое будет опрашивать все указанные выше ендпоинты. Продумайте сценарий, при котором запрос будет отправляться по несколько раз (до трёх достаточно) в случае, если предшествующий запрос потерпел фиаско. Если ответа не последовало, исключите результат из выдачи, но выведите ошибку в консоли. Выполнение запросов выполняйте последовательно через async/await.
- Во всех полученных ендпоинтах вам нужно найти ключ `isDone` и выяснить, какое у него значение: `True` или `False`.

Результат успешного запуска вашего приложения станет ответ формата:

![Untitled](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8463c7b9-b52c-4d0a-870e-561148b7a0d9%2FUntitled.png?table=block&id=bbe4ecb7-7412-4afb-be55-a28ff322c4b9&spaceId=2055905c-b0a9-4a70-840e-652fb3ddf0d4&width=2000&userId=&cache=v2)

Успехов!
