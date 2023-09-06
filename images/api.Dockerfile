FROM python:3.11

WORKDIR /api

COPY ./api/requirements.txt requirements.txt

RUN pip install --requirement requirements.txt

# copying the entire filesystem into your container will cause the docker cache to be invalidated
COPY ./api /api

CMD uvicorn main:app --host 0.0.0.0 --port 8000 --proxy-headers