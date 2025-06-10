# TPIP1

# Proyecto de benchmarking de complejidad algorítmica

Este contenedor incluye:
- Python 3
- Node.js
- Java 17

## Cómo usar

### 1. Construir la imagen

```bash
docker build -t multilang-benchmark .
```

### 2. Ejecutar el contenedor

```bash
docker run -it --rm multilang-benchmark
```

### 3. Ejecutar cada lenguaje

Dentro del contenedor:

```bash
# Python
python3 main.py

# Java
javac Main.java && java Main

# JavaScript
node main.js
```
