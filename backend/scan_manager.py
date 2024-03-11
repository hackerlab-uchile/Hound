import subprocess 

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'

def run_script():
    subprocess.call(['sh', script_path])

def get_scannings():
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = fifo.readline()
            if not line:
                break
            print(f"Recibida nueva señal: {line.strip()}")

run_script()

get_scannings()