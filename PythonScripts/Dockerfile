FROM python:3.9
COPY . /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install anchore_syft
ENTRYPOINT ["python", "MongoScript.py"]