# EZTranslate

Aplicación web para la traducción de texto entre más de 20 idiomas. Realiza traducciones mediante peticiones con debounce a la API de Deep Translate, e incluye soporte de síntesis de voz para reproducir el resultado.

## Demo

La aplicación está desplegada en: [https://eztranslate.vercel.app](https://eztranslate.vercel.app)

## Funcionalidades

- **Traducción con debounce:** Ejecuta la traducción tras 250 ms sin interacción del usuario para evitar peticiones redundantes.
- **Selector de idiomas con búsqueda:** Filtrado interactivo de más de 20 idiomas con detección automática de origen.
- **Control de entrada:** Límite configurado a 1000 caracteres con validación visual al escribir o pegar texto.
- **Lectura por voz (TTS):** Reproducción del texto traducido a través de la Web Speech API (`SpeechSynthesis`).
- **Copiado al portapapeles:** Copia directa del resultado con indicador visual de confirmación.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Librería de UI:** React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes:** Radix UI
- **Iconos:** Lucide React
- **API de traducción:** Deep Translate API (RapidAPI)
- **Métricas:** @vercel/analytics

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/aleagra/new-eztranslate.git
cd new-eztranslate
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Configurar variables de entorno:

Crear un archivo `.env.local` en la raíz con las credenciales de RapidAPI:

```env
NEXT_PUBLIC_TRANSLATE=https://deep-translate1.p.rapidapi.com/language/translate/v2
NEXT_PUBLIC_KEY=tu_rapidapi_key
```

4. Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La app estará disponible en `http://localhost:3000`.

## Estructura de Carpetas

```text
├── app/
│   ├── globals.css        # Estilos globales y variables de tema
│   ├── layout.tsx         # Configuración del documento raíz, fuentes y analíticas
│   └── page.tsx           # Página principal
├── components/
│   ├── ui/                # Primitivas de UI (botones, inputs, dialogs)
│   ├── services/
│   │   └── translate.tsx  # Peticiones HTTP hacia la API de traducción
│   ├── Footer.tsx         # Pie de página y enlaces de autor
│   ├── Header.tsx         # Encabezado y versión de la aplicación
│   ├── Hero.tsx           # Título y presentación
│   ├── LanguageDropdown.tsx # Selector con buscador de idiomas
│   ├── SoucerPanel.tsx    # Área de entrada, contador de caracteres y botón de limpiar
│   ├── TargetPanel.tsx    # Panel de traducción, botón de copiado y síntesis de voz
│   ├── TranslatorStats.tsx# Bloque con estadísticas estáticas del servicio
│   └── translator.tsx     # Estado global de traducción y orquestador de paneles
├── hooks/                 # Hooks personalizados de utilidad
├── lib/
│   ├── developerts.ts     # Información de contacto de los desarrolladores
│   ├── languajes.ts       # Lista de idiomas soportados con códigos y banderas
│   └── utils.ts           # Funciones auxiliares de clases CSS (clsx, twMerge)
├── public/                # Favicon e imágenes estáticas
└── package.json           # Dependencias y scripts del proyecto
```

## Licencia

Este proyecto está bajo la Licencia MIT.
