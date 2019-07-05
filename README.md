# user-table

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Description (ru):

Проект user-table выполнен как SPA при помощи фремворка Vue.js с подключением к Firebase API
(databases).
Приложение представлено двумя страницами:
-страница Login имеет адаптивную форму для логирования (username/password).
При логигровании нового пользователя создается запись в firebase/database, а также аналогичная
запись в localstorage (кэшируем запрос в случае повторного логирования пользователя).
Также система проверяет чтобы в базе не хранилось два и более пользователя с одинаковым username.
Все пароли хранятся в хэшируемом состоянии (sha256).
-страница Home имеет адаптивную таблицу с соответвующими полями из базы данных firebase.
-Также присутсвует валидация формы, прелоадеры, обработка и вывод ошибки.
