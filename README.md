# Hound
An application made to detect hidden IoT devices (work in progress)
## Usage
The aplication needs a frontend and a backend running simultaneosuly. To achieve this:

- For frontend on Windows
```console
$ cd frontend
$ npm start

```

- For backend on Windows
```
$ uvicorn main:app --reload 
```

- For frontend on RPi is not necessary to do anything. The frontend is running as an static page on Caddy, so it works on boot.  

- For backend on RPI
```
$ uvicorn main:app --reload --host 0.0.0.0 --root-path /api/
```

