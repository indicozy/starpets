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

```node
pnpm dev
```

## Запуск тестера

TODO:
