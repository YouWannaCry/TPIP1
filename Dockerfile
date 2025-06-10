FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    python3 python3-pip \
    nodejs npm \
    curl && \
    apt-get clean

WORKDIR /app

COPY . .

CMD ["bash"]
