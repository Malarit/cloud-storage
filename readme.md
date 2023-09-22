# **cloud-storage**

Небольшой сервис облачного хранения файлов.

## **Оглавление**

1. [Технологии](#технологии)
2. [О проекте](#о-проекте)
3. [Скрины](#скрины)
4. [Установка](#установка)
5. [Билд](#билд)

## **Технологии**

- client
  - NodeJS
  - React
  - TypeScript
  - ReactQuery
  - Axios
  - MobX
  - Styled-Component
- api
  - NodeJS
  - Express
  - TypeScript
  - PostgreSQL

## **О проекте**

Целью этого проета является создание удобного и безопасного способа хранения и доступа к цифровым данным пользователей. Проект предполагает разработку и внедрение платформы, которая позволит пользователям хранить и синхронизировать свои файлы, фотографии, видео и другие данные в облачном пространстве.

В основе данного проекта лежит использование современных технологий и инфраструктуры для обеспечения высокой доступности данных и их защиты от потери или несанкционированного доступа. Кроме того, проект включает в себя разработку и создание пользовательского интерфейса, обеспечивающего удобный и интуитивно понятный опыт взаимодействия с облачным хранилищем.

Основные функциональные возможности проекта включают:

1. Хранение и синхронизацию файлов различных форматов. Пользователи смогут загружать и хранить свои файлы в облачном хранилище, а также синхронизировать их.

2. Удобное управление файлами. Пользователи смогут создавать папки, перемещать файлы, выполнять поиск и сортировку данных.

3. Безопасность данных. Предусмотрены механизмы авторизации и аутентификации пользователей,.

4. Масштабируемость и гибкость. Проект будет способен масштабироваться и адаптироваться под растущие потребности пользователей, а также интегрироваться с другими IT-системами и приложениями.

Проект по созданию облачного хранилища позволит пользователям эффективно управлять своими цифровыми данными, повысить их доступность, а также обеспечить их безопасность и надежность хранения.

## **Скрины**

Здесь представлены возможности пользовательского интерфейса.

Регистрация с валидацией данных.
![reg](https://github.com/Malarit/cloud-storage/blob/main/images/reg.gif)
Загрузка файлов как перетаскиванием, так и по нажатию.
![dndFile](https://github.com/Malarit/cloud-storage/blob/main/images/dndFile.gif)
![create](https://github.com/Malarit/cloud-storage/blob/main/images/create.gif)
Поиск по имени файла.
![search](https://github.com/Malarit/cloud-storage/blob/main/images/search.gif)
Перетаскивание файлов.
![dnd](https://github.com/Malarit/cloud-storage/blob/main/images/dnd.gif)
Доступные действия с файлом. Переименовать, скачать, переместить в корзину, удалить, убрать из корзины.
![doWFile](https://github.com/Malarit/cloud-storage/blob/main/images/doWFile.gif)
Фильтрация и сортировка файлов.
![sort](https://github.com/Malarit/cloud-storage/blob/main/images/sort.gif)
Постраничный вывод файлов при прокрутке.
![pagination](https://github.com/Malarit/cloud-storage/blob/main/images/pagination.gif)

## **Установка**

Утановите:

1. `nodeJS` не ниже v18.16.0.  
   Проверьте, что у вас работает пакетный менеджер `npm` версии не ниже 9.5.1.

2. Базу данных `postgreSQL` не ниже 15.3.

### **_Настрока клиента:_**

Перейдите в каталог клиента.

```bash
cd cloud-storage/frontend
```

Установите библиотеки.

```bash
npm install
```

Для запуска используйте команду.

```bash
npm start
```

Вы можете настроить количество файлов за запрос и url сервера в `config.ts`.

### **_Настрока сервера:_**

Перейдите в каталог сервера.

```bash
cd cloud-storage/backend
```

Установите библиотеки.

```bash
npm install
```

Создайте файл зависимостей `.env`. Пример `.env.exemple` лежит в `cloud-storage/backend`.

Для запуска используйте команду.

```bash
npm start
```

По пути `cloud-storage/backend/src/config/config` вы можете настроить заголовки и изменить стандартные значения.

## **Билд**

Установите `docker` и `docker-compouse`.

Перейдите в папку с сервером.

```bash
cd cloud-storage/backend
```

Создайте файл зависимостей .env. Пример файла .env.exemple лежит в cloud-storage/backend.

Запустите команду в корневом каталоге cloud-storage.

```bash
docker-compose --env-file ./backend/.env up
```

Вы также можете настроить config файлы.  
`cloud-storage/frontend/config.ts` для клиента и  
`cloud-storage/backend/src/config/config` для сервера.
