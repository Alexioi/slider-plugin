# slider-plugin

[Демо страница](https://alexioi.github.io/slider-plugin/)

## Развертывание

```bash
git clone https://github.com/Alexioi/slider-plugin.git
cd slider-plugin
npm ci
npm run server
```

## Команды

| Создать prod сборку | Опубликовать билд на гитхаб страницы | Запуск всех тестов | Запуск live server |
| ------------------- | ------------------------------------ | ------------------ | ------------------ |
| `npm run build`     | `npm run deploy`                     | `npm run test`     | `npm run server`   |

## Параметры слайдера

| Опция      | Тип      | Начальное значение | Описание                                      |
| ---------- | -------- | ------------------ | --------------------------------------------- |
| isRange    | boolean  | true               | Тип слайдера (один бегунок \| два бегунка)    |
| isVertical | boolean  | false              | Вид слайдера (горизонтальный \| вертикальный) |
| hasTip     | boolean  | true               | Имеет значения над бегунками                  |
| hasScale   | boolean  | true               | Имеет шкалу                                   |
| step       | number   | 10                 | Шаг                                           |
| min        | number   | 0                  | Минимальное значение слайдер                  |
| max        | number   | 100                | Максимальное значение слайдера                |
| values     | number[] | [40, 70]           | Значения слайдера                             |

## UML диаграмма классов

![Screenshot](UML/uml.png)
