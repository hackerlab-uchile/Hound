import subprocess 

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'
count = 0
file = open('monitor.txt', 'w')

def run_script():
    subprocess.call(['sh', script_path])

def get_scannings():
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = signals.readline()
            if not line:
                break
            file.write(line.strip())
    file.close()

def parse_scannings():
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = signals.readline()
            if not line:
                break
            if (line.strip()[10] == " " and line.strip()[11] == "("):
                print(f"parsed data: {line.strip()}")
