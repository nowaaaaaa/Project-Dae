import syft
import docker
import zipfile
import tarfile
import rarfile

def get_docker_image_files(image_name):
    client = docker.from_env()
    image = client.images.get(image_name)
    image_files = []
    for layer in image.history():
        for file in layer['CreatedBy'].split('\\n'):
            if file.startswith('COPY') or file.startswith('ADD'):
                file_path = file.split()[1]
                if '/' not in file_path:
                    image_files.append(file_path)
    return image_files

def get_archive_files(archive_path):
    archive_files = []
    if zipfile.is_zipfile(archive_path):
        with zipfile.ZipFile(archive_path, 'r') as zf:
            archive_files = zf.namelist()
    elif tarfile.is_tarfile(archive_path):
        with tarfile.open(archive_path, 'r') as tf:
            archive_files = tf.getnames()
    elif rarfile.is_rarfile(archive_path):
        with rarfile.RarFile(archive_path, 'r') as rf:
            archive_files = rf.namelist()
    return archive_files

def create_sbom(image_name):
    sbom = {}
    image_files = get_docker_image_files(image_name)
    for file in image_files:
        if file.endswith('.zip') or file.endswith('.rar') or file.endswith('.tar') or file.endswith('.jar') or file.endswith('.war'):
            archive_path = f'/tmp/{file}'
            with open(archive_path, 'wb') as f:
                client = docker.from_env()
                container = client.containers.run(image_name, f'cat {file}', remove=True)
                f.write(container)
            archive_files = get_archive_files(archive_path)
            for archive_file in archive_files:
                sbom[archive_file] = archive_path
        else:
            sbom[file] = 'docker image'
    return sbom


if __name__ == '__main__':
    image_name = input("Geef image:\n")
    sbom = create_sbom(image_name)
    print(sbom)
