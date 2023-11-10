## Установка

1. Установите и поднимите Postgresql
2. В `psql`, создайте пользователя `indicozy` с паролем `asdfasd`. Либо, поменяйте логин и пароль под себя:

```SQL
CREATE USER indicozy WITH PASSWORD 'asdfasd';
```

3. Создайте базу данных `starpets_dev` с кодированием `UTF-8` и назначте `indicozy` его владельцем:

```SQL
CREATE DATABASE "starpets_dev"
WITH OWNER "indicozy"
ENCODING 'UTF8'
LC_COLLATE = 'en_US.UTF-8'
LC_CTYPE = 'en_US.UTF-8';
```

4. переименуйте `.env.example` на `.env`
5. Установить все пакеты используя `pnpm`:

```bash
pnpm i
```

После установки build приложения должен автоматически появиться в папке `dist`.

## Запуск в режиме разработки

```bash
pnpm dev
```

## Компиляция и старт

```bash
pnpm build && pnpm start
```

## Ньансы

На данный момент sequelize (переписывает typescript)[https://sequelize.org/docs/v6/other-topics/typescript/], поэтому в контроллере юзера приходится делать проверку типов на рантайме. Также пришлось использовать `ts-ignore` для обхода проблем от sequelize.

## API

Добавить пользователя с балансом:

```
POST http://localhost:3000/api/users/create
{
  "balance": 10
}
```

Получить информацию о пользователе:

```
GET http://localhost:3000/api/users/:userId
```

Снять средства от пользователя:

```
POST http://localhost:3000/api/users/:userId/credit
{
  "amount": 10
}
```
