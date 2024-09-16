# Use a base image with jdk support
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Copy all files from the host to the container
COPY . .

# Update and upgrade the system without user interaction
RUN apt update && apt upgrade -y

# Install necessary packages
RUN apt-get install -y wget mysql-server curl maven

# Download and install Oracle JDK 20.0.1
RUN wget https://download.oracle.com/java/20/archive/jdk-20.0.1_linux-x64_bin.tar.gz && \
    tar -xvzf jdk-20.0.1_linux-x64_bin.tar.gz && \
    mv jdk-20.0.1 /usr/local/ && \
    update-alternatives --install /usr/bin/java java /usr/local/jdk-20.0.1/bin/java 1 && \
    update-alternatives --set java /usr/local/jdk-20.0.1/bin/java

# Set up Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Resolve Maven dependencies
RUN mvn dependency:resolve

# Copy the SQL file into the container
COPY phase.sql /docker-entrypoint-initdb.d/

# Configure MySQL
RUN service mysql start && \
    mysql -u root -e "USE mysql; \
    ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root'; \
    CREATE DATABASE IF NOT EXISTS inventory; \
    FLUSH PRIVILEGES;"

# Expose necessary ports
EXPOSE 3000
EXPOSE 8080

# Start MySQL, the frontend, and the backend
# CMD ["sh", "-c", "mvn spring-boot:run && cd inventory-manager && npm start"]
CMD ["sh", "-c", "service mysql start && mysql -u root -proot inventory < /docker-entrypoint-initdb.d/phase.sql && mvn spring-boot:run & cd inventory-manager && npm start"]

# Use a base image with jdk support
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Copy all files from the host to the container
COPY . .

# Update and upgrade the system without user interaction
RUN apt update && apt upgrade -y

# Install necessary packages
RUN apt-get install -y wget mysql-server curl maven

# Download and install Oracle JDK 20.0.1
RUN wget https://download.oracle.com/java/20/archive/jdk-20.0.1_linux-x64_bin.tar.gz && \
    tar -xvzf jdk-20.0.1_linux-x64_bin.tar.gz && \
    mv jdk-20.0.1 /usr/local/ && \
    update-alternatives --install /usr/bin/java java /usr/local/jdk-20.0.1/bin/java 1 && \
    update-alternatives --set java /usr/local/jdk-20.0.1/bin/java

# Set up Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Resolve Maven dependencies
RUN mvn dependency:resolve

# Copy the SQL file into the container
COPY phase.sql /docker-entrypoint-initdb.d/

# Configure MySQL
RUN service mysql start && \
    mysql -u root -e "USE mysql; \
    ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root'; \
    CREATE DATABASE IF NOT EXISTS inventory; \
    FLUSH PRIVILEGES;"

# Expose necessary ports
EXPOSE 3000
EXPOSE 8080

# Start MySQL, the frontend, and the backend
# CMD ["sh", "-c", "mvn spring-boot:run && cd inventory-manager && npm start"]
CMD ["sh", "-c", "service mysql start && mysql -u root -proot inventory < /docker-entrypoint-initdb.d/phase.sql && mvn spring-boot:run & cd inventory-manager && npm start"]

