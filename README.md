# RestroShop (temporary name)

## Back-end(Django, DjangoRESTframework, Django-channels)
### Applications
- Accounts - for handling authentication
    -    `signup/`
    - `login/`
    - `logout/`
    - `change-password/`
    - `token/refresh/`
    - `token/verify/`
    - `token/login/`

- Users - for handling all user requests
    - `.../`
- Merchants - for handling all merchant requests
    - `.../`

### Steps to setup locally
- clone the project
- create virtual environment `virtualenv venv`
- activate the environment `source venv/bin/activate` # linux, mac
- move to `backend` directory
- install dependencies `pip install -r requirements.txt`
- run server `python manage.py runserver`

## Front-end(ReactJS, Redux)
- move to `frontend` directory
- install dependencies `npm install`
- run development server `npm start`

