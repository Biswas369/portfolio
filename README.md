# Portfolio + Mini Apps (Django)

Personal portfolio site with three working mini apps:

- **Todo App** — create, edit, complete, delete tasks  
- **Blog App** — create, search, filter, edit, delete posts  
- **Students App** — add, search, update, delete student records  

All apps share the same glass UI, header, footer, and light/dark theme.

---

## Requirements

- Python **3.10+** (3.12 recommended)
- `pip` / virtual environment

---

## How to run

### 1. Go to the project folder

```bash
cd git
```

*(If you extracted the zip, open the folder that contains `manage.py`.)*

### 2. Create a virtual environment

**Windows**

```bash
python -m venv env
env\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv env
source env/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment file (`.env`)

A `.env` file should already exist. If not, create one next to `manage.py`:

```env
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
```

### 5. Database migrations

```bash
python manage.py migrate
```

### 6. (Optional) Create admin user

```bash
python manage.py createsuperuser
```

### 7. Start the server

```bash
python manage.py runserver
```

Open in browser:

| Page | URL |
|------|-----|
| Home | http://127.0.0.1:8000/ |
| Projects | http://127.0.0.1:8000/projects/ |
| Todo App | http://127.0.0.1:8000/todo/ |
| Blog App | http://127.0.0.1:8000/blog/ |
| Students App | http://127.0.0.1:8000/students/ |
| Admin | http://127.0.0.1:8000/admin/ |

From **Projects**, click **Todo App**, **Blog App**, or **Students App** to open each app.

---

## Project structure

```
git/
├── manage.py
├── requirements.txt
├── .env
├── db.sqlite3
├── project/          # Django settings & root URLs
├── pages/            # Home, About, Projects, Contact
├── todo/             # Todo app
├── blog/             # Blog app
├── students/         # Students app
├── templates/        # HTML templates
└── static/           # CSS & JS (styles, delete modal)
```

---

## Features

- Shared design system (glass cards, buttons, theme toggle)
- Light / dark mode (saved in browser)
- Responsive layout
- Delete confirmation modal (Blog & Students)
- Blog search + category filter
- Students search (name, ID, email, course)
- REST API endpoints under `/blog/api/` and `/students/api/`
- Blog cover images (optional upload; colorful gradient if none)
- Students table with phone, status, course badges

---

## Useful commands

```bash
# After pull / first install (image field)
python manage.py migrate

# Run server
python manage.py runserver

# Make migrations after model changes
python manage.py makemigrations
python manage.py migrate

# Django shell
python manage.py shell
```

---

## Notes

- Database: SQLite (`db.sqlite3`) — included for local use  
- Static files are served automatically in `DEBUG=True`  
- Do not commit real production secrets; keep `.env` local  

Happy coding!
