import os
import docker
from docker.errors import APIError
import tarfile

def print_all_files_in_docker_container(image_name):
    client = docker.from_env()
    try:
        container = client.containers.run(image_name, detach=True, tty=True)
        print(f"Container ID: {container.id}")
        exec_instance = container.exec_run(cmd="find / -name '*.rar' -o -name '*.zip' -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.jar' -o -name '*.war' -o -name '*.ear'")
        for file_path in exec_instance.output.decode().splitlines():
            print(file_path)
            #os.system(f"syft {file_path} -o json > {file_path}.json")
            if file_path.endswith(('.rar', '.zip', '.tar', '.tar.gz', '.jar', '.war', '.ear', '.rar', 'class')):
                try:
                    with container.get_archive(file_path) as stream:
                        tar = tarfile.open(fileobj=stream)
                        for tarinfo in tar:
                            print(tarinfo.name)
                        tar.close()
                except Exception as e:
                    print(f"Error reading archive {file_path}: {e}")
    except docker.errors.APIError as e:
        print(e)
    finally:
        if container:
            container.stop()
            container.remove(force=True)

print_all_files_in_docker_container(input("Enter the name of the Docker image: "))