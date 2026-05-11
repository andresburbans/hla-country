import os
from PIL import Image

def optimizar_imagenes():
    # Rutas definidas
    directorio_imagenes = r'D:\Dev\hotel-los-angeles-country\images'
    
    # Verificar si la carpeta existe
    if not os.path.exists(directorio_imagenes):
        print(f"Error: No se encontró la carpeta en {directorio_imagenes}")
        return

    print("Iniciando optimización de imágenes...")

    # Listar archivos en la carpeta
    archivos = os.listdir(directorio_imagenes)
    contador = 0

    for archivo in archivos:
        # Filtrar solo archivos .png (ignorando mayúsculas/minúsculas)
        if archivo.lower().endswith('.png'):
            ruta_original = os.path.join(directorio_imagenes, archivo)
            
            # Definir nombre de salida (mismo nombre pero extensión .jpg)
            nombre_sin_extension = os.path.splitext(archivo)[0]
            ruta_salida = os.path.join(directorio_imagenes, f"{nombre_sin_extension}.jpg")

            try:
                with Image.open(ruta_original) as img:
                    # Convertir a RGB (PNG suele ser RGBA, JPG no soporta transparencia)
                    # Se usa un fondo blanco para las transparencias
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Guardar con optimización para web
                    # quality=85 es el balance ideal entre peso y calidad
                    img.save(ruta_salida, "JPEG", optimize=True, quality=85)
                    
                print(f"Convertido: {archivo} -> {nombre_sin_extension}.jpg")
                contador += 1
            except Exception as e:
                print(f"Error procesando {archivo}: {e}")

    print(f"\nProceso finalizado. Se optimizaron {contador} imágenes.")

if __name__ == "__main__":
    optimizar_imagenes()