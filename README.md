# 🧠 PsicoCitas  
### Plataforma Web de Gestión de Citas para Psicólogos y Pacientes

PsicoCitas es una aplicación web desarrollada con **React**, diseñada para facilitar la gestión de citas psicológicas entre pacientes y psicólogos. Incluye agenda digital, notificaciones por correo mediante **EmailJS**, sistema de reintentos inteligente por usuario cuando no hay internet y muy pronto integración con **Supabase**.

---

## 🚀 Tecnologías utilizadas
React, EmailJS, JavaScript ES6, LocalStorage, HTML5/CSS3, Supabase (próxima integración)

---

## 📦 Instalación del proyecto (todo en un solo paso)

Clona el repositorio, entra al proyecto, instala dependencias, crea tu archivo .env y ejecuta:

```bash
git clone https://github.com/jefersonEspinoza29/Proyecto-Psicocitas.git && \
cd Proyecto-Psicocitas && \
npm install && \
cp .env.example .env && \
npm start
```

## ⚡ Sistema de Reintentos (Offline → Online)

PsicoCitas incluye un sistema avanzado de reintentos por usuario, perfecto para conexiones inestables:

Si el usuario pierde internet, los correos se guardan automáticamente en
colaCorreos_emailDelUsuario

Cada usuario (paciente o psicólogo) tiene su propia cola aislada

Al volver la conexión, los correos se envían automáticamente

Existe un botón para reenviar manualmente en cualquier momento

No se mezclan correos entre cuentas diferentes

Funciona incluso si hay múltiples pacientes y psicólogos conectados

Este sistema asegura que ninguna notificación se pierda.
---

## 👤 Roles del sistema
**🩺 Paciente**
Agenda citas con cualquier psicólogo disponible

Selecciona fechas y horarios válidos según la disponibilidad del profesional

Recibe correos cuando su cita es aceptada, cancelada o atendida

Su cola de reintentos es independiente y privada

## 👨‍⚕️ Psicólogo

Visualiza todas las citas que le han solicitado

Puede aceptar, cancelar o marcar como atendida

Notifica automáticamente al paciente del cambio de estado

Su cola de reintentos funciona de manera aislada del resto de usuarios

## 🧪 Próximas mejoras

Autenticación profesional con Supabase Auth

Migración completa a base de datos con Supabase

Dashboard moderno para psicólogos

Historial de pacientes y gestión avanzada

Notificaciones push web

Deploy final en Vercel

## 👨‍💻 Autor

Jeferson Espinoza
GitHub: https://github.com/jefersonEspinoza29