FROM public.ecr.aws/lambda/python:3.11

WORKDIR /var/task
COPY lambda_function.py requirements.txt ./
RUN pip install -r requirements.txt

CMD ["lambda_function.lambda_handler"]
