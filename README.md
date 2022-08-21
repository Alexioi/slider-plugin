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

## Подключение и использование

1. Для работы плагина необходимо подключить `jQuery-3.x
2. Для подключения плагина на страницу необходимо взять из папки ./dist/plugin файлы:
   - main.js
   - main.css

### Минимальный необходимый HTML

```html
<html>
  <head>
    <!--jQuery-->
    <script defer="defer" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!--Plugin JavaScript file-->
    <script defer="defer" src="main.js"></script>
    <!--Plugin styles file-->
    <link href="main.css" rel="stylesheet" />
    <!--Your JavaScript file-->
    <script defer="defer" src="index.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Минимальный необходимый JS

```javascript
// Added slider with default options
$('#root').slider();

// Added slider with custom options
$('#root').slider({
  isRange: true,
  isVertical: false,
  hasTip: true,
  hasScale: true,
  step: 10,
  min: -100,
  max: 100,
  values: [-50, 40],
});
```

## Управление слайдером

Для управления слайдером необходимо его сохранить в переменную во время вызова:

```javascript
const slider = $('#root').slider();
```

Далее нужно обратиться к нужному элементу массива и использовать нужный метод **update | getOptions**

```javascript
// Method update changes option min to -900
slider[0].update({ min: -900 });

// Method getOptions returns all slider options
const sliderOptions = slider[1].getOptions();

// Method update changes custom event
slider[0].update({
  onChange: () => {
    //function body
  },
});
```

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
