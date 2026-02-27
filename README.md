# App de E-Commerce con React Native 

App de comercio electrónico sencilla que demuestra navegación combinada con Stack, Bottom Tabs y Drawer.

## Estructura de navegación

Drawer
 └── Stack
      ├── MainTabs
      │    ├── Home            — Lista de productos en grid
      │    ├── Cart            — Carrito con controles de cantidad
      │    └── Profile         — Perfil de usuario con opciones
      ├── ProductDetails       — Detalle con header dinámico 
      ├── Checkout             — Formulario de envío y confirmación de pedido
      └── Login                — Pantalla de inicio de sesión

## Requisitos previos

- **Node.js** >= 18
- **npm** o **yarn**
- **Expo CLI** (incluido con `npx expo`)
- **Expo Go** en tu dispositivo móvil (Android/iOS) o un emulador configurado

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd drawer_tabs

# Instalar dependencias
npm install
```

## Ejecución

### Con Expo (recomendado)

```bash
# Iniciar el servidor de desarrollo
npm start
# o equivalente:
npx expo start
```

Escanea el código QR con Expo Go (Android) o la cámara (iOS).

### Plataformas específicas

```bash
# Solo Android
npm run android

# Solo iOS
npm run ios

# Web
npm run web
```

### Con React Native CLI (sin Expo)

Si prefieres usar React Native CLI directamente, necesitas hacer `prebuild` primero:

```bash
npx expo prebuild
npx react-native run-android   # Android
npx react-native run-ios       # iOS
```

## Dependencias principales

| Paquete | Versión | Descripción |
|---|---|---|
| `expo` | ~54.0.33 | Framework y plataforma de desarrollo |
| `react` | 19.1.0 | Librería de UI |
| `react-native` | 0.81.5 | Framework mobile |
| `@react-navigation/native` | ^7.1.28 | Core de navegación |
| `@react-navigation/native-stack` | ^7.13.0 | Navegación Stack nativa |
| `@react-navigation/bottom-tabs` | ^7.14.0 | Navegación Bottom Tabs |
| `@react-navigation/drawer` | ^7.8.1 | Navegación Drawer lateral |
| `react-native-gesture-handler` | ~2.28.0 | Gestos (requerido por Drawer) |
| `@expo/vector-icons` | ^15.0.3 | Iconos (AntDesign, etc.) |

### Dev dependencies

| Paquete | Versión |
|---|---|
| `typescript` | ~5.9.2 |
| `@types/react` | ~19.1.0 |
| `babel-preset-expo` | ^54.0.10 |

## Deep Linking

La app tiene configurado deep linking con el scheme `myapp://`.

### Configuración (app.json)

```json
{
  "expo": {
    "scheme": "myapp",
    "android": {
      "intentFilters": [{
        "action": "VIEW",
        "data": [{ "scheme": "myapp", "host": "*" }],
        "category": ["BROWSABLE", "DEFAULT"]
      }]
    }
  }
}
```

### URLs disponibles

| URL | Pantalla |
|---|---|
| `myapp://home` | Home (lista de productos) |
| `myapp://product/1` | ProductDetails con productId=1 |
| `myapp://cart` | Carrito |
| `myapp://checkout` | Checkout |
| `myapp://profile` | Perfil |
| `myapp://login` | Login |

### Probar deep linking

```bash
# Android (emulador)
adb shell am start -a android.intent.action.VIEW -d "myapp://product/3"

# iOS (simulador)
xcrun simctl openurl booted "myapp://product/3"

# Expo Go
npx uri-scheme open "myapp://product/3" --expo
```

